//sessionStorage.clear;
let token = window.sessionStorage.getItem("token");

//Récupération des fichesGalerie eventuellement stockées dans le sessionStorage
let fichesGalerie = window.sessionStorage.getItem("fichesGalerie");

//bouton ouverture modal1
/*let btnModal = document.getElementById("btnModal");
btnModal.addEventListener("click", openModal);*/

if (token) {
  let jsEdition = document.querySelectorAll(".jsEdition");
  for (let i = 0; i < jsEdition.length; i++) {
    jsEdition[i].style.display = null;
  }
  document.getElementById("filtres").style.display = "none";
}

// Fiches stockées en local
async function getData() {
  if (fichesGalerie === null) {
    // Récupération des fichesGalerie depuis API
    const askApi = await fetch("./js/works.json");
    //const askApi = await fetch("http://localhost:5678/api/works");
    fichesGalerie = await askApi.json();

    // Transformation des fichesGalerie en JSON
    const valeurFiches = JSON.stringify(fichesGalerie);
    // Stockage des informations dans le sessionStorage
    window.sessionStorage.setItem("fichesGalerie", valeurFiches);
  } else {
    fichesGalerie = JSON.parse(fichesGalerie);
  }
}

getData();

// Création des balises
function genererFiches(fichesGalerie) {
  for (let i = 0; i < fichesGalerie.length; i++) {
    const works = fichesGalerie[i];

    // Récupération de l'élément du DOM qui accueillera les fichesGalerie
    const divGallery = document.querySelector(".gallery");
    //création de la balise pour les fichesGalerie - balise<figure>
    const ficheElement = document.createElement("figure");
    //Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = works.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = works.title;

    // On rattache la balise article a la div gallery
    divGallery.appendChild(ficheElement);
    //Rattachement de nos balises au DOM
    ficheElement.appendChild(imageElement);
    ficheElement.appendChild(titleElement);
  }
}

//Création des fichesGalerie
genererFiches(fichesGalerie);

//Filtres
//ToDo améliorer code des filtres
//Filtres TOus
const btnall = document.querySelector(".btnall");

btnall.addEventListener("click", function () {
  const filtresFiches = fichesGalerie.filter(function (filtres) {
    return filtres.category;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
//Filtres objets
const btnobjets = document.querySelector(".btnobjets");

btnobjets.addEventListener("click", function () {
  const filtresFiches = fichesGalerie.filter(function (filtres) {
    return filtres.category.id == 1;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
//Filtres appart
const btnappart = document.querySelector(".btnappart");

btnappart.addEventListener("click", function () {
  const filtresFiches = fichesGalerie.filter(function (filtres) {
    return filtres.category.id == 2;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
//Filtres hotels
const btnhotels = document.querySelector(".btnhotels");

btnhotels.addEventListener("click", function () {
  const filtresFiches = fichesGalerie.filter(function (filtres) {
    return filtres.category.id == 3;
  });
  //console.log(filtresFiches);
  document.querySelector(".gallery").innerHTML = "";
  genererFiches(filtresFiches);
});
