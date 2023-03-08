// recup du token dans le session storage
let token = window.sessionStorage.getItem("token");

//Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");
const deconnect = document.getElementById("logout");

// deconnexion
deconnect.addEventListener("click", (event) => {
  window.sessionStorage.clear();
});

//cache filtres si login
if (token) {
  let jsEdition = document.querySelectorAll(".jsEdition");
  for (let i = 0; i < jsEdition.length; i++) {
    jsEdition[i].style.display = null;
  }
  document.getElementById("filtres").style.display = "none"
  document.getElementById("login").style.display = "none";
}

// Récupération des fiches depuis l'api
const askApi = await fetch("http://localhost:5678/api/works");
fiches = await askApi.json();

// Création des Fiches Projets
export async function genererFiches(fiches) {

  // Récupération de l'élément du DOM qui accueille les fiches
  const sectionGallery = document.querySelector(".gallery");
  sectionGallery.innerHTML = ""

  for (let i = 0; i < fiches.length; i++) {
    const works = fiches[i];

    //création de la balise pour les fiches - balise<figure>
    const ficheElement = document.createElement("figure");
    ficheElement.classList.add("figureGallery")
    ficheElement.dataset.index = works.id

    //Création des images
    const imageElement = document.createElement("img");
    imageElement.src = works.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works.title;

    // On rattache la balise <article> a la <section gallery>
    sectionGallery.appendChild(ficheElement);

    //Rattachement de des balises au DOM
    ficheElement.appendChild(imageElement);
    ficheElement.appendChild(titleElement);
  }
}

//Création des fiches
await genererFiches(fiches);

const majAccueil = document.querySelector(".jsCloseModal")
majAccueil.addEventListener("click", function () {
  window.sessionStorage.removeItem("fiches")
  genererFiches(fiches);
})

//Filtres
//ToDo améliorer code des filtres avec une boucle
//Filtres Tous
const btnAll = document.querySelector(".btnall");
btnAll.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});

//Filtres objets
const btnObjets = document.querySelector(".btnobjets");
btnObjets.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category.id == 1;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});

//Filtres appart
const btnAppart = document.querySelector(".btnappart");
btnAppart.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category.id == 2;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});

//Filtres hotels
const btnHotels = document.querySelector(".btnhotels");
btnHotels.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category.id == 3;
  });
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});


