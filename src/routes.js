const { prisma } = require("./api/api")
const name = "enkrypton";

function index(req, res) {

  const user = req.session.user

  return res.render("index", {
    name,
    user
  });
}

function auth(req, res) {
  return res.render("auth", {
    name,
  });
}


async function profile(req, res) {

  const self = req.session.user, { username } = req.params

  try {
    if (self.username == username) {

      return res.render("profile", {
        name, user: self
      })
    }

    const user = await prisma.user.findFirst({
      where: { username },
      select: {
        uuid: true,
        username: true,
      }
    })

    if (!user) return res.render("error", {
      name,
      auth: true,
      error: {
        code: 404,
        message: `User: ${username} Not found`,
      },

    })

    return res.render("profile", {
      name, user
    })

  } catch (e) {
    return res.redirect("/u")
  }

}


function error(req, res) {
  let auth = false;
  if (req.session.user) auth = true;

  return res.status(404).render("error", {
    name,
    auth,
    error: {
      code: 404,
      message: "Not found",
    },
  });

}

module.exports = { index, auth, profile, error };
