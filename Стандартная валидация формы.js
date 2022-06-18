const form = document.querySelector(".form");
let scrollPosition = window.pageYOffset;

// Создание Проверки на символы
let emailRegex =
  "^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$";
let nameRegex = "[a-z, а-я]";
// LOCALSTORAGE
let userObj = window.localStorage;

// Функция текста ошибки
function setErrorMessage(elem, text) {
  elem.nextElementSibling.textContent = text;
}

// Функция Удаления текста ошибки
function removeErrorMessage(elem) {
  elem.nextElementSibling.textContent = "";
}

// Функция становления границы для текстов Ошибки или правильного ответа
function setBorderColor(elem, color) {
  elem.style.border = `2px solid ${color}`;
}

// Функция Успеха
function setSuccess(elem) {
  elem.dataset.success = true;
}

// Функция удаления успеха
function removeSuccess(elem) {
  elem.dataset.success = "";
}

// Функция валидации
function validateElem(elem, condition, text) {
  if (elem.value != "" && condition) {
    setBorderColor(elem, "green");
    setSuccess(elem);
    removeErrorMessage(elem);
    userObj.setItem(elem.name, elem.value);
  } else {
    setErrorMessage(elem, text);
    setBorderColor(elem, "red");
    removeSuccess(elem);
  }
}

// Условие проверки формы
if (form) {
  const userEmail = document.querySelector('.form input[name="email"]');
  // Имя элементов input
  const userName = document.querySelector('.form input[name="name"]');
  // Имя элементов input
  userObj.clear();
  // Очистка localstorage
  // Событие клика и обработка функции
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateElem(
      userName,
      userName.value.match(nameRegex),
      "Введите корректное имя. В имени не должно быть чисел"
    );
    validateElem(userEmail, userEmail.value.match(emailRegex), "");
    console.log(userObj);
  });
}
