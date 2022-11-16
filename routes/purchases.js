const express = require("express");
const Purchase = require("../models/Purchase");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    var filter = {
      ...req.query,
    };
    console.log(filter);
    var purchases = await Purchase.find(filter);
    res.send(purchases);
  } catch (error) {
    res.send({ error });
  }
});

router.post("/", async (req, res) => {
  var purchase = new Purchase({ ...req.body });
  purchase.save((error, savedPurchase) => {
    if (error) {
      res.send(error);
      return;
    } else {
      res.send(savedPurchase);
      return;
    }
  });
});

module.exports = router;
