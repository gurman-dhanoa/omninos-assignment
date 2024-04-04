const User = require("../model/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const { sendUserToken } = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

// Create new user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password
  });
  sendUserToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendUserToken(user, 200, res);
});

// logout user
exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("userToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite:"none"
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// get User details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: "true",
    user:req.user,
  });
});