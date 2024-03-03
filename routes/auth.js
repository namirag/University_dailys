const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User");

router.get("/login", function (req, res) {
  if (req.session.isAuth) {
    res.redirect("/dashboard");
  } else {
    res.render("login");
  }
});
router.post("/login", async function (req, res) {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });
  if (!user) {
    return res.redirect("/auth/login");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.redirect("/auth/login");
  }
  req.session.isAuth = true;
  res.redirect("/dashboard");
});

router.get("/logout", function (req, res) {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

module.exports = router;
