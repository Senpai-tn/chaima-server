var express = require("express");
const User = require("../models/user");
var router = express.Router();

/* GET home page. */

router.get("/", async (req, res) => {
  res.send("index");
});

module.exports = router;
