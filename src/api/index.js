const router = require("express").Router();
const config = require("./api");

for (let keys in config) {
  switch (config[keys].method) {
    case "get":
      router.get(`/${keys}`, config[keys].config);

    case "post":
      router.post(`/${keys}`, config[keys].config);

    case "patch":
      router.post(`/${keys}`, config[keys].config);

    case "delete":
      router.post(`/${keys}`, config[keys].config);
  }
}

module.exports = router;
