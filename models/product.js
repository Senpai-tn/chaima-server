const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
  imageUrl: { type: String },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
