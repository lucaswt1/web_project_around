const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const editProfilePopup = document.querySelector(".popup_type_edit-profile");
const addCardPopup = document.querySelector(".popup_type_add-card");
const imagePopup = document.querySelector(".popup_type_image");

const closeButtons = document.querySelectorAll(".popup__close-button");

// campos do formulário de edição de perfil
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about-me");
const editProfileForm = editProfilePopup.querySelector(".popup__form");

// campos do formulário de adicionar cartão
const titleInput = addCardPopup.querySelector("#card-title");
const linkInput = addCardPopup.querySelector("#card-link");
const addCardForm = addCardPopup.querySelector(".popup__form");

// dados atuais do perfil
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

// elementos do popup de imagem
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__image-caption");

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

const cardTemplate = document.querySelector("#card-template").content;
const elementsContainer = document.querySelector(".elements");

function createCard(cardData) {
  const cardElement = cardTemplate
    .querySelector(".elements__grid")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__grid-image");
  const cardName = cardElement.querySelector(".elements__grid-text-name");
  const likeButton = cardElement.querySelector(".elements__like-button");
  const deleteButton = cardElement.querySelector(".elements__delete-button");

  cardImage.src = cardData.link;
  cardImage.alt = `Fotografia de ${cardData.name}`;
  cardName.textContent = cardData.name;

  // evento de clique na imagem para abrir o popup
  cardImage.addEventListener("click", () => {
    popupImage.src = cardData.link;
    popupImage.alt = `Visualização ampliada de ${cardData.name}`;
    popupCaption.textContent = cardData.name;
    openPopup(imagePopup);
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("elements__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData);
    elementsContainer.append(cardElement);
  });
}

function openPopup(popup) {
  popup.classList.add("popup__opened");
}

function closePopup(popup) {
  popup.classList.remove("popup__opened");
}

renderInitialCards();

// evento para abrir o popup de edição de perfil
editButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileOccupation.textContent;
  openPopup(editProfilePopup);
});

// evento para abrir o popup de adicionar cartão
addButton.addEventListener("click", () => {
  openPopup(addCardPopup);
});

// evento para fechar qualquer popup
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

// salvar dados e atualizar perfil
editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = aboutInput.value;

  closePopup(editProfilePopup);
});

// adicionar novo cartão
addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newCardData = {
    name: titleInput.value,
    link: linkInput.value,
  };

  const cardElement = createCard(newCardData);
  elementsContainer.prepend(cardElement);

  addCardForm.reset();
  closePopup(addCardPopup);
});
