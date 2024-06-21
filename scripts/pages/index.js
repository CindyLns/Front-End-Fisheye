    async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        const reponse = await fetch("data/photographers.json");
        const data = await reponse.json()

        // et bien retourner le tableau photographers seulement une fois récupéré
        return data;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

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
            const priceElement = document.createElement("p");
            priceElement.innerText = `${photographer.price} €/jour`;
            priceElement.classList.add("price");

            photographersSection.appendChild(dataElement);

            dataElement.appendChild(imageElement);
            dataElement.appendChild(nomElement);
            dataElement.appendChild(placeElement);
            placeElement.appendChild(cityElement);
            placeElement.appendChild(countryElement);
            dataElement.appendChild(taglineElement);
            dataElement.appendChild(priceElement);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    }
    
    init();
    
