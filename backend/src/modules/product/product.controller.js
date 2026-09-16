const ApiResponse = require("../../utils/ApiResponse");
const productService = require("./product.service");

const getProducts = async (req, res) => {
  const { search, category, sort, page, limit } = req.query;
  const data = await productService.getProducts({
    search,
    category,
    sort,
    page,
    limit,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Products fetched successfully"));
};

const getProductById = async (req, res) => {
  const product = await productService.getProductById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
};

module.exports = {
  getProducts,
  getProductById,
};
