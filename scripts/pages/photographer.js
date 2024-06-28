//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const data = await reponse.json()

   
    return data;
}
async function displayData(photographers) {
    const photographersHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {

        const dataElement = document.createElement("article");
        
        const imageElement = document.createElement("img");
        imageElement.src = photographer.portrait;
        imageElement.alt = photographer.name;
        const nomElement = document.createElement("h2");
        nomElement.innerText = photographer.name;
        const placeElement = document.createElement("div");
        const cityElement = document.createElement("p");
        cityElement.innerText = `${photographer.city},`;
        cityElement.classList.add("place");
        const countryElement = document.createElement("p");
        countryElement.innerText = photographer.country;
        countryElement.classList.add("place");
        const taglineElement = document.createElement("p");
        taglineElement.innerText = photographer.tagline;

        photographersHeader.appendChild(dataElement);

        dataElement.appendChild(imageElement);
        dataElement.appendChild(nomElement);
        dataElement.appendChild(placeElement);
        placeElement.appendChild(cityElement);
        placeElement.appendChild(countryElement);
        dataElement.appendChild(taglineElement);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();

