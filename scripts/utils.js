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

export { openPopup, closePopup };
