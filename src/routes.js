const name = "enkrypton";

function index(req, res) {
  return res.render("index", {
    name,
  });
}

function auth(req, res) {
  return res.render("Auth", {
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
  auth,
  error,
};
