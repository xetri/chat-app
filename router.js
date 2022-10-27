const router = require("express").Router();
const routes = require("./src/routes");
const api = require("./src/api");


// -- middleware -- //

const redirect = (req, res, next) => {
    if (req.session.user) return res.redirect("/")
    next()
}

const auth = (req, res, next) => {
    if (!req.session.user) return res.redirect("/auth")
    next()
}

/* pages */

// -- START -- //

router.get("/", auth, routes.index);

router.get("/dm/:chatter", auth, routes.chat);

router.get("/u/:username", auth, routes.profile);

router.get("/auth", redirect, routes.auth);

// -- redirect -- //

router.get("/login", redirect, (req, res) => res.redirect("/auth"));
router.get("/register", redirect, (req, res) => res.redirect("/auth"));

router.get("/u", auth, (req, res) => {
    return res.redirect(`/u/${req.session.user.username}`)
})


router.get("/:username", auth, (req, res) => {
    const { username } = req.params
    return res.redirect(`/u/${username}`)
})


// -- END -- //

router.use("/api", api); // -- api -- //
router.get("*", routes.error); // -- 404 -- //

module.exports = router;
