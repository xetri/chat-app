const express = require("express");
const path = require("path");
const app = express();
const ejs = require("ejs");
const { existsSync, writeFileSync } = require("fs");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const { prisma } = require("./src/api/api")
const router = require("./router");

/* configuration */

require("dotenv").config();
if (!existsSync(path.join(__dirname, ".db"))) {
  writeFileSync(path.join(__dirname, ".db"), "")
  require("child_process").execSync("npm run db")
};

// -- START -- //W

app.engine("html", ejs.renderFile);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(require("compression")({
  level: 6,
}))

app.use(require("express-session")({
  name: "sid",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400000 * 365,
    httpOnly: true,
    sameSite: true,
    signed: true
  },
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      enableConcurrentSetInvocationsForSameSessionID: true,
      enableConcurrentTouchInvocationsForSameSessionID: true,
    }
  )
}));

app.use(router);

// -- END -- //

//  -- SERVER -- //
const port = process.env.PORT || 8000;
require("http")
  .Server(app)
  .listen(port, "0.0.0.0", () => {
    console.log(`http://localhost:${port}`);
  });