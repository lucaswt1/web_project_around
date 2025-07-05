export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard() {
    this._likeButton.classList.toggle("elements__like-button_active");
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeCard());
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard()
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link)
    );
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".elements__grid-image");
    this._cardTitle = this._element.querySelector(".elements__grid-text-name");
    this._likeButton = this._element.querySelector(".elements__like-button");
    this._deleteButton = this._element.querySelector(
      ".elements__delete-button"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = `Fotografia de ${this._name}`;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
