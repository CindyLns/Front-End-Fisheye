// DOM Elements
const modal = document.getElementById("contact_modal");
const modalBtn = document.querySelector(".contact_button");
const closeBtn = document.querySelector(".close_button");

function displayModal() {
	modal.style.display = "block";
}
modalBtn.addEventListener("click", displayModal);

function closeModal() {
    modal.style.display = "none";
}
closeBtn.addEventListener("click", closeModal);

// Déclaration des variables pour stocker les données saisies
let form = document.querySelector("form");

let valeurPrenom = "";
let valeurNom = "";
let valeurEmail = "";
let valeurMessage = "";


function prenom() {
  let balisePrenom = document.getElementById("first");
  valeurPrenom = balisePrenom.value;
}

function nom () {
    let baliseNom = document.getElementById("last");
    valeurNom = baliseNom.value;
}

function email() {
    let baliseEmail = document.getElementById("email");
    valeurEmail = baliseEmail.value;
}

function message() {
    let baliseMessage = document.getElementById("message");
    valeurMessage = baliseMessage.value;
}

function donnees() {
     // Appeler les fonctions pour récupérer les valeurs
     prenom();
     nom();
     email();
     message();

    // Faire un console log des données saisies
    console.log("Prénom: ", valeurPrenom);
    console.log("Nom: ", valeurNom);
    console.log("E-mail: ", valeurEmail);
    console.log("Message: ", valeurMessage);

    // Reset les données saisies
    document.querySelector("form").reset();
        valeurPrenom = "";
        valeurNom = "";
        valeurEmail = "";
        valeurMessage = "";
}  

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
    event.preventDefault();
    donnees();
  });
  