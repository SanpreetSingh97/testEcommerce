const ApiResponse = require("../../utils/ApiResponse");
const cartService = require("./cart.service");

const getCart = async (req, res) => {
  const cart = await cartService.getCartById(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart fetched successfully"));
};

const addToCart = async (req, res) => {
  const { cartId, productId, quantity } = req.body;
  const cart = await cartService.addToCart({ cartId, productId, quantity });

  return res
    .status(201)
    .json(new ApiResponse(201, cart, "Item added to cart"));
};

const updateCartItem = async (req, res) => {
  const { itemId, quantity } = req.body;
  const cart = await cartService.updateCartItem(req.params.id, {
    itemId,
    quantity,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, cart, "Cart updated successfully"));
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
};
