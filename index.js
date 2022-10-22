const express = require('express')
const path = require('path')
const app = express();
const ejs = require('ejs')
const router = require("./router");
const { existsSync, writeFileSync } = require("fs");
require("dotenv").config();

/* configuration */

if (!existsSync("./.db")) writeFileSync("./.db", "");

// -- START -- //

app.engine('html', ejs.renderFile)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/*", router);

// -- END -- //


//  -- SERVER -- //
const port = process.env.PORT || 8000
require("http").Server(app).listen(port, "0.0.0.0", () => {
  console.log(`host: http://localhost:${port}`)
})