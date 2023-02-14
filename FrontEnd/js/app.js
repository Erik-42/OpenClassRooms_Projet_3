// gestion de la modale
let modal1 = null;
let modal2 = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusElement = null;

// ouverture de la modale1
const openModal = function (e) {
  e.preventDefault();
  modal1 = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal1.querySelectorAll(focusableSelector));
  previouslyFocusElement = document.querySelector(":focus");
  modal1.style.display = null;
  focusables[0].focus();
  modal1.removeAttribute("aria-hidden");
  modal1.setAttribute("aria-modal", "true");
  modal1.addEventListener("click", closeModal);
  modal1.querySelector(".jsCloseModal").addEventListener("click", closeModal);
  /*modal1.querySelector(".jsModalStop").addEventListener("click", stopEvent);*/
};

// fermeture des modales
const closeModal = function (e) {
  if (modal1 === null) return;
  if (previouslyFocusElement !== null) previouslyFocusElement;
  e.preventDefault();
  /* autre methode animation reverse 
  modal1.style.display = "none";
  modal1.offsetWidth;
  modal1.style.display = null;
  */
  window.setTimeout(function () {
    modal1.style.display = "none";
    modal1 = null;
  }, 500);
  modal1.removeAttribute("aria-hidden");
  modal1.removeAttribute("aria-modal");
  modal1.removeEventListener("click", closeModal);
  modal1
    .querySelector(".jsCloseModal")
    .removeEventListener("click", closeModal);
  modal1.querySelector(".jsModalStop").removeEventListener("click", stopEvent);
  /* autre methode de fermeture
  const hide
    modal1.addEventListener('animationend', function() {
      modal1.style.display = "none";
      modal1 = null;
    })
    */
};

// bloque evenement
const stopEvent = function (e) {
  e.stopEvent();
};

//focus dans la modale
const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal1.querySelector(":focus"));
  index++;
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
};

// lien pour ouvrir la modal1
document.querySelectorAll(".jsModifier").forEach((a) => {
  a.addEventListener("click", openModal);
});

// gestion touche escape
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") {
    closeModal(e);
  }
  if (e.key === "Tab" && modal1 !== null) {
    focusInModal(e);
  }
});

// Changement de modal1 1 => 2
//document.getElementById("modal2").addEventListener("click", openModal2);

// ouverture de la modale2
const openModal2 = function (e) {
  if (modal2 === null) return;
  if (previouslyFocusElement !== null) previouslyFocusElement;
  e.preventDefault();
  modal2 = document.querySelector(e.target.getElementById("ajoutPhoto"));
  /*focusables = Array.from(modal2.querySelectorAll(focusableSelector));
  previouslyFocusElement = document.querySelector(":focus");*/
  modal1.style.display = "none";
  modal2.style.display = null;
  focusables[0].focus();
  modal2.removeAttribute("aria-hidden");
  modal2.setAttribute("aria-modal", "true");
  modal2.addEventListener("click", closeModal);
  modal2.querySelector(".jsCloseModal").addEventListener("click", closeModal);
  /*modal1.querySelector(".jsModalStop").addEventListener("click", stopEvent);*/
};

//galerie Modal1
// Todo reutiliser la galerie de main.js et ajouter les icones

// Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");

// Fiches stockées en local
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
    /*function addTrash() {
      const trash = document.createElement("i");
      class ExpandingList extends HTMLAllCollection {
        constructor() {
          super();
        }
      }
      customElements.define("fa-light fa-trash-can", ExpandingList, {
        extends: "class",
      });
      let ExpandingList = document.createElement("class", {
        is: "fa-light fa-trash-can",
      });
      trash.icon = "fa-light fa-trash-can";
    }*/
    const editer = document.createElement("a");
    editer.innerText = "editer";
    window.location.href = "#";

    // On rattache la balise article a la div galleryModal
    divGallery.appendChild(ficheElement);

    //Rattachement de nos balises au DOM
    ficheElement.appendChild(imageElement);
    //ficheElement.appendChild(trash);
    ficheElement.appendChild(editer);
  }
}
//Création des fiches
genererFiches(fiches);

// Modal2
// preview image modal2
const choixImage = document.getElementById("ajouterPhoto");
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
}
