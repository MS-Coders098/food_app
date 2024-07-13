const express = require('express');
const cors = require("cors");
const session = require("express-session");
const connectMongo = require("connect-mongo");
const path = require("path");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const productRouter = require('./routes/product');
const logoutRouter = require("./routes/logout");
const foodRouter = require("./routes/foods");
const cartRouter = require("./routes/cart");
const updateUserRouter = require("./routes/updateUser");
const orderRouter = require("./routes/order");

const getUser = require("./routes/getUser")
const connectToMongo = require("./dbconfig");
require("dotenv").config();
const app = express();

connectToMongo();

const duration = 15 * 24 * 60 * 60 * 1000;
app.use(express.static(path.join(__dirname, "./public")));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: duration },
    store: new connectMongo({ mongoUrl: process.env.MONGO_URI })
}))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))


app.use("/api/register", registerRouter);
app.use('/api/login', loginRouter);
app.use("/api/products", productRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/foods", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/updateuser", updateUserRouter);
app.use("/api/order", orderRouter);
app.use("/api/getuser", getUser);

app.use(function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    res.status(500)
    return res.json({ error: err })
}
)

app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});