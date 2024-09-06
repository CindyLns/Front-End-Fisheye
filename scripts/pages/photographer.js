//Mettre le code JavaScript lié à la page photographer.html
async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const data = await reponse.json()

   
    return data;
}
// Récupère l'ID du photographe à partir de l'URL
function getPhotographerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}
//Affiche les informations détaillées du photographe sur cette page
async function displayData(photographer) {
    const photographersSection = document.querySelector(".photograph-header");
    const photographerModel = photographerTemplate(photographer);
    const { photographElement, photoElement } = photographerModel.getDetailCardDOM();
    photographersSection.appendChild(photographElement);
    photographersSection.appendChild(photoElement);
    const photographersText = document.querySelector(".static_text");
    const { prixElement } = photographerModel.getDetailCardDOM();
    photographersText.appendChild(prixElement);
    const photographersName = document.querySelector(".header_modal");
    const { nameElement } = photographerModel.getDetailCardDOM();
    photographersName.appendChild(nameElement);
}

let mediaList = [];

// Cette fonction asynchrone effectue plusieurs tâches pour préparer l'affichage des informations du photographe et de ses médias 
async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    const photographerId = getPhotographerIdFromURL();
    const photographer = photographers.find(p => p.id == photographerId);
    mediaList = media.filter(m => m.photographerId == photographerId);

    displayData(photographer);
    showMedia(mediaList);
    const totalLikes = calculateTotalLikes(mediaList);
    displayTotalLikes(totalLikes);
}

init();

// Création d'un élément vidéo avec ses attributs 
function videoElement(src, alt) {
  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';
  video.alt = alt;
  video.controls = true;
  return video;
}
// Affiche la liste des médias dans la galerie
 function showMedia(mediaList) {
 
    const photoGrid = document.querySelector('.gallery_media');
    photoGrid.innerHTML = '';
  
    mediaList.forEach((mediaData, index) => {
      const media = new Media(mediaData);
  
      const mediaCard = document.createElement('div');
      mediaCard.classList.add("image_media");

      if (mediaData.image) {
        // Création de l'élément image
        const image = document.createElement('img');
        image.classList.add("image_data");
        image.setAttribute('tabindex', '0');
        image.src = media.image;
        image.alt = media.title;
        image.addEventListener("click", () => openModal(index));
        image.addEventListener("keypress", () => openModal(index));
        mediaCard.appendChild(image);

      } else if (mediaData.video) {
        // Création de l'élément vidéo
        const video = videoElement(media.video, media.title);
        video.classList.add("image_data");
        video.setAttribute('tabindex', '0');
        video.addEventListener("click", () => openModal(index));
        video.addEventListener("keypress", () => openModal(index));
        mediaCard.appendChild(video);
      }

        const info = document.createElement("div");
        info.classList.add("info_media");
        const title = document.createElement ('p');
        title.classList.add("title_media")
        title.innerText = media.title;
        const likesContent = document.createElement("div");
        likesContent.classList.add("likes_content");
        const likes = document.createElement ('p');
        likes.classList.add("likes_picture");
        likes.innerText = media.likes;

        mediaCard.appendChild(info);
        info.appendChild(title);
        info.appendChild(likesContent);
        likesContent.appendChild(likes);
        const likesHeart = heartIcon();
        likesContent.appendChild(likesHeart);

        likesHeart.addEventListener('click', () => addLike(mediaData, likes, mediaList));
        likesHeart.addEventListener("keypress", () => addLike(mediaData, likes, mediaList));

      // Retourne la carte media
      photoGrid.appendChild(mediaCard);
    });
  }

//Calcule du nombre total de likes
function calculateTotalLikes(mediaList) {
  return mediaList.reduce((total, media) => total + media.likes, 0);
}

