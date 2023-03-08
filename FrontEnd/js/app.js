import { genererFiches } from "./main.js";
// Récupération des fiches eventuellement stockées dans le sessionStorage
let urlApi = "http://localhost:5678/api/works";
// recup du token dans le session storage
let token = window.sessionStorage.getItem("token");

// declaration des modales
let modal1 = document.querySelector("#modal1");
let modal2 = document.querySelector("#modal2");

//focus pour tab
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let focusElementPrecedent = null;

// ouverture de la modale1
const openModal1 = async function (e) {
	if (e) e.preventDefault();
	focusables = Array.from(modal1.querySelectorAll(focusableSelector));
	focusElementPrecedent = document.querySelector(":focus");
	modal1.style.display = null;
	focusables[0].focus();
	modal1.removeAttribute("aria-hidden");
	modal1.setAttribute("aria-modal", "true");
	modal1.addEventListener("click", closeModal1);
	modal1.querySelector(".jsCloseModal").addEventListener("click", closeModal1);
	modal1.querySelector(".jsModalStop").addEventListener("click", stopEvent);
};
// ouverture de la modale2
const openModal2 = async function (e) {
	if (e) e.preventDefault();
	focusables = Array.from(modal2.querySelectorAll(focusableSelector));
	focusElementPrecedent = document.querySelector(":focus");
	modal2.style.display = null;
	focusables[0].focus();
	modal2.removeAttribute("aria-hidden");
	modal2.setAttribute("aria-modal", "true");
	modal2.addEventListener("click", closeModal2);
	modal2.querySelector(".jsCloseModal").addEventListener("click", closeModal2);
	modal2.querySelector(".jsModalStop").addEventListener("click", stopEvent);
	closeModal1()
};
// fermeture de la modale1
const closeModal1 = function (e) {
	if (e) { e.preventDefault() };
	modal1.style.display = "none"
}
// fermeture de la modale2
const closeModal2 = function (e) {
	if (e) { e.preventDefault() };
	modal2.style.display = "none"
}
// retour de la modale1
const btnBack = document.querySelector(".back");
btnBack.addEventListener("click", (e) => {
	closeModal2()
	openModal1()
});

// bloque evenement
const stopEvent = function (e) {
	e.stopPropagation();
};

//focus dans la modale
const focusInModal = function (e) {
	e.preventDefault();

	let index = focusables.findIndex((f) => f === modal1.querySelector(":focus"));
	if (e.shiftKey === true) {
		index--
	} else {
		index++;
	}

	if (index >= focusables.length) {
		index = 0;
	}
	if (index < 0) {
		index = focusables.length - 1;
	}
	focusables[index].focus();
};

// lien pour ouvrir la modal1 et 2
document.querySelectorAll(".jsModifier").forEach((a) => {
	a.addEventListener("click", openModal1);
});
document.querySelector(".btnAjouterPhotoModal1").addEventListener("click", openModal2)

// gestion touche escape
window.addEventListener("keydown", function (e) {
	if (e.key === "Escape" || e.key === "Esc") {
		closeModal1(e);
		closeModal2(e);
	}
	if (e.key === "Tab" && modal1 !== null) {
		focusInModal(e);
	}
});

