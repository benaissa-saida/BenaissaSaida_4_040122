// DOM Elements
const hero = document.querySelector(".hero-section");
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const confirmMsg = document.querySelector(".confirmMsg");
const closeMsg = document.getElementById("closeMsg");

//INPUT Elements
const first = document.getElementById("first");
const last = document.getElementById("last");
const mail = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");

// REGEX
const regNoNum =
  /^[A-Za-zàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;

// responsive navigation
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block"; //show modal
  document.body.style.overflow = "hidden"; // hide modal
}

// Close modal
function closemodal() {
  //hide modal
  modalbg.style.display = "none";

  //hide regestration message
  confirmMsg.style.display = "none";

  //change overflow of the body
  document.body.style.overflow = "auto";
}
//close each button of responsive modal
closeBtn.forEach((btn) => btn.addEventListener("click", closemodal));

//get data from form
const getData = () => {
  const contact = {
    firstName: document.getElementById("first").value,
    lastName: document.getElementById("last").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: document.querySelector(".location input[type='radio']:checked"),
    cgv: document.getElementById("checkbox1"),
  };
  return contact;
};

const errors = {
  firstName: document.getElementById("error-first"),
  lastName: document.getElementById("error-last"),
  email: document.getElementById("error-email"),
  birthdate: document.getElementById("error-birthdate"),
  quantity: document.getElementById("error-quantity"),
  location: document.getElementById("error-location"),
  cgv: document.getElementById("error-cgv"),
};

function firstNameValidation() {
  const contact = getData();

  if (contact.firstName.length < 2) {
    first.classList.add("is-invalid");
    errors.firstName.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    return false;
  }

  if (!regNoNum.test(contact.firstName)) {
    first.classList.add("is-invalid");
    errors.firstName.innerHTML =
      "Ceci n'est pas un prénom, doit contenir que des lettres !";
    return false;
  } else {
    first.classList.remove("is-invalid");
    first.classList.add("is-valid");
    errors.firstName.innerText = "";
    return true;
  }
}

function lastNameValidation() {
  const contact = getData();

  if (contact.lastName.length < 2) {
    last.classList.add("is-invalid");
    errors.lastName.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
    return false;
  }
  
  if (!regNoNum.test(contact.lastName)) {
    last.classList.add("is-invalid");
    errors.lastName.innerHTML =
      "Ceci n'est pas un nom, doit contenir que des lettres !";
    return false;
  } else {
    last.classList.remove("is-invalid");
    last.classList.add("is-valid");
    errors.lastName.innerText = "";
    return true;
  }
}

function emailValidation() {
  const contact = getData();
  const regMail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!regMail.test(contact.email)) {
    mail.classList.add("is-invalid");
    errors.email.innerHTML = "Veuillez entrer un email valide.";
    return false;
  } else {
    mail.classList.remove("is-invalid");
    mail.classList.add("is-valid");
    errors.email.innerText = "";
    return true;
  }
}

function birthdateValidation() {
  const contact = getData();
  const regDate = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
  const userBirthdate = new Date(contact.birthdate).getFullYear();
  const todayYear = new Date().getFullYear();

  console.log(todayYear - userBirthdate > 100);
  if (contact.birthdate == "") {
    birthdate.classList.add("is-invalid");
    errors.birthdate.innerHTML = "Veuillez remplir le champs.";
    return false;
  }

  if (
    !regDate.test(userBirthdate) ||
    todayYear <= userBirthdate ||
    todayYear - userBirthdate > 100
  ) {
    birthdate.classList.add("is-invalid");
    errors.birthdate.innerHTML = "Veuillez entrer une date valide.";
    return false;
  }

  if (todayYear - userBirthdate < 12) {
    birthdate.classList.add("is-invalid");
    errors.birthdate.innerHTML =
      "Vous devez avoir 12 ans ou plus pour vous inscrire. ";
    return false;
  } else {
    birthdate.classList.remove("is-invalid");
    birthdate.classList.add("is-valid");
    errors.birthdate.innerText = "";
    return true;
  }
}

function quantityValidation() {
  const contact = getData();

  if (contact.quantity.length == "") {
    quantity.classList.add("is-invalid");
    errors.quantity.innerHTML = "Veuillez entrer un chiffre !";
    return false;
  }

  if (contact.quantity < 0 || contact.quantity > 99) {
    quantity.classList.add("is-invalid");
    errors.quantity.innerHTML = "Vous devez entrez un nombre entre 0 et 99!";
    return false;
  } else {
    quantity.classList.remove("is-invalid");
    quantity.classList.add("is-valid");
    errors.quantity.innerText = "";
    return true;
  }
}

function locationValidation() {
  const contact = getData();

  if (!contact.location) {
    errors.location.innerHTML = "Vous devez choisir une option.";
    return false;
  } else {
    errors.location.innerText = "";
    return true;
  }
}

function cgvValidation() {
  const contact = getData();

  if (!contact.cgv.checked) {
    errors.cgv.innerHTML =
      "Vous devez vérifier que vous acceptez les termes et conditions.";
    return false;
  } else {
    errors.cgv.innerText = "";
    return true;
  }
}

//validate form
function validate(e) {
  e.preventDefault();
  let firstNameValid = false;
  lastNameValid = false;
  emailValid = false;
  birthdateValid = false;
  quantityValid = false;
  locationValid = false;
  cgvValid = false;

  first.classList.remove("is-valid", "is-invalid");
  last.classList.remove("is-valid", "is-invalid");
  mail.classList.remove("is-valid", "is-invalid");
  birthdate.classList.remove("is-valid", "is-invalid");
  quantity.classList.remove("is-valid", "is-invalid");

  // first name validation + input color change
  if (firstNameValidation()) {
    firstNameValid = true;
  }

  //last name validation + input color change
  if (lastNameValidation()) {
    lastNameValid = true;
  }

  // email Validation + input color change
  if (emailValidation()) {
    emailValid = true;
  }

  // birthdate validation + input color change
  if (birthdateValidation()) {
    birthdateValid = true;
  }

  // quantity validation + input color change
  if (quantityValidation()) {
    quantityValid = true;
  }

  // location validation + input color change
  if (locationValidation()) {
    locationValid = true;
  }

  // cgv validation + input color change
  if (cgvValidation()) {
    cgvValid = true;
  }

  //if valid then closemodal & show confirm message
  if (
    firstNameValid &&
    lastNameValid &&
    emailValid &&
    birthdateValid &&
    quantityValid &&
    locationValid &&
    cgvValid
  ) {
    closemodal();
    showConfirmMsg();
  }
}

//show registration msg
function showConfirmMsg() {
  confirmMsg.style.display = "block"; //show modal
  document.body.style.overflow = "hidden"; // hide modal
}

//close registration msg
closeMsg.addEventListener("click", closemodal);
