const name = "enkrypton";

function index(req, res) {
  return res.render("index", {
    name,
  });
}

function login(req, res) {
  return res.render("login", {
    name,
  });
}

function register(req, res) {
  return res.render("register", {
    name,
  });
}

function error(req, res) {
  return res.render("error", {
    name,
    error: {
      code: 404,
      message: "Not found",
    },
  });
}

module.exports = {
  index,
  login,
  register,
  error,
};
