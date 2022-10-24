const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();

// ------------------------------------------ //


/* Methods  */

// -- START -- //

const response = (status, result) => ({ status, result })

// -- END -- //


// ------------------------------------------ //

/* API routes */

// -- START -- //

async function login(req, res) {

  try {

    if (!req.headers.origin || !req.headers.origin.includes(req.headers.host)) return res.status(403).send(response(403, "forbidden"))

    const { username, password } = req.headers

    const user = await prisma.user.findFirst({
      where: {
        username: username
      },
      select: {
        uuid: true,
        username: true,
        password: true
      }
    })

    if (!user) return res.send(response(404, "User not found"))

    const result = bcryptjs.compareSync(password, user.password)

    if (!result) return res.send(response(403, "Invalid credentials"))

    req.session.user = {
      uuid: user.uuid,
      username
    }

    return res.send(response(200, result));

  } catch (e) {
    return res.send(response(500, e.message));
  }

}


async function register(req, res) {

  try {

    if (!req.headers.origin || !req.headers.origin.includes(req.headers.host)) return res.status(403).send(response(403, "forbidden"))

    const { username, password } = req.headers

    const user = await prisma.user.findFirst({
      where: {
        username
      },
      select: {
        uuid: true,
        username: true,
        password: true
      }
    })

    if (user) return res.send(response(403, "User already exists"))

    const uuid = crypto.randomBytes(16).toString("hex");

    await prisma.user.create({
      data: {
        uuid,
        username,
        password: bcryptjs.hashSync(password, 3)
      }
    })

    req.session.user = {
      uuid,
      username
    }

    return res.send(response(200, true));

  } catch (e) {
    return res.send(response(500, e.message));
  }

}

async function logout(req, res) {

  try {

    if (!req.headers.origin || !req.headers.origin.includes(req.headers.host)) return res.status(403).send(response(403, "forbidden"))
    if (req.session.user) req.session.destroy();
    return res.status(200).send(true)

  } catch (e) {
    return res.status(500).send(false)
  }

}

// -- END -- //


// ------------------------------------------ //


const config = [
  {
    path: "/login",
    config: login,
    method: "post",
  },
  {
    path: "/register",
    config: register,
    method: "post",
  },
  {
    path: "/logout",
    config: logout,
    method: "delete"
  },
];

module.exports = { config, prisma };