//galerie Modal1
// Création des fiches
async function genererFicheModal(fiches) {

	const askApiModal = await fetch(urlApi);
	fiches = await askApiModal.json();

	// Récupération de l'élément du DOM qui accueillera les fiches
	const sectionGalleryModal = document.querySelector(".galleryModal");
	sectionGalleryModal.innerHTML = ""

	for (let i = 0; i < fiches.length; i++) {
		const worksModal = fiches[i];

		//création de la balise pour les fiches - balise<figure>
		const ficheElement = document.createElement("figure");
		ficheElement.classList.add("figureGallery")
		ficheElement.dataset.index = worksModal.id
		ficheElement.innerHTML = `<button class="fa-sharp fa-solid fa-arrows-up-down-left-right btnCross" ></button><button class="fa-sharp fa-solid fa-trash-can btnTrash"></button>`

		//Création des images
		const imageElement = document.createElement("img");
		imageElement.src = worksModal.imageUrl;

		// lien editer /*Todo revenir editer direct sur l'image clicker*/
		const editer = document.createElement("a");
		editer.innerHTML = `<a class="editer" href="#modal1">editer</a>`

		// On rattache la balise article a la div galleryModal
		sectionGalleryModal.appendChild(ficheElement);

		//Rattachement de les balises au DOM
		ficheElement.appendChild(imageElement);
		ficheElement.appendChild(editer);
	}
	//Supprime projet
	//Todo Ajouter message de confirmation de suppression
	const deleteProjet = document.querySelectorAll(".btnTrash")
	for (let i = 0; i < deleteProjet.length; i++) {
		deleteProjet[i].addEventListener("click", async (e) => {
			e.preventDefault();
			const id = e.target.parentNode.dataset.index
			const projetDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`
				},
			})
			window.sessionStorage.removeItem("fiches")
			genererFicheModal()
			genererFiches()
		})
	}
}
//Création des fiches de la modal
await genererFicheModal();

/*Todo Faire édition galerie*/
//editGallery() {}

//modal 2
//preview image
const imgPreview = document.getElementById("cadreBleu");
let photo = document.getElementById("btnAjouterPhoto")
const insertPhotoForm = document.getElementById("insertPhotos");
const title = document.getElementById("titrePhoto")
const categorie = document.getElementById("categoriePhoto")
const elementGris = document.getElementById("validerAjoutPhoto")

elementGris.disabled = true
elementGris.style.backgroundColor = "grey"
photo.addEventListener("change", function () {
	elementGris.removeAttribute("style")
	elementGris.disabled = false
	getImgData(photo);
});

//Recupere et affiche la photo choisie
function getImgData(photo) {
	const files = photo.files[0];
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
insertPhotoForm.addEventListener("submit", async (event) => {
	event.preventDefault();
	const dataAjout = new FormData()
	dataAjout.append("title", title.value)
	dataAjout.append("category", categorie.value)
	dataAjout.append("image", photo.files[0])

	const projet = await fetch(urlApi, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${token}`
		},
		body: dataAjout,

	});
	window.sessionStorage.removeItem("fiches")
	title.value = ""
	categorie.value = "1"

	//reconstruction de l'ajout photo
	imgPreview.style.display = null
	imgPreview.innerHTML = ""
	const imgIconePicture = document.createElement("img")
	imgIconePicture.src = "./assets/icons/picture.png"
	imgIconePicture.alt = "picture"
	const labelAjouterPhoto = document.createElement("label")
	labelAjouterPhoto.id = "btnAjoutPhoto"
	labelAjouterPhoto.HTMLfor = "btnAjouterPhoto"
	labelAjouterPhoto.innerHTML = "+ Ajouter photo"
	const inputAjouterPhoto = document.createElement("input")
	inputAjouterPhoto.id = "btnAjouterPhoto"
	inputAjouterPhoto.className = "btnAjouterPhoto"
	inputAjouterPhoto.type = "file"
	inputAjouterPhoto.name = "btnAjouterPhoto"
	inputAjouterPhoto.accept = ".jpg, .png"
	inputAjouterPhoto.value = ""
	const pAJouterPhoto = document.createElement("p")
	pAJouterPhoto.innerHTML = "jpg, png : 4mo max"
	imgPreview.appendChild(imgIconePicture)
	imgPreview.appendChild(labelAjouterPhoto)
	imgPreview.appendChild(pAJouterPhoto)
	labelAjouterPhoto.appendChild(inputAjouterPhoto)
	elementGris.disabled = true
	elementGris.style.backgroundColor = "grey"

	inputAjouterPhoto.addEventListener("change", function () {
		elementGris.removeAttribute("style")
		elementGris.disabled = false
		getImgData(inputAjouterPhoto);
	});

	genererFicheModal()
	genererFiches()
	closeModal2()
	openModal1()
});

/*Todo supprimer completement la galerie*/
//deleteGallery() {}