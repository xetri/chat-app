const express = require("express")
const path = require("path")
const app = express()
const http = require("http")
const server = http.Server(app)
const ejs = require("ejs")
const { existsSync, writeFileSync } = require("fs")
const { PrismaSessionStore } = require("@quixo3/prisma-session-store")
const { prisma } = require("./src/api/api")
const router = require("./router")
const io = require("socket.io")
const socket = new io.Server(server)

/* configuration */

require("dotenv").config();
if (!existsSync(path.join(__dirname, ".db"))) {
  writeFileSync(path.join(__dirname, ".db"), "")
  require("child_process").execSync("npm run db")
};

// -- START -- //

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
  name: "s.id",
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 86400 * 365 * 1000 / 2,  // 6 months
    httpOnly: true,
    sameSite: true,
    signed: true
  },
  store: new PrismaSessionStore(
    prisma,
    {
      checkPeriod: 2145699655,
      dbRecordIdIsSessionId: true
    }
  )
}));

app.use(router);

// -- END -- //

//  -- SERVER -- //

// -- Socket server -- //

let users = {}

socket.on("connection", function (client) {

  const user = client.handshake.query.user
  users[user] = client.id

  client.on("mail", async function (mail) {

    const data = {
      created: mail.created,
      from: mail.from,
      to: mail.to,
      body: mail.body,
    }

    socket.to(users[data.to]).emit("mail", data)

    await prisma.mail.create({
      data,
    }).catch(function (err) {
      console.log(err.message);
    })

  })

})

const port = process.env.PORT || 8000;

server.
  listen(port, "0.0.0.0", () => {
    console.log(`Listening on PORT: ${server.address().port}`);
  });