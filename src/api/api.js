const db = require("../_db");

function hello(req, res) {
  return res.send({
    api: "hello",
    path: "/api" + req.url,
  });
}

const apiConfig = {
  hello: {
    config: hello,
    method: "GET",
  },
};

module.exports = { apiConfig };
