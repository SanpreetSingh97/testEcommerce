const Cart = require("./cart.model");
const Product = require("../product/product.model");
const ApiError = require("../../utils/ApiError");

const populateCart = (cartQuery) =>
  cartQuery.populate({
    path: "items.product",
    select: "name price category image stock",
  });

const calculateTotals = (cart) => {
  const items = cart.items.filter((item) => item.product);

  const subtotal = items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    ...cart.toObject(),
    items,
    subtotal: Number(subtotal.toFixed(2)),
    itemCount,
  };
};

const getCartById = async (cartId) => {
  const cart = await populateCart(Cart.findById(cartId));

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  return calculateTotals(cart);
};

const addToCart = async ({ cartId, productId, quantity = 1 }) => {
  if (!productId) {
    throw new ApiError(400, "productId is required");
  }

  if (quantity < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.stock < quantity) {
    throw new ApiError(400, `Only ${product.stock} items available in stock`);
  }

  let cart;

  if (cartId) {
    cart = await Cart.findById(cartId);
    if (!cart) {
      throw new ApiError(404, "Cart not found");
    }
  } else {
    cart = new Cart({ items: [] });
  }

  const existingItem = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existingItem) {
    const nextQty = existingItem.quantity + quantity;

    if (nextQty > product.stock) {
      throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }

    existingItem.quantity = nextQty;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  return getCartById(cart._id);
};

const updateCartItem = async (cartId, { itemId, quantity }) => {
  if (quantity === undefined || quantity === null) {
    throw new ApiError(400, "quantity is required");
  }

  if (quantity < 0) {
    throw new ApiError(400, "Quantity cannot be negative");
  }

  const cart = await Cart.findById(cartId);

  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.id(itemId);

  if (!item) {
    throw new ApiError(404, "Cart item not found");
  }

  if (quantity === 0) {
    item.deleteOne();
  } else {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    if (quantity > product.stock) {
      throw new ApiError(400, `Only ${product.stock} items available in stock`);
    }

    item.quantity = quantity;
  }

  await cart.save();
  return getCartById(cart._id);
};

module.exports = {
  getCartById,
  addToCart,
  updateCartItem,
};
