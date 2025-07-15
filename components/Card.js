export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._owner = data.owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".elements__grid")
      .cloneNode(true);

    return cardElement;
  }

  _handleLikeCard() {
    this._handleLikeClick(this._id, this._isLiked);
  }

  setLikeState(isLiked) {
    this._isLiked = isLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("elements__like-button_active");
    } else {
      this._likeButton.classList.remove("elements__like-button_active");
    }
  }

  _handleDeleteCard() {
    this._handleDeleteClick(this._id, this._element);
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

    // Mostrar/esconder lixeira baseado na propriedade do cartão
    if (this._owner !== this._currentUserId) {
      this._deleteButton.style.display = "none";
    }

    this.setLikeState(this._isLiked);
    this._setEventListeners();

    return this._element;
  }
}
