//localStorage.clear()
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
  console.log(email.value, password.value);
  const bodyJson = JSON.stringify({
    email: email.value,
    password: password.value,
  });
  console.log(bodyJson);
  const login = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJson,
  });
  const data = await login.json();
  //todo tester token si pas token message erreur sinon sessionstorage
  window.location.href = "./index.html";
});
