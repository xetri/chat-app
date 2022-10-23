const db = require("../_db");
const event = require("../..");
const { hashSync, compareSync } = require("bcrypt");

function createUser(username, password) {
  try {
    db.run(
      `SELECT username from user WHERE username == "${username}"`,
      (err, data) => {
        if (err) throw new Error(err.message);
        if (!data)
          db.run(
            `INSERT INTO user(uid, username, password, time) VALUES("${require("crypto")
              .randomBytes(16)
              .toString("hex")}", "${username}", "${hashSync(
                password,
                parseInt(process.env.SALT)
              )}", ${Date.now()})`,
            (err) => {
              if (err) throw new Error(err.message);
            }
          );
        return true;
      }
    );
    return true;
  } catch (e) {
    return false;
  }
}

const verifyPassword = (password, hash) => compareSync(password, hash);

function login(req, res) {
  try {
    if (req.headers.auth != process.env.AUTH) return res.status(403).send(null);
    const user = req.body;
    db.get(
      `SELECT * FROM user WHERE username == "${user.username}"`,
      (err, data) => {
        if (err) throw new Error(err.message);
        if (data) return res.send(verifyPassword(user.password, data.password));
        return res.status(404).send(null);
      }
    );
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

function register(req, res) {
  try {
    if (req.headers.auth != process.env.auth) return res.status(403).send(null);
    const user = req.body;
    return res.send(createUser(user.username, user.password));
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

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
];

module.exports = config;
