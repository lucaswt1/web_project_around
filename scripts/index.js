import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openPopup, closePopup } from "./utils.js";

// Configuração da validação
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__input-error_visible",
};

// Botões
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll(".popup__close-button");

// Popups
const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");

// Formulário de edição de perfil
const profileForm = editProfilePopup.querySelector(".popup__form");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about-me");

// Formulário de adição de cartão
const cardForm = addCardPopup.querySelector(".popup__form");
const cardTitleInput = addCardPopup.querySelector("#card-title");
const cardImageInput = addCardPopup.querySelector("#card-link");

// Elementos do perfil
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__occupation");

// Elementos do popup de imagem
const popupImage = imagePopup.querySelector(".popup__image");
const imageCaption = imagePopup.querySelector(".popup__image-caption");

// Container de cartões
const cardsContainer = document.querySelector(".elements");

// Template do cartão
const cardTemplate = document.querySelector("#card-template").content;

// Array de cartões iniciais
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Instâncias dos validadores de formulário
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, cardForm);

function handleCardClick(name, link) {
  popupImage.src = link;
  popupImage.alt = `Visualização ampliada de ${name}`;
  imageCaption.textContent = name;
  openPopup(imagePopup);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardClick);
  return card.generateCard();
}

function handleOverlayClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup__opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// Event Listeners
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;
  editProfileValidator.resetValidation();
  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  cardForm.reset();
  addCardValidator.resetValidation();
  openPopup(addCardPopup);
});

profileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = aboutInput.value;
  closePopup(editProfilePopup);
});

cardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardImageInput.value,
  };
  const cardElement = createCard(newCardData);
  cardsContainer.prepend(cardElement);
  cardForm.reset();
  closePopup(addCardPopup);
});

// Event listeners botões de fechar
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// Inicialização
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardsContainer.append(cardElement);
});

// Habilitando validação dos formulários
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
