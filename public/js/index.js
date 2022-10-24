



// -- logout -- //

$("#logout").on("click", async () => {

    await fetch("/api/logout", {
        method: "DELETE",
        credentials: "same-origin",
    })

    location.replace("/auth")

})