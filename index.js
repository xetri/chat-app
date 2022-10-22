const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const router = require("./router");
const { existsSync, writeFileSync } = require("fs");

/* configuration */

require("dotenv").config();
if (!existsSync("./.db")) writeFileSync("./.db", "");

// -- START -- //

app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/", router);

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 8640000,
    signed: true,
    path: "*",
  },
};

app.use(require("express-session")(sessionConfig));

// -- END -- //

//  -- SERVER -- //
const port = process.env.PORT || 8000;
require("http")
  .Server(app)
  .listen(port, "0.0.0.0", () => {
    console.log(`host: http://localhost:${port}`);
  });

module.exports = app;
