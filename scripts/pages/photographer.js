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

async function init() {
    // Récupère les datas des photographes
    const { photographers, media } = await getPhotographers();
    const photographerId = getPhotographerIdFromURL();
    const photographer = photographers.find(p => p.id == photographerId);
    const mediaList = media.filter(m => m.photographerId == photographerId);

    displayData(photographer);
    showMedia(mediaList);
    initLightbox();
    const totalLikes = calculateTotalLikes(mediaList);
    displayTotalLikes(totalLikes);
}

init();

function videoElement(src, alt) {
  const video = document.createElement('video');
  video.src = src;
  video.type = 'video/mp4';
  video.alt = alt;
  video.controls = true;
  return video;
}

 function showMedia(mediaList) {
 
    const photoGrid = document.querySelector('.gallery_media');
    photoGrid.innerHTML = '';
  
    mediaList.forEach(mediaData => {
      const media = new Media(mediaData);
  
      const mediaCard = document.createElement('div');
      mediaCard.classList.add("image_media");

      if (mediaData.image) {
        const image = document.createElement('img');
        image.classList.add("image_data");
        image.src = media.image;
        image.alt = media.title;
        mediaCard.appendChild(image);

      } else if (mediaData.video) {
        // Create the video element
        const video = videoElement(media.video, media.title);
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

      // Render the media card
      photoGrid.appendChild(mediaCard);
    });
  }

  function calculateTotalLikes(mediaList) {
    return mediaList.reduce((total, media) => total + media.likes, 0);
}

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

const sessionLikes = {};

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

function heartIcon(){

  const heart = document.createElementNS("http://www.w3.org/2000/svg",'svg');
  heart.setAttribute('width', '21');
  heart.setAttribute('height', '21');
  heart.setAttribute('viewBox', '0 0 48 48')
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('id', 'Line');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'm34.39 5a11.52 11.52 0 0 0 -8.2 3.4l-2.19 2.19-2.19-2.19a11.6 11.6 0 0 0 -19.81 8.21 17 17 0 0 0 6 13l15.35 13.15a1 1 0 0 0 1.3 0l15.35-13.19a17 17 0 0 0 6-13 11.63 11.63 0 0 0 -11.61-11.57z');
  path.setAttribute('fill', '#901C1C');
  g.appendChild(path);
  heart.appendChild(g);

  return heart;

}
