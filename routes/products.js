var express = require("express");
const Product = require("../models/product");
const fs = require("fs");
const multer = require("multer");
var path = require("path");
var router = express.Router();
const upload = require("../uploadMiddleware");
const Resize = require("../Resize");
const Purchase = require("../models/Purchase");

/* GET products listing. */
router.get("/", async (req, res) => {
  var products = await Product.find({ ...req.query, deletedAt: null });
  res.send(products);
});

router.post("/", upload.single("file"), async function (req, res) {
  const imagePath = path.join("../Backend/public/images");
  const fileUpload = new Resize(imagePath);
  if (!req.file) {
    res.status(403).json({ error: "Please provide an image" });
  }
  const filename = await fileUpload.save(req.file.buffer);
  var product = new Product({ ...req.body, imageUrl: filename });
  product.save((error, savedProduct) => {
    if (error) {
      res.send(error);
    } else {
      res.send(savedProduct);
    }
  });
});

router.put("/", async (req, res) => {
  try {
    var product = await Product.findById(req.body._id);

    Object.assign(product, req.body);
    product.save((error, savedProduct) => {
      if (error) {
        res.send(error);
      } else {
        console.log(savedProduct);
        res.send(savedProduct);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    var product = await Product.findById(req.body._id);
    product.deletedAt = new Date();
    product.save((error, savedProduct) => {
      if (error) {
        res.send(error);
      } else {
        res.send(savedProduct);
      }
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
