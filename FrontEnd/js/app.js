// Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");

// gestion des modales
//modal1
let modal1 = null;
//focus pour tab
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let focusElementPrecedent = null;
//modal2
let modal2 = null;

// ouverture de la modale1
const openModal1 = async function (e) {
	e.preventDefault();
	const target = e.target.getAttribute("href");
	if (target.startsWith("#"))/*Todo a voir error*/ {
		modal1 = document.querySelector(target);
	} else {
		modal1 = await loadModal(target);
	}
	focusables = Array.from(modal1.querySelectorAll(focusableSelector));
	focusElementPrecedent = document.querySelector(":focus");
	modal1.style.display = null;
	focusables[0].focus();
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modal1.addEventListener("click", closeModal);
	modal1.querySelector(".jsCloseModal").addEventListener("click", closeModal);
	modal1.querySelector(".jsModalStop").addEventListener("click", stopEvent);
};

// fermeture des modales
const closeModal = function (e) {
	if (modal1 === null) return;
	if (focusElementPrecedent !== null) focusElementPrecedent;
	e.preventDefault();
	/* 
	autre methode animation reverse 
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
	/* 
	autre methode de fermeture
	const hide
		modal1.addEventListener('animationend', function() {
			modal1.style.display = "none";
			modal1 = null;
		})
		*/
};

// bloque evenement
const stopEvent = function (e) {
	e.stopEvent(); //Todo voir pourquoi error
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
	a.addEventListener("click", openModal1);
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

//galerie Modal1
// Todo reutiliser la galerie de main.js et ajouter les icones

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
		const sectionGallery = document.querySelector(".galleryModal");

		//création de la balise pour les fiches - balise<figure>
		const ficheElement = document.createElement("figure");
		// ajout icone trash
		const iconeContainer = document.createElement("div")
		iconeContainer.innerHTML = `<i class="fa-sharp fa-solid fa-arrows-up-down-left-right cross"></i>`
		iconeContainer.innerHTML = `<button class="fa-sharp fa-solid fa-trash-can trash"></button>`
		//Création des balises
		const imageElement = document.createElement("img");
		imageElement.src = works.imageUrl;

		// lien editer //Todo revenir direct sur l'image clicker
		const editer = document.createElement("a");
		editer.innerHTML = `<a href="#modal2">editer</a>`

		// On rattache la balise article a la div galleryModal
		//sectionGallery.appendChild(ficheElement);

		//Rattachement de nos balises au DOM
		ficheElement.appendChild(imageElement);
		ficheElement.appendChild(editer);
	}
}
//Création des fiches
genererFiches(fiches);

// Changement de modal1 1 => 2
const loadModal = async function (url) {
	const target = "#" + url.split("#")[1];
	const existingModal = document.querySelector(target);
	if (existingModal !== null) return existingModal;
	const html = await fetch(url).then((reponse) => reponse.text());
	const element = document
		.createRange()
		.createContextualFragment(html)
		.querySelector(target)
		.setAttribute("aria-hidden", "false");

	if (element === null)
		throw "L'element ${target} na pas été trouvé dans la page ${url}";
	document.body.append(element);
	return element;

	console.log(element);
};

// modal 2
// preview image
const imgPreview = document.getElementById("cadreBleu");
const choixImage = document.getElementById("btnAjouterPhoto");

/*
btnAjouterPhoto.addEventListener("change", function () {
	getImgData();
});
*/
function getImgData() {
	const files = btnAjouterPhoto.files[0];
	if (files) {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(files);
		fileReader.addEventListener("load", function () {
			imgPreview.style.display = "block";
			imgPreview.innerHTML = '<img src="' + this.result + '" />';
		});
	}
}
//Ajout de photo à la galerie
/*ajouter des message d'erreur ou succes*/
/*
const imageUrl = document.getElementById("ajouterPhoto")
const validerAjoutPhoto = document.getElementById("validerAjoutPhoto")

const title = document.getElementById("titrePhoto")
const categorie = document.getElementById("categoriePhoto")
const ajoutProjet = new FormData(insertPhotos[input, title, input, categorie])
const request = new XMLHttpRequest()
request.open("POST", "http://localhost:5678/api/users/works")
request.send(new FormData(ajoutProjet))

const insertPhotos = document.forms.namedItem("insertPhotos");
insertPhotos.addEventListener('submit', function (ev) {
const output = document.getElementById("output"),
	data = new FormData(insertPhotos)

data.append("données")

const req = new XMLHttpRequest()
req.open("POST", "http://localhost:5678/api/users/works", true)
req.onload = function (event) {
	if (req.status == 201) {
		output.innerHTML = "Envoyé"
	} else {
		output.innerHTML = "erreur" + req.statusText + "lors de la tentaive d'envoi"
	}
}
req.send(data)
ev.preventDefault()
}, false)
*/

// effacer un projet
/*
const btnTrash = document.querySelector(".trash")
trash.addEventListener("click", poubelle)

poubelle() {

}
*/

/*
deleteGallery() {

}
*/