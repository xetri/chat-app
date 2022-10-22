function index(req, res) {
    return res.render("index", {
        name: "enkrypton"
    })
}

function error(req, res) {
    return res.render("error", {
        error: {
            name: "enkrypton",
            code: 404,
            message: "Not found"
        }
    })
}

module.exports = {
    index, error
}