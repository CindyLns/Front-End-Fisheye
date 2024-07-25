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
        const likes = document.createElement ('p');
        likes.innerText = media.likes;

        mediaCard.appendChild(info);
        info.appendChild(title);
        info.appendChild(likes);


      // Render the media card
      photoGrid.appendChild(mediaCard);
    });
  }
  