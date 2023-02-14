// gestion de la modale
let modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusElement = null;

// ouverture de la modale
const openModal = async function (e) {
  e.preventDefault();
  const target = e.target.getAttribute("href");
  if (target.startsWidth("#")) {
    modal = document.querySelector(target);
  } else {
    modal = await loadModal(target);
  }
  //modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  previouslyFocusElement = document.querySelector(":focus");
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", clodeModal);
  modal.querySelector(".jsModalClose").addEventListener("click,");
  modal.querySelector(".jsModalStop").addEventListener("click");

  //Création des fiches
  genererFiches(fiches);
};

// fermeture de la modal
const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusElement !== null) previouslyFocusElement;
  e.preventDefault();
  modal.setAttribut("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", clodeModal);
  modal.querySelector(".jsModalClose").removeEventListener("click", closeModal);
  modal.querySelector(".jsModalStop").removeEventListener("click", stopEvent);
  const hideModal = function () {
    modal.style.display = "none";
    modal.removeEventListener("animationend", hideModal);
    modal = null;
  };
  modal.addEventListener("animationend", hideModal);
};

const loadModal = async function (url) {
  const html = await fetch(url).then((reponse) => reponse.text());
  //console.log(html);
};
const stopEvent = function (e) {
  e.stopEvent();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  index++;
  if (index >= focusables.length) {
    index = 0;
  }
  focusables[index].focus();
};

/*document.querySelectorAll(".jsedition").forEach((a) => {
  a.addEventListener("click", openModal);
});*/

window.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    window.location.href = "./index.html";
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

//galerie Modal1
//Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");
async function getData() {
  if (fiches === null) {
    // Récupération des fiches depuis le files JSON
    //const askApi = await fetch("./js/works.json");
    const askApi = await fetch("http://localhost:5678/api/works");
    fiches = await askApi.json();

    // Transformation des fiches en JSON
    const valeurFiches = JSON.stringify(fiches);
    // Stockage des informations dans le sessionStorage
    window.sessionStorage.setItem("fiches", valeurFiches);
  } else {
    fiches = JSON.parse(fiches);
  }
}

getData();
// Fiches stockées en local

// Création des balises
function genererFiches(fiches) {
  for (let i = 0; i < fiches.length; i++) {
    const works = fiches[i];

    // Récupération de l'élément du DOM qui accueillera les fiches
    const divGallery = document.querySelector(".galleryModal");

    //création de la balise pour les fiches - balise<figure>
    const ficheElement = document.createElement("figure");
    //Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = works.imageUrl;
    const trash = document.createElement("i");
    trash.icon = "fa-light fa-trash-can";
    /*const titleElement = document.createElement("figcaption");
    titleElement.innerText = works.title;*/
    const editer = document.createElement("a");
    editer.innerText = "editer";
    window.location.href = "#";

    // On rattache la balise article a la div galleryModal
    divGallery.appendChild(ficheElement);

    //Rattachement de nos balises au DOM
    ficheElement.appendChild(imageElement);
    //ficheElement.appendChild(titleElement);
    ficheElement.appendChild(editer);
  }
}
