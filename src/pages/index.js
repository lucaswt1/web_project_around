import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

// Variável para armazenar o ID do usuário atual
let currentUserId = null;

// Instância da API
const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "9114a62b-1904-4102-94b7-18aa77b6a7fe",
    "Content-Type": "application/json",
  },
});

// Função para carregar dados iniciais da aplicação
function loadAppInfo() {
  api
    .getAppInfo()
    .then(([userData, cards]) => {
      currentUserId = userData._id;
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
      });
      cardList.renderItems(cards.reverse());
    })
    .catch((error) => {
      console.log("Erro ao carregar dados da aplicação:", error);
    });
}

// Função para salvar informações do usuário no servidor
function saveUserInfo(name, about, popup) {
  const submitButton = popup._popup.querySelector(".popup__save-button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .updateUserInfo(name, about)
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar,
      });
      popup.close();
    })
    .catch((error) => {
      console.log("Erro ao salvar informações do usuário:", error);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

// Função para atualizar avatar do usuário no servidor
function updateAvatar(avatarUrl, popup) {
  const submitButton = popup._popup.querySelector(".popup__save-button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .updateAvatar(avatarUrl)
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        job: result.about,
        avatar: result.avatar,
      });
      popup.close();
    })
    .catch((error) => {
      console.log("Erro ao atualizar avatar:", error);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

// Função para adicionar novo cartão no servidor
function addCard(name, link, popup) {
  const submitButton = popup._popup.querySelector(".popup__save-button");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Salvando...";

  api
    .addCard(name, link)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardList.addItem(cardElement);
      popup.close();
    })
    .catch((error) => {
      console.log("Erro ao adicionar cartão:", error);
    })
    .finally(() => {
      submitButton.textContent = originalText;
    });
}

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
const avatarElement = document.querySelector(".profile__avatar-container");
const nameInput = document.querySelector("#name");
const aboutInput = document.querySelector("#about-me");

// Formulários
const profileForm = document.querySelector(
  ".popup_type_edit-profile .popup__form"
);
const addCardForm = document.querySelector(".popup_type_add-card .popup__form");
const avatarForm = document.querySelector(
  ".popup_type_edit-avatar .popup__form"
);

// Instâncias dos validadores
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
const editAvatarValidator = new FormValidator(validationConfig, avatarForm);

// Instância de UserInfo
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__occupation",
  avatarSelector: ".profile__avatar",
});

// Instância do Popup de Imagem
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// Instância do Popup de Confirmação de Exclusão
const confirmDeletePopup = new PopupWithConfirmation(
  ".popup_type_confirm-delete",
  () => {
    const { cardId, cardElement } = confirmDeletePopup.getConfirmationData();
    const submitButton = confirmDeletePopup._popup.querySelector(
      ".popup__save-button"
    );
    const originalText = submitButton.textContent;
    submitButton.textContent = "Excluindo...";

    api
      .deleteCard(cardId)
      .then(() => {
        cardElement.remove();
        confirmDeletePopup.close();
      })
      .catch((error) => {
        console.log("Erro ao deletar cartão:", error);
      })
      .finally(() => {
        submitButton.textContent = originalText;
      });
  }
);
confirmDeletePopup.setEventListeners();

// Função para criar um novo cartão
function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    (cardId, isLiked) => {
      if (isLiked) {
        api
          .unlikeCard(cardId)
          .then((updatedCard) => {
            card.setLikeState(updatedCard.isLiked);
          })
          .catch((error) => {
            console.log("Erro ao descurtir cartão:", error);
          });
      } else {
        api
          .likeCard(cardId)
          .then((updatedCard) => {
            card.setLikeState(updatedCard.isLiked);
          })
          .catch((error) => {
            console.log("Erro ao curtir cartão:", error);
          });
      }
    },
    (cardId, cardElement) => {
      confirmDeletePopup.open({ cardId, cardElement });
    },
    currentUserId
  );
  return card.generateCard();
}

// Instância da Seção de Cartões
const cardList = new Section(
  {
    items: [],
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
    saveUserInfo(formData.name, formData["about-me"], editProfilePopup);
  }
);
editProfilePopup.setEventListeners();

// Instância do Popup de Adição de Cartão
const addCardPopup = new PopupWithForm(".popup_type_add-card", (formData) => {
  addCard(formData["card-title"], formData["card-link"], addCardPopup);
});
addCardPopup.setEventListeners();

// Instância do Popup de Edição de Avatar
const editAvatarPopup = new PopupWithForm(
  ".popup_type_edit-avatar",
  (formData) => {
    updateAvatar(formData["avatar-url"], editAvatarPopup);
  }
);
editAvatarPopup.setEventListeners();

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

avatarElement.addEventListener("click", () => {
  editAvatarValidator.resetValidation();
  editAvatarPopup.open();
});

// Habilita a validação
editProfileValidator.enableValidation();
addCardValidator.enableValidation();
editAvatarValidator.enableValidation();

// Carrega os dados iniciais da aplicação (usuário e cartões)
loadAppInfo();
