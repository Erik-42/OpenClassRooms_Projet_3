// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('./js/works.json');
const fiches = await reponse.json();

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