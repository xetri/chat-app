$("form").on("submit", async (e) => {
  e.preventDefault();

  const username = $("#username").val()
  const password = $("#password").val()

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        username, password
      },
    })

    const result = await res.json()

    if (result.status == 200) return location.replace("/")
    return $("#warn").text(result.result)

  } catch (e) {
    return $("#warn").text(e.message);
  }

});


$("#register").on("click", async function () {

  const username = $("#username").val()
  const password = $("#password").val()

  if (username.length == 0 || password.length == 0) return;

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        username, password
      },
    })

    const result = await res.json()
    if (result.status == 200) return location.replace("/");
    return $("#warn").text(result.result)

  } catch (e) {
    return $("#warn").text(e.message)
  }
})

$("#username, #password").on("input", function () {
  return $("#warn").text("");
})
