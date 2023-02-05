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
  //todo tester token si pas token message erreur sinon sessionstorage
  /*if (login.status === 404) {
    throw "user not found";
  } else {
    if (login.status === "401") {
    throw `console.log("Not Authorized")`;
  } else {
    if (login.status === "200")
    return window.location.href = "./index.html";
    window.sessionstorage.getitem("data");
  }*/
  window.location.href = "./index.html";
});
