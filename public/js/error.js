document.getElementById("save").addEventListener("click", () => {
    auth ? location.replace("/") : location.replace("/auth")
})
