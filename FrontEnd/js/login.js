const loginForm = document.getElementById("loginForm");
const connect = document.getElementById("connect");
const email = document.getElementById("email");
const password = document.getElementById("password");

connect.addEventListener("click", (event) => {
  document.getElementById("password").select();
});

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

  if (data.token == null) {
    alert("User " + login.statusText);
  } else {
    window.sessionStorage.setItem("token", data.token);
    window.location.href = "./index.html";
  }
});
