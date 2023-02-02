//localStorage.clear;
//Récupération des fiches eventuellement stockées dans le localStorage
let fiches = window.localStorage.getItem('fiches');

// Fiches stockées en local
if (fiches === null) {
    // Récupération des fiches depuis le fichier JSON
    //const askApi = await fetch('./js/works.json');
    const askApi = await fetch('http://localhost:5678/api/works');
    fiches = await askApi.json();

    // Transformation des fiches en JSON
    const valeurFiches = JSON.stringify(fiches);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem("fiches", valeurFiches);
} else {
    fiches = JSON.parse(fiches);
}

// Création des balises 
function genererFiches(fiches) {
    for (let i = 0; i < fiches.length; i++) {
        const works = fiches[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const divGallery = document.querySelector(".gallery");

        //création de la balise pour les fiches - balise<figure>
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

//Création des fiches
genererFiches(fiches);
