import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// Dados iniciais
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

// Configuração da validação
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__input-error_visible",
};

// Seletores
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about-me");

// Formulários
const profileForm = document.querySelector(
  ".popup_type_edit-profile .popup__form"
);
const addCardForm = document.querySelector(".popup_type_add-card .popup__form");

// Instâncias dos validadores
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

// Instância de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__occupation",
});

// Instância do Popup de Imagem
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// Função para criar um novo cartão
function createCard(item) {
  const card = new Card(item, "#card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

// Instância da Seção de Cartões
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardList.addItem(cardElement);
    },
  },
  ".elements"
);

// Instância do Popup de Edição de Perfil
const editProfilePopup = new PopupWithForm(
  ".popup_type_edit-profile",
  (formData) => {
    userInfo.setUserInfo({ name: formData.name, job: formData["about-me"] });
    editProfilePopup.close();
  }
);
editProfilePopup.setEventListeners();

// Instância do Popup de Adição de Cartão
const addCardPopup = new PopupWithForm(".popup_type_add-card", (formData) => {
  const newCardData = {
    name: formData["card-title"],
    link: formData["card-link"],
  };
  const cardElement = createCard(newCardData);
  cardList.addItem(cardElement);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

// Adiciona os listeners aos botões
profileEditButton.addEventListener("click", () => {
  const currentUserInfo = userInfo.getUserInfo();
  nameInput.value = currentUserInfo.name;
  aboutInput.value = currentUserInfo.job;
  editProfileValidator.resetValidation();
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  addCardPopup.open();
});

// Renderiza os cartões iniciais
cardList.renderItems();

// Habilita a validação
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
