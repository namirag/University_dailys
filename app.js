const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const auth_route = require("./routes/auth");
const home_route = require("./routes/home");
const dashboard_route = require("./routes/dashboard");
const isAuth = require("./utils/isAuth");

let db = process.env.mongouri || "mongodb://127.0.0.1:27017/newsDB";

mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const store = MongoDBSession({
  uri: db,
  collection: "mySessions",
});

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(
  session({
    secret: "key that will sign cookie",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  res.locals = {
    isAuth: req.session.isAuth,
  };
  next();
});

app.get("/404", (req, res) => {
  res.render("404");
});
app.use("/", home_route);
app.use("/auth", auth_route);
app.use("/dashboard", isAuth, dashboard_route);

app.listen(4000, function () {
  console.log("Server started on port 4000");
});
