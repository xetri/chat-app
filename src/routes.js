const name = "enkrypton";

function index(req, res) {
  if (!req.session) return res.redirect("/auth");
  return res.render("index", {
    name,
  });
}

function auth(req, res) {
  if (req.session) return res.redirect("/");
  return res.render("auth", {
    name,
  });
}

function error(req, res) {
  let auth = false;
  if (req.session) auth = true;

  return res.render("error", {
    name,
    error: {
      code: 404,
      message: "Not found",
    },
    auth,
  });
}

module.exports = {
  index,
  auth,
  error,
};
