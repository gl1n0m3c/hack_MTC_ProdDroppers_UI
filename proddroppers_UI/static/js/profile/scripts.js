// Получаем текущий URL страницы
var currentUrl = window.location.href;
// Извлекаем цифры из URL
var userid = currentUrl.match(/\d+/)[0];
var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://music-mts.ru:5000/users/profile/'+userid+'/', true);

// Установка обработчика события загрузки
xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    // Обработка данных в формате JSON
    var responseData = JSON.parse(xhr.responseText);
    console.log(responseData);
    var usernameHeadings = document.querySelectorAll('[id="username"]');
    usernameHeadings.forEach(function (heading) {
        heading.textContent = responseData.username; // Замените "Новое значение" на ваше новое значение
    });
    var emnailHeadings = document.querySelectorAll('[id="email"]');
    emnailHeadings.forEach(function (heading) {
        heading.textContent = responseData.email; // Замените "Новое значение" на ваше новое значение
    });
  } else {
    // Обработка ошибок
    alert('There was a problem with the request:', xhr.statusText);
  }
};

// Отправка запроса
xhr.send();