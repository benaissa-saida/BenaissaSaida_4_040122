// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelectorAll(".close");
const confirmMsg = document.querySelector(".confirmMsg");
const closeMsg = document.getElementById("closeMsg");

// REGEX
const regMail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexNoNum =
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
  modalbg.style.display = "block";
  document.body.style.overflow = "hidden";
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
closeBtn.forEach((btn) => btn.addEventListener("click", closemodal));

//get data from form
const getData = () => {
  const contact = {
    firstName: document.getElementById("first").value,
    lastName: document.getElementById("last").value,
    email: document.getElementById("email").value,
    birthdate: document.getElementById("birthdate").value,
    quantity: document.getElementById("quantity").value,
    location: document.querySelector("input[type=radio]").value,
    cgv: document.getElementById("checkbox1").value,
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
  cgv: document.getElementById("error-checkbox1"),
};

function firstNameValidation() {
  const contact = getData();

  if (contact.firstName.length == 0 && contact.firstName.length < 2) {
    errors.firstName.innerHTML =
      "Il doit contenir au minimum deux caractères !";
    return false;
  }
  if (!regexNoNum.test(contact.firstName)) {
    errors.firstName.innerHTML =
      "Ceci n'est pas un prénom, doit contenir que des lettres !";
    return false;
  } else {
    errors.firstName.innerText = "";
    return true;
  }
}
//validate form
function validate() {
  event.preventDefault();
  let firstNameValid = false;
  lastNameValid = false;
  emailValid = false;
  birthdateValid = false;
  quantityValid = false;
  locationValid = false;
  cgvValid = false;

  document.getElementById("first").classList.remove("is-valid", "is-invalid");
  document.getElementById("last").classList.remove("is-valid", "is-invalid");
  document.getElementById("email").classList.remove("is-valid", "is-invalid");
  document
    .getElementById("birthdate")
    .classList.remove("is-valid", "is-invalid");
  document
    .getElementById("quantity")
    .classList.remove("is-valid", "is-invalid");

  firstNameValidation();
  if (firstNameValidation()) {
    firstNameValid = true;
  }
  document
    .getElementById("first")
    .classList.add(firstNameValid ? "is-valid" : "is-invalid");

  if (firstNameValid && lastNameValid && emailValid && birthdateValid && quantityValid && locationValid && cgvValid) {
    closemodal();
    showConfirmMsg();
  }
}
//show registration msg
function showConfirmMsg() {
  event.preventDefault();
  confirmMsg.style.display = "block";
  document.body.style.overflow = "hidden";
}
//close registration msg
closeMsg.addEventListener("click", closemodal);
