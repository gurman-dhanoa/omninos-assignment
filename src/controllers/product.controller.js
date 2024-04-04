const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../model/product.model");

exports.createProduct = catchAsyncError(async (req, res) => {
  const { name, description, price, imageUrl } = req.body;

  const newProduct = new Product({
    name,
    description,
    price,
    user:req.user._id,
    // imageUrl,
  });

  await newProduct.save();

  return res
    .status(201)
    .json({ message: "Product created successfully", product: newProduct });
});

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.find({user:req.user._id});
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateProduct = catchAsyncError(async (req, res) => {
    const { productId } = req.params;
    const { name, description, price, imageUrl } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        price,
        // imageUrl,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  
});

exports.deleteProduct = catchAsyncError(async (req, res) => {
  const { productId } = req.params;

  await Product.findByIdAndDelete(productId);

  return res.status(200).json({ message: "Product deleted successfully" });
});
