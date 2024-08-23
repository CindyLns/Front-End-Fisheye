// DOM Elements
const lightbox = document.querySelector('.lightbox');
const imageViewContainer = document.querySelector('.img-view');
const videoViewContainer = document.querySelector('.video-view');
const titleLightbox = document.querySelector('.lightbox_img-title');
const lightboxNext = document.querySelector('.lightbox_next');
const lightboxPrev = document.querySelector('.lightbox_prev');
const btnClose = document.querySelector(".lightbox_close");

/* launch modal form
imageLightbox.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});*/


// Variable pour suivre l'image actuelle
let currentIndex = 0;

// Fonction pour ouvrir la modal
function openModal(index) {
  currentIndex = index;
  const mediaLightbox = document.querySelectorAll('.image_data');
  const mediaTitle = document.querySelectorAll('.title_media');
  lightbox.style.display = "block";

  const mediaElement = mediaLightbox[index];
  const mediaType = mediaElement.tagName.toLowerCase();

  if (mediaType === 'img') {
    const imageSrc = mediaElement.src;
    const imageAlt = mediaTitle[index].textContent;
    imageViewContainer.style.display = "block";
    videoViewContainer.style.display = "none";
    imageViewContainer.src = imageSrc;
    imageViewContainer.alt = imageAlt;
  } else if (mediaType === 'video') {
    const videoSrc = mediaElement.src;
    videoViewContainer.style.display = "block";
    imageViewContainer.style.display = "none";
    videoViewContainer.src = videoSrc;
    videoViewContainer.type = 'video/mp4';
    videoViewContainer.controls = true;
  }


  if (mediaTitle[index]) {
    titleLightbox.textContent = mediaTitle[index].textContent;
  }
}

function closeModal() {
  lightbox.style.display = "none";
}

function plusSlides(n) {
  const mediaLightbox = document.querySelectorAll('.image_data');
  const mediaTitle = document.querySelectorAll('.title_media');
  currentIndex += n;

  // Si on dépasse la dernière image, revenir à la première
  if (currentIndex >= mediaLightbox.length) {
    currentIndex = 0;
  }

  // Si on est avant la première image, aller à la dernière
  if (currentIndex < 0) {
    currentIndex = mediaLightbox.length - 1;
  }
  const mediaElement = mediaLightbox[currentIndex];
  const mediaType = mediaElement.tagName.toLowerCase();

  if (mediaType === 'img') {
    const imageSrc = mediaElement.src;
    const imageAlt = mediaTitle[currentIndex].textContent;
    imageViewContainer.style.display = "block";
    videoViewContainer.style.display = "none";
    imageViewContainer.src = imageSrc;
    imageViewContainer.alt = imageAlt;
  } else if (mediaType === 'video') {
    const videoSrc = mediaElement.src;
    videoViewContainer.style.display = "block";
    imageViewContainer.style.display = "none";
    videoViewContainer.src = videoSrc;
    videoViewContainer.type = 'video/mp4';
    videoViewContainer.controls = true;

  }

  if (mediaTitle[currentIndex]) {
    titleLightbox.textContent = mediaTitle[currentIndex].textContent;
  }
}

// boutons next et prev
lightboxNext.addEventListener("click", () => plusSlides(1));
lightboxPrev.addEventListener("click", () => plusSlides(-1));


// Close modal 
btnClose.addEventListener("click", closeModal);


