const db = require("../_db");

function hello(req, res) {
  return res.send({
    api: "hello",
    path: "/api" + req.url,
  });
}

const config = {
  hello: {
    config: hello,
    method: "get",
  }
};

module.exports = config;
