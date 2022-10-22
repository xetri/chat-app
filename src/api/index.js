const router = require("express").Router();
const api = require("./api");

router.get("/hello", api.hello);

module.exports = router;
