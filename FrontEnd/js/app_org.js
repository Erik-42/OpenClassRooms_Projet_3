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
  modal.addEventListener("click", closeModal);
  modal.querySelector(".jsModalClose").addEventListener("click,");
  modal.querySelector(".jsModalStop").addEventListener("click");
  //Création des fichesGalerieModal
  createFicheGalerieModal(fichesGalerieModal);
};

// fermeture de la modal
const closeModal = function (e) {
  if (modal === null) return;
  if (previouslyFocusElement !== null) previouslyFocusElement;
  e.preventDefault();
  modal.setAttribut("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
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

document.querySelectorAll(".jsEdition").forEach((a) => {
  a.addEventListener("click", openModal);
});

window.addEventListener("keydown", function (e) {
  console.log(e.key);
  if (e.key === "Escape" || e.key === "Esc") {
    window.location.href = "./index.html";
  }
  if (e.key === "Tab" && modal !== null) {
    focusInModal(e);
  }
});

// Modal2
// preview image

/*const choixImage = document.getElementById("ajouterPhoto");
const imgPreview = document.getElementById("cadreBleu");

ajouterPhoto.addEventListener("change", function () {
  getImgData();
});

function getImgData() {
  const files = ajouterPhoto.files[0];
  if (files) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.addEventListener("load", function () {
      imgPreview.style.display = "block";
      imgPreview.innerHTML = '<img src="' + this.result + '" />';
    });
  }
}*/

//galerie Modal1
//Récupération des fichesGalerieModal eventuellement stockées dans le sessionStorage
// Fiches stockées en local
let fichesGalerieModal = window.sessionStorage.getItem("fichesGalerieModal");
async function recupData() {
  if (fichesGalerieModal === null) {
    // Récupération des fichesGalerieModal depuis le files JSON
    const reponseApi = await fetch("http://localhost:5678/api/works");
    fichesGalerieModal = await reponseApi.json();

    // Transformation des fichesGalerieModal en JSON
    const valFichesGalerieModal = JSON.stringify(fichesGalerieModal);
    // Stockage des informations dans le sessionStorage
    window.sessionStorage.setItem("fichesGalerieModal", valFichesGalerieModal);
  } else {
    fichesGalerieModal = JSON.parse(fichesGalerieModal);
  }
}

recupData();

// Création des balises
function createFicheGalerieModal(fichesGalerieModal) {
  for (let i = 0; i < fichesGalerieModal.length; i++) {
    const worksElements = fichesGalerieModal[i];

    // Récupération de l'élément du DOM qui accueillera les fichesGalerieModal
    const divGallery = document.querySelector(".galleryModal");

    //création de la balise pour les fichesGalerieModal - balise<figure>
    const elementFicheGalerieModal = document.createElement("figure");
    //Création des balises
    const elementImageGalerieModal = document.createElement("img");
    elementImageGalerieModal.src = worksElements.imageUrl;
    /*const trash = document.createElement("i");
    trash.icon = "fa-light fa-trash-can";*/
    /*const titleElement = document.createElement("figcaption");
    titleElement.innerText = works.title;*/
    const editer = document.createElement("a");
    editer.innerText = "editer";
    window.location.href = "#";

    // On rattache la balise article a la div galleryModal
    divGallery.appendChild(elementFicheGalerieModal);

    //Rattachement de nos balises au DOM
    elementFicheGalerieModal.appendChild(elementImageGalerieModal);
    //elementFicheGalerieModal.appendChild(titleElement);
    elementFicheGalerieModal.appendChild(editer);
  }
}
