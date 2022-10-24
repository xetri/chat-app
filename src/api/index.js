const router = require("express").Router();
const { config } = require("./api");

config.forEach((val) => {
  let [path, func, method] = [val.path, val.config, val.method];

  switch (method) {
    case "get":
      router.get(path, func);

    case "post":
      router.post(path, func);

    case "patch":
      router.patch(path, func);

    case "delete":
      router.delete(path, func);
  }
});

module.exports = router;