const db = require("./src/_db");
const router = require("express").Router();
const routes = require("./src/routes");

router.get("*", routes.error);
router.get("/", routes.index);

module.exports = router;