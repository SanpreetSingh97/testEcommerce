const Product = require("./product.model");
const ApiError = require("../../utils/ApiError");

const escapeRegex = (value = "") =>
  String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const SORT_MAP = {
  newest: { createdAt: -1 },
  "price-asc": { price: 1 },
  "price-desc": { price: -1 },
  name: { name: 1 },
};

const getProducts = async ({
  search,
  category,
  sort = "newest",
  page = 1,
  limit = 8,
}) => {
  const filter = {};
  const normalizedSearch = escapeRegex(String(search || "").trim());
  const normalizedCategory = String(category || "")
    .trim()
    .toLowerCase();

  if (normalizedSearch) {
    filter.$or = [
      { name: { $regex: normalizedSearch, $options: "i" } },
      { description: { $regex: normalizedSearch, $options: "i" } },
      { category: { $regex: normalizedSearch, $options: "i" } },
    ];
  }

  if (normalizedCategory && normalizedCategory !== "all") {
    filter.category = {
      $regex: `^${escapeRegex(normalizedCategory)}$`,
      $options: "i",
    };
  }

  const sortKey = SORT_MAP[sort] ? sort : "newest";
  const sortOption = SORT_MAP[sortKey];

  const pageNumber = Math.max(1, Number.parseInt(page, 10) || 1);
  const pageSize = Math.min(48, Math.max(1, Number.parseInt(limit, 10) || 8));
  const skip = (pageNumber - 1) * pageSize;

  const [products, categories, total] = await Promise.all([
    Product.find(filter).sort(sortOption).skip(skip).limit(pageSize).lean(),
    Product.distinct("category"),
    Product.countDocuments(filter),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    products,
    categories: categories.sort((a, b) => a.localeCompare(b)),
    total,
    page: pageNumber,
    limit: pageSize,
    totalPages,
    filters: {
      search: normalizedSearch || null,
      category:
        normalizedCategory && normalizedCategory !== "all"
          ? normalizedCategory
          : null,
      sort: sortKey,
    },
  };
};

const getProductById = async (id) => {
  const product = await Product.findById(id).lean();

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

module.exports = {
  getProducts,
  getProductById,
};
