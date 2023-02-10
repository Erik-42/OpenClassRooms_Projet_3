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
//recupere les mail et password
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const bodyJson = JSON.stringify({
    email: email.value,
    password: password.value,
  });
  const login = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyJson,
  });
  const data = await login.json();

  //todo tester token si pas token message erreur sinon sessionstorage
  if (data.token == null) {
    alert("User " + login.statusText);
  } else {
    let token = window.sessionStorage.getItem(data.token);

    const edition = function () {
      window.location.href = "./index.html#modal1";
      document.querySelector(".jsEdition").style.display = null;
      document.getElementById("filtres").style.display = "none";
    };
    console.log(login);
    console.log(data.token);
    console.log(edition);
  }
});
