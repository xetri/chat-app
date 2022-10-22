const db = require("./src/_db");
const router = require("express").Router();
const routes = require("./src/routes");
const api = require("./src/api");

/* pages */

// -- START -- //

router.get("/", routes.index);
router.get("/auth", routes.auth);

// -- redirect -- //
router.get("/login", (req, res) => res.redirect("/auth"));
router.get("/register", (req, res) => res.redirect("/auth"));

// -- END -- //

router.use("/api", api); // -- api -- //

router.get("*", routes.error); // -- 404 -- //

module.exports = router;
