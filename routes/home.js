const express = require("express");
const router = express.Router();

const Post = require("../models/Posts");

router.get("/", function (req, res) {
  let date = new Date();
  date =
    req.query.date ||
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  Post.find({ date }, function (err, posts) {
    res.render("home", {
     
      posts: posts,
    });
  });
});
router.get("/about", function (req, res) {
  res.render("about", );
});
router.get("/contact", function (req, res) {
  res.render("contact", );
});

module.exports = router;
