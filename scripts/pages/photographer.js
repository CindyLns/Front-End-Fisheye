//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const data = await reponse.json()

   
    return data;
}
function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    const photographerId = getPhotographerIdFromURL();
    const photographer = photographers.find(p => p.id == photographerId);
    displayData(photographer);
}

init();
