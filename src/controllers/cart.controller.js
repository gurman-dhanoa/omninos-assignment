const catchAsyncError = require("../middleware/catchAsyncError");
const CartItem = require("../model/cartItem.model");

exports.addItemToCart = catchAsyncError(async (req, res) => {
  const { userId, productId, quantity, price } = req.body;

  // Check if the item already exists in the cart
  const existingItem = await CartItem.findOne({
    user: userId,
    product: productId,
  });

  if (existingItem) {
    existingItem.quantity += quantity;
    existingItem.totalPrice += quantity * price;
    await existingItem.save();
    return res
      .status(200)
      .json({ message: "Item updated in cart successfully" });
  } else {
    const newItem = new CartItem({
      user: userId,
      product: productId,
      quantity,
      price,
      totalPrice: quantity * price,
    });
    await newItem.save();
    return res.status(201).json({ message: "Item added to cart successfully" });
  }
});

exports.removeItemFromCart = catchAsyncError(async (req, res) => {
  const { itemId } = req.params;

  await CartItem.findByIdAndDelete(itemId);

  return res
    .status(200)
    .json({ message: "Item removed from cart successfully" });
});

exports.getCartItems = catchAsyncError(async (req, res) => {
  const userId = req.user._id;

  const cartItems = await CartItem.find({ user: userId }).populate("product");

  return res.status(200).json(cartItems);
});
