// Função para mostrar mensagem de erro
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Função para esconder mensagem de erro
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = "";
}

// Função para checar validade do input
function checkInputValidity(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    if (inputElement.validity.valueMissing) {
      showInputError(
        formElement,
        inputElement,
        "Please fill out this field.",
        config
      );
    } else if (inputElement.validity.tooShort) {
      showInputError(
        formElement,
        inputElement,
        `Please lengthen this text to ${
          inputElement.minLength
        } characters or more (you are currently using ${
          inputElement.value.length
        } character${inputElement.value.length === 1 ? "" : "s"}).`,
        config
      );
    } else if (inputElement.type === "url" && !inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        "Please enter a web address.",
        config
      );
    } else {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        config
      );
    }
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Função para verificar se há inputs inválidos
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Função para alternar estado do botão
function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
}

// Função para adicionar listeners de input
function setEventListeners(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Configura estado inicial do botão
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  formElement.addEventListener("submit", (evt) => {
    evt.preventDefault();
  });
}

// Função principal de habilitação da validação
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}
