// DOM Elements
const lightbox = document.querySelector('.lightbox');
const imageLightbox = document.querySelectorAll('.image_media');

imageLightbox.forEach((img, index) => {
  img.addEventListener("click", () => openModal(index));
});

// Variable pour suivre l'image actuelle
let currentIndex = 0;

// Fonction pour ouvrir la modal
function openModal(index) {
  console.log("Ouverture de la modal");
  currentIndex = index;
  updateLightboxContent();
  lightbox.style.display = "block";
}