// DOM Elements
function initLightbox() {
const lightbox = document.querySelector('.lightbox');
const imageLightbox = document.querySelectorAll('.image_data');
const imageViewContainer = document.querySelector('.img-view');
const imageTitle = document.querySelectorAll('.title_media');
const titleLightbox = document.querySelector('.lightbox_img-title');
const lightboxNext = document.querySelector('.lightbox_next');
const lightboxPrev = document.querySelector('.lightbox_prev');
const btnClose = document.querySelector(".lightbox_close");

// launch modal form
imageLightbox.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Variable pour suivre l'image actuelle
let currentIndex = 0;

// Fonction pour ouvrir la modal
function openModal(index) {
  currentIndex = index;
  lightbox.style.display = "block";

  const imageSrc = imageLightbox[index].src;
  imageViewContainer.src = imageSrc;


  if (imageTitle[index]) {
    titleLightbox.textContent = imageTitle[index].textContent;
  }
}

function closeModal() {
  lightbox.style.display = "none";
}

function plusSlides(n) {
  currentIndex += n;

  // Si on dépasse la dernière image, revenir à la première
  if (currentIndex >= imageLightbox.length) {
    currentIndex = 0;
  }

  // Si on est avant la première image, aller à la dernière
  if (currentIndex < 0) {
    currentIndex = imageLightbox.length - 1;
  }
  const imageSrc = imageLightbox[currentIndex].src;
  imageViewContainer.src = imageSrc;

  if (imageTitle[currentIndex]) {
    titleLightbox.textContent = imageTitle[currentIndex].textContent;
  }
}

// boutons next et prev
lightboxNext.addEventListener("click", () => plusSlides(1));
lightboxPrev.addEventListener("click", () => plusSlides(-1));


// Close modal 
btnClose.addEventListener("click", closeModal);


}