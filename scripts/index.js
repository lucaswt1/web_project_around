let editButton = document.querySelector(".profile__edit-button");
let popup = document.querySelector(".popup");
let closeButton = document.querySelector(".popup__close-button");

//campos do formulario
let nameInput = document.querySelector("#name");
let aboutInput = document.querySelector("#about-me");
let form = document.querySelector(".popup__form");

//dados atuais do perfil
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");

//evento clicar no botão editar
editButton.addEventListener("click", edit);

//função para abrir o popup e apresentar carregado com dados atuais do perfil
function edit() {
  nameInput.value = profileName.textContent; //pega o valor que está no perfil (Jacques Cousteau) e apresenta no campo do formulário
  aboutInput.value = profileOccupation.textContent;
  popup.classList.add("popup__opened");
}

//fechar o popup
closeButton.addEventListener("click", close);

function close() {
  popup.classList.remove("popup__opened");
}

//salvar dados e atualizar perfil
form.addEventListener("submit", saveForm);

function saveForm(event) {
  event.preventDefault(); //impede que a página recarregue (comportamento padrão do formulário)

  profileName.textContent = nameInput.value; //pega o que o usuário digitou no campo de input do formulário e coloca como texto visível no nome do perfil
  profileOccupation.textContent = aboutInput.value;

  close();
}
