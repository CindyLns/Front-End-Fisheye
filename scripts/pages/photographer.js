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
  likesIcon.src =  "assets/images/coeur.png";
  likesIcon.alt =  "icone coeur";
  photographersText.appendChild(likesContainer);
  likesContainer.appendChild(likesNumber)
  likesContainer.appendChild(likesIcon)
}