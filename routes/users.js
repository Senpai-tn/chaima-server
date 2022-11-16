var express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  var users = await User.find(req.query);
  res.send(users);
});

/*

  {
    login:"",
    password:""
  }

 */
router.post("/login", async (req, res) => {
  var user = await User.findOne({
    $or: [{ username: req.body.login }, { email: req.body.login }],
  });
  if (user) {
    if (user.deletedAt) {
      res.status(203).send("user deleted");
    } else {
      var result = await bcrypt.compare(req.body.password, user.password);
      result
        ? res.status(200).send(user)
        : res.status(202).send("password doesn't match");
    }
  } else {
    res.status(201).send("not found");
  }
});

router.post("/register", async (req, res) => {
  var hashed = await bcrypt.hash(req.body.password, saltRounds);
  var user = new User({ ...req.body, password: hashed });
  user.save((error, savedUser) => {
    if (error) {
      res.send(error);
    } else {
      res.send(savedUser);
    }
  });
});

router.put("/", async (req, res) => {
  try {
    var user = await User.findById(req.body._id);
    req.body.password
      ? Object.assign(user, {
          ...req.body,
          password: await bcrypt.hash(req.body.password, saltRounds),
        })
      : Object.assign(user, req.body);

    user.save((error, savedUser) => {
      if (error) {
        res.send(user);
      } else {
        res.send(savedUser);
      }
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/", async (req, res) => {
  var user = await User.findById(req.body._id);
  user.deletedAt = new Date();
  user.save((error, savedUser) => {
    if (error) {
      res.send(user);
    } else {
      res.send(savedUser);
    }
  });
});

module.exports = router;