//Affiche le nombre total de likes dans l'encart de bas de page
function displayTotalLikes(totalLikes) {
  const photographersText = document.querySelector(".static_text");
  const likesContainer = document.createElement("div");
  likesContainer.classList.add("total-likes-container");
  const likesNumber = document.createElement("p");
  likesNumber.innerText = `${totalLikes}`;
  const likesIcon = document.createElement("img");
  likesIcon.src =  "assets/images/coeur.svg";
  likesIcon.alt =  "icone coeur";
  photographersText.appendChild(likesContainer);
  likesContainer.appendChild(likesNumber)
  likesContainer.appendChild(likesIcon)
}
//Vérifie si le média a déjà été liké pendant cette session
const sessionLikes = {};

//Incrémente le nombre de likes si le media est liké
function addLike(mediaData, likesElement, mediaList) {
    if (!sessionLikes[mediaData.id]) {
        sessionLikes[mediaData.id] = true;

        mediaData.likes += 1;
        likesElement.innerText = mediaData.likes;

        const totalLikesElement = document.querySelector('.total-likes-container p');
        const newTotalLikes = calculateTotalLikes(mediaList);
        totalLikesElement.innerText = newTotalLikes;
    } 
}

//Création du SVG de l'icône coeur 
function heartIcon() {
  const heart = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  heart.setAttribute('width', '21');
  heart.setAttribute('height', '21');
  heart.setAttribute('viewBox', '0 0 48 48');
  heart.setAttribute('role', 'img');
  heart.setAttribute('aria-describedby', 'titre description');
  heart.setAttribute('tabindex', '0');

  const title = document.createElementNS("http://www.w3.org/2000/svg", 'title');
  title.setAttribute('id', 'titre');
  title.textContent = 'Cœur';

  const desc = document.createElementNS("http://www.w3.org/2000/svg", 'desc');
  desc.setAttribute('id', 'description');
  desc.textContent = 'Icône représentant un cœur';

  heart.appendChild(title);
  heart.appendChild(desc);

  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('id', 'Line');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'm34.39 5a11.52 11.52 0 0 0 -8.2 3.4l-2.19 2.19-2.19-2.19a11.6 11.6 0 0 0 -19.81 8.21 17 17 0 0 0 6 13l15.35 13.15a1 1 0 0 0 1.3 0l15.35-13.19a17 17 0 0 0 6-13 11.63 11.63 0 0 0 -11.61-11.57z');
  path.setAttribute('fill', '#901C1C');
  g.appendChild(path);
  heart.appendChild(g);

  return heart;
}

//Filtres
const chevron = document.getElementById("chevron-dropdown")

//Gère le tri des médias en fonction du nombre de likes lors du clic sur le bouton de tri
const boutonPop = document.querySelector(".btn-pop");
boutonPop.addEventListener("click", function () {
    mediaList.sort(function (a, b) {
      return b.likes - a.likes;
    });
    showMedia(mediaList);
    updateButtonText("Popularité");
});

//Gère le tri des médias par ordre alphabétique lors du clic sur le bouton de tri
const boutonTitre = document.querySelector(".btn-titre");
boutonTitre.addEventListener("click", function () {
  mediaList.sort(function (a, b) {
      return  a.title.localeCompare(b.title);
    });
    showMedia(mediaList);
    updateButtonText("Titre");
});

//Gère le tri des médias par date lors du clic sur le bouton de tri
const boutonDate = document.querySelector(".btn-date");
boutonDate.addEventListener("click", function () {
  mediaList.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
    });
    showMedia(mediaList);
    updateButtonText("Date");
});

const dropdownBtn = document.querySelector(".dropdown_btn");
const selectedText = document.querySelector(".selected-text");
const borderWhite = document.querySelectorAll(".border_white");

//Gère l'affichage du menu déroulant
function showDropdown(){
  boutonPop.classList.toggle("active");
  boutonDate.classList.toggle("active");
  boutonTitre.classList.toggle("active");
  chevron.classList.toggle("turn");

  borderWhite.forEach(function(element) {
    element.classList.toggle("active");
  });

}

dropdownBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  showDropdown();
});

dropdownBtn.addEventListener("keypress", function (e) {
  e.stopPropagation();
  showDropdown();
});

//Met à jour le texte du bouton de tri
function updateButtonText(newText) {
  selectedText.innerHTML = newText;
}




