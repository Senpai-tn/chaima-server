var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var purchasesRouter = require("./routes/purchases");
var adminRouter = require("./routes/admin");
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;

var app = express();
app.use(cors());
mongoose
  .connect(`${process.env.BD_URL}`)
  .then(() => {
    console.log("connected to BD");
  })
  .catch((error) => {
    console.log(`${error}`);
  });
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/purchases", purchasesRouter);
app.use("/admin", adminRouter);

app.listen(port, () => {
  console.log(`Server is runing on ${port}`);
});

module.exports = app;
