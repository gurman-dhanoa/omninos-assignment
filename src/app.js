const express = require("express")
const ErrorHandler = require("./middleware/ErrorHandler")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

const allowedOrigins = process.env.ALLOWED_ORIGINS;
app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin is in the allowedOrigins array or if it's undefined (for same-origin requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },credentials: true,
}));

app.use(express.json({limit: "150kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


const userRoutes =require("./routes/user.routes.js");
const cartRoutes =require("./routes/cart.routes.js");
const productRoutes =require("./routes/product.routes.js");

app.use("/api/v1/user", userRoutes)
app.use("/api/v1/cart", cartRoutes)
app.use("/api/v1/product", productRoutes)
app.use(ErrorHandler);

module.exports = app