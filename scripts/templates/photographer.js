function photographerTemplate(data) {
    const { name, portrait, id, city, country, tagline, price } = data;

    const picture = `${portrait}`;

    function getUserCardDOM() {
        const linkElement = document.createElement("a");
        linkElement.href = `photographer.html?id=${id}`;

        const dataElement = document.createElement("article");

        const imageElement = document.createElement("img");
        imageElement.src = picture;
        imageElement.alt = name;
        const nomElement = document.createElement("h2");
        nomElement.innerText = name;
        const placeElement = document.createElement("div");
        const cityElement = document.createElement("p");
        cityElement.innerText = `${city},`;
        cityElement.classList.add("place");
        const countryElement = document.createElement("p");
        countryElement.innerText = country;
        countryElement.classList.add("place");
        const taglineElement = document.createElement("p");
        taglineElement.innerText = tagline;
        const priceElement = document.createElement("p");
        priceElement.innerText = `${price} €/jour`;
        priceElement.classList.add("price");

        linkElement.appendChild(dataElement);
        dataElement.appendChild(imageElement);
        dataElement.appendChild(nomElement);
        dataElement.appendChild(placeElement);
        placeElement.appendChild(cityElement);
        placeElement.appendChild(countryElement);
        dataElement.appendChild(taglineElement);
        dataElement.appendChild(priceElement);

        return linkElement;
    }

    return { name, picture, getUserCardDOM }
}