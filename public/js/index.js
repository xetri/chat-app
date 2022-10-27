$("li").on("click", (e) => location.replace(`/dm/${e.target.id}`))

// -- last resort --//


// $("#searchInput").on("input", function (e) {
//     const value = e.target.value.toLowerCase();
//     //list all on empty
//     if (value === "") { }    
// })


// -- logout -- //

$("#logout").on("click", () => {

    fetch("/api/logout", {
        method: "DELETE",
        credentials: "same-origin",
    }).then(_ => {
        location.replace("/auth")
    }).catch(_ => {
    })
})