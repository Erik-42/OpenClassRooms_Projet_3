//sessionStorage.clear;

// recup du token dans le session storage
let token = window.sessionStorage.getItem("token");
//Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");
const deconnect = document.getElementById("logout");

// deconnexion
deconnect.addEventListener("click", (event) => {
  window.sessionStorage.clear();
});

if (token) {
  let jsEdition = document.querySelectorAll(".jsEdition");
  for (let i = 0; i < jsEdition.length; i++) {
    jsEdition[i].style.display = null;
  }
  document.getElementById("filtres").style.display = "none"
  document.getElementById("login").style.display = "none";
}

// Récupération des fiches depuis le fichier JSON
const askApi = await fetch("http://localhost:5678/api/works");
fiches = await askApi.json();

// Création des Fiches Projets
async function genererFiches(fiches) {

  // Récupération de l'élément du DOM qui accueillera les fiches
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

    // On rattache la balise article a la div gallery
    sectionGallery.appendChild(ficheElement);

    //Rattachement de nos balises au DOM
    ficheElement.appendChild(imageElement);
    ficheElement.appendChild(titleElement);
  }
}

//Création des fiches
await genererFiches(fiches);

//Filtres
//ToDo améliorer code des filtres
//Filtres TOus
const btnall = document.querySelector(".btnall");

btnall.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
//Filtres objets
const btnobjets = document.querySelector(".btnobjets");

btnobjets.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category.id == 1;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
//Filtres appart
const btnappart = document.querySelector(".btnappart");

btnappart.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category.id == 2;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
//Filtres hotels
const btnhotels = document.querySelector(".btnhotels");

btnhotels.addEventListener("click", function () {
  const filtresFiches = fiches.filter(function (filtres) {
    return filtres.category.id == 3;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});


