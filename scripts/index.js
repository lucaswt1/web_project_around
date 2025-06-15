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

function createCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".elements__grid")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__grid-image");
  const cardTitle = cardElement.querySelector(".elements__grid-text-name");
  const likeButton = cardElement.querySelector(".elements__like-button");
  const deleteButton = cardElement.querySelector(".elements__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = `Fotografia de ${cardData.name}`;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => {
    openImagePopup(cardData);
  });

  likeButton.addEventListener("click", handleLikeCard);
  deleteButton.addEventListener("click", handleDeleteCard);

  return cardElement;
}

function handleLikeCard(evt) {
  evt.target.classList.toggle("elements__like-button_active");
}

function handleDeleteCard(evt) {
  evt.target.closest(".elements__grid").remove();
}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = `Visualização ampliada de ${cardData.name}`;
  imageCaption.textContent = cardData.name;
  openPopup(imagePopup);
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    cardsContainer.append(cardElement);
  });
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

function openPopup(popup) {
  popup.classList.add("popup__opened");
  document.addEventListener("keydown", handleEscClose);
  popup.addEventListener("mousedown", handleOverlayClick);
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
  document.removeEventListener("keydown", handleEscClose);
  popup.removeEventListener("mousedown", handleOverlayClick);
}

// Event Listeners
editProfileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileDescription.textContent;

  // Força a validação inicial dos campos
  const event = new Event("input");
  nameInput.dispatchEvent(event);
  aboutInput.dispatchEvent(event);

  openPopup(editProfilePopup);
});

addCardButton.addEventListener("click", () => {
  cardForm.reset();
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

// Inicialização
renderInitialCards();

// Configuração da validação
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__form-input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form-input_type_error",
  errorClass: "popup__input-error_visible",
});
