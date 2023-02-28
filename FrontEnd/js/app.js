// Récupération des fiches eventuellement stockées dans le sessionStorage
let fiches = window.sessionStorage.getItem("fiches");
// recup du token dans le session storage
let token = window.sessionStorage.getItem("token");

// gestion des modales
//modales
let modal1 = null;

//focus pour tab
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let focusElementPrecedent = null;

// ouverture de la modale1
const openModal1 = async function (e) {
	e.preventDefault();

	const target = e.target.getAttribute("href");
	if (target.startsWith("#")) {
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
	if (focusElementPrecedent !== null) focusElementPrecedent.focus();
	if (e) { e.preventDefault() };

	window.setTimeout(function () {
		modal1.style.display = "none";
		modal1 = null;
	}, 500);
	modal1.setAttribute("aria-hidden", "true");
	modal1.removeAttribute("aria-modal");
	modal1.removeEventListener("click", closeModal);
	modal1.querySelector(".jsCloseModal").removeEventListener("click", closeModal);
	modal1.querySelector(".jsModalStop").removeEventListener("click", stopEvent);
};

// bloque evenement
const stopEvent = function (e) {
	e.stopPropagation(); //Todo voir pourquoi error
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
	console.log(index)
	console.log(focusables)
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
// Création des fiches
async function genererFicheModal(fiches) {

	const askApiModal = await fetch("http://localhost:5678/api/works");
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

		// ajout icone trash et cross
		ficheElement.innerHTML = `<button class="fa-sharp fa-solid fa-arrows-up-down-left-right btnCross"></button>`
		ficheElement.innerHTML = `<button class="fa-sharp fa-solid fa-trash-can btnTrash"></button>`

		//Création des images
		const imageElement = document.createElement("img");
		imageElement.src = worksModal.imageUrl;

		// lien editer //Todo revenir editer direct sur l'image clicker
		const editer = document.createElement("a");
		editer.innerHTML = `<a class="editer" href="#modal1">editer</a>`

		// On rattache la balise article a la div galleryModal
		sectionGalleryModal.appendChild(ficheElement);

		//Rattachement de nos balises au DOM
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
			console.log(deleteProjet)

			const projetDelete = await fetch(`http://localhost:5678/api/works/${id}`, {
				method: "DELETE",
				headers: {

					"Authorization": `Bearer ${token}`
				},

			})

			window.sessionStorage.removeItem("fiches")
			genererFicheModal()

		})
	}
}
//Création des fiches
await genererFicheModal();

//Todo FAire édition galerie
//editGallery() {}

// Changement de modal1 1 => 2
const loadModal = async function (url) {
	const target = "#" + url.split("#")[1];
	const existingModal1 = document.querySelector(target);

	if (existingModal1 !== null) return existingModal1;
	const html = await fetch(url).then((reponse) => reponse.text());
	const element = document.createRange().createContextualFragment(html).querySelector(target).setAttribute("aria-hidden", "false")
	existingModal1.document.getElementById("modal1").style.display = "none"
	if (element === null)
		throw "L'element ${target} na pas été trouvé dans la page ${url}";
	document.body.append(element);
	return target;
};

//retour modal1
const btnBack = document.querySelector(".back");
const hideModal2 = document.getElementById("modal2");

btnBack.addEventListener("click", (e) => {
	hideModal2.style.display = "none";
});

// modal 2
// preview image
const imgPreview = document.getElementById("cadreBleu");
const choixImage = document.getElementById("btnAjouterPhoto");

btnAjouterPhoto.addEventListener("change", function () {
	getImgData();
});

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
const insertPhotoForm = document.getElementById("insertPhotos");
const title = document.getElementById("titrePhoto")
const categorie = document.getElementById("categoriePhoto")
const Photo = document.getElementById("btnAjouterPhoto")

insertPhotoForm.addEventListener("submit", async (event) => {
	event.preventDefault();

	const dataAjout = new FormData()
	dataAjout.append("title", title.value)
	dataAjout.append("category", categorie.value)
	dataAjout.append("image", Photo.files[0])

	const projet = await fetch("http://localhost:5678/api/works", {
		method: "POST",
		headers: {

			"Authorization": `Bearer ${token}`
		},
		body: dataAjout,
	});

	window.sessionStorage.removeItem("fiches")
	title.value = ""
	categorie.value = ""
	Photo.value = ""

	genererFicheModal()
	closeModal();

});


//deleteGallery() {}