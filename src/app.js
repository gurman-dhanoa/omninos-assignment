const express = require("express")
const ErrorHandler = require("./middleware/ErrorHandler")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

app.use(cors({
    origin: "*",
    credentials: true
}))

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