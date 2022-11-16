const express = require("express");
const Product = require("../models/product");
const router = express.Router();

router.get("/products", async (req, res) => {
  var products = await Product.find({ ...req.query }).sort({
    createdAt: "desc",
  });
  res.send(products);
});
router.get("/", async (req, res) => {});
router.get("/", async (req, res) => {});

module.exports = router;
