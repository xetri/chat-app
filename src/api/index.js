const router = require("express").Router();
const { apiConfig } = require("./api");

for (let keys in apiConfig) {
  switch (apiConfig[keys].method) {
    case "GET":
      router.get("/" + keys, apiConfig[keys].config);

    case "POST":
      router.post("/" + keys, apiConfig[keys].config);

    case "PATCH":
      router.post("/" + keys, apiConfig[keys].config);

    case "DELETE":
      router.post("/" + keys, apiConfig[keys].config);
  }
}

module.exports = router;
