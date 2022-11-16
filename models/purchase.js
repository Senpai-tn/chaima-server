const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  user: { type: Object, required: true },
  products: {
    type: [
      {
        price: { type: Number },
        idProduct: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    required: true,
  },
  totalAmount: { type: Number },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date, default: null },
});

const Purchase = mongoose.model("purchases", purchaseSchema);

module.exports = Purchase;
