$("li").on("click", (e) => location.replace(`/${e.target.id}`))

$("#logout").on("click", () => {

    fetch("/api/logout", {
        method: "DELETE",
        credentials: "same-origin",
    }).then(_ => {
        location.replace("/auth")
    }).catch(_ => {
    })
})