const express = require("express");
const router = express.Router();

const Post = require("../models/Posts");

router.get("/", function (req, res) {
  let date = new Date();
  date =
    req.query.date ||
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  Post.find({ date }, function (err, posts) {
    res.render("dashboard/dashboard", {
      posts,
    });
  });
});

router.get("/publish", function (req, res) {
  res.render("dashboard/publish");
});

router.post("/publish", function (req, res) {
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody,
    date: req.body.date,
  });

  post.save(function (err) {
    if (!err) {
      res.redirect("/dashboard");
    }
  });
});

router.get("/edit", function (req, res) {
  let id = req.query.id;
  if (id) {
    Post.findById(id, function (err, post) {
      if (!post) res.redirect("/404");
      else
        res.render("dashboard/edit", {
          post,
        });
    });
  } else {
    res.redirect("/404");
  }
});

router.post("/edit", function (req, res) {
  Post.findByIdAndUpdate(
    req.body.id,
    {
      title: req.body.postTitle,
      content: req.body.postBody,
      date: req.body.date,
    },
    () => {
      res.redirect("/dashboard");
    }
  );
});

router.get("/delete", function (req, res) {
  Post.findByIdAndDelete(req.query.id, () => {
    res.redirect("/dashboard");
  });
});

module.exports = router;
