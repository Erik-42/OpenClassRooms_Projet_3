//sessionStorage.clear();
const loginForm = document.getElementById("loginForm");
const connect = document.getElementById("connect");
const email = document.getElementById("email");
const password = document.getElementById("password");

connect.addEventListener("click", (event) => {
  document.getElementById("password").select();
});
/*email: sophie.bluel@test.tld
password: S0phie */
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  //console.log(email.value, password.value);
  const bodyJson = JSON.stringify({
    email: email.value,
    password: password.value,
  });
  //console.log(bodyJson);
  //const login = await fetch("./js/users.json", {
  const login = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJson,
  });
  const data = await login.json();
  console.log(data);
  console.log(login);
  console.log(login.status);

  //todo tester token si pas token message erreur sinon sessionstorage

  if (login.status === 404) {
    /*return "user not found";*/
    console.error(login.statusText);
  } else {
    if (login.status === 401) {
      console.error(login.statusText);
    } else {
      if (login.status === 200) {
        const edition = function (e) {
          e.preventDefault();
          const reveal = document.querySelector(
            e.reveal.getAttribute(".connect")
          );
          reveal.style.display = null;
          reveal.removeAttribute("hidden");
        };
        document.querySelectorAll(".jsedition").forEach((a) => {
          a.addEventListener("click", edition);
          window.sessionStorage.getItem(data.token);
          console.log(data.token);
          window.location.href = "./index.html#maskBarre";
        });
      }
    }
    /*if (data === "error") {
    return `Error de connexion`;
  } else {
    const edition = function (e) {
      e.preventDefault();
      const reveal = document.querySelector(e.reveal.getAttribute("jsedition"));
      reveal.style.display = none;
      reveal.setAttribute("hidden", false);
    };
    window.sessionStorage.getItem("data");*/
    //window.location.href = "./index.html";
  }
});
