    //Récupère les données des photographes et des médias depuis le fichier JSON
    async function getPhotographers() {
        const reponse = await fetch("data/photographers.json");
        const data = await reponse.json()

       
        return data;
    }

    //Affiche les informations détaillées du photographe sur cette page
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerTemplate(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
