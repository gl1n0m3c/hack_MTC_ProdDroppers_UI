myID = sessionStorage.getItem('userid');

var library = document.getElementById('library')
var profile = document.getElementById('profile')

profile.href = window.location.origin+"/profile/" + myID
library.href = window.location.origin+"/music/" + myID

// Получаем текущий URL страницы
var currentUrl = window.location.href;

// Извлекаем цифры из URL
var userid = currentUrl.match(/\d+/)[0];

// Если myID равен userid, то делаем один запрос для обоих ID
if (myID === userid) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://music-mts.ru:5000/users/profile/' + myID + '/', true);

  // Установка обработчика события загрузки
  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      // Обработка данных в формате JSON
      var responseData = JSON.parse(xhr.responseText);
      console.log(responseData);

      // Обновляем элементы с ID my_username, username и email
      var myUsernameHeadings = document.querySelectorAll('[id="my_username"]');
      myUsernameHeadings.forEach(function (heading) {
        heading.textContent = responseData.username;
      });

      var usernameHeadings = document.querySelectorAll('[id="username"]');
      usernameHeadings.forEach(function (heading) {
        heading.textContent = responseData.username;
      });

      var emailHeadings = document.querySelectorAll('[id="email"]');
      emailHeadings.forEach(function (heading) {
        heading.textContent = responseData.email;
      });
    } else {
      // Обработка ошибок
      alert('There was a problem with the request:', xhr.statusText);
    }
  };

  // Отправка запроса
  xhr.send();
} else {
  // Если myID не равен userid, делаем два последовательных запроса для каждого ID
  document.getElementById('pass_label').style.display = "None";
  document.getElementById('pass_label2').style.display = "None";
  document.getElementById('column_edit').style.display = "None";
  var xhr1 = new XMLHttpRequest();
  xhr1.open('GET', 'https://music-mts.ru:5000/users/profile/' + userid + '/', true);

  // Установка обработчика события загрузки
  xhr1.onload = function () {
    if (xhr1.status >= 200 && xhr1.status < 300) {
      // Обработка данных в формате JSON
      var responseData = JSON.parse(xhr1.responseText);
      console.log(responseData);

      // Обновляем элементы с ID username и email
      var usernameHeadings = document.querySelectorAll('[id="username"]');
      usernameHeadings.forEach(function (heading) {
        heading.textContent = responseData.username;
      });

      var emailHeadings = document.querySelectorAll('[id="email"]');
      emailHeadings.forEach(function (heading) {
        heading.textContent = responseData.email;
      });
    } else {
      // Обработка ошибок
      alert('There was a problem with the request:', xhr1.statusText);
    }
  };

  // Отправка запроса
  xhr1.send();

  // Затем делаем запрос для myID
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', 'https://music-mts.ru:5000/users/profile/' + myID + '/', true);

  // Установка обработчика события загрузки
  xhr2.onload = function () {
    if (xhr2.status >= 200 && xhr2.status < 300) {
      // Обработка данных в формате JSON
      var responseData = JSON.parse(xhr2.responseText);
      console.log(responseData);

      // Обновляем элементы с ID my_username
      var myUsernameHeadings = document.querySelectorAll('[id="my_username"]');
      myUsernameHeadings.forEach(function (heading) {
        heading.textContent = responseData.username;
      });
    } else {
      // Обработка ошибок
      alert('There was a problem with the request:', xhr2.statusText);
    }
  };

  // Отправка запроса
  xhr2.send();
}

document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы с классами Lines и navigation-bar
    var linesElement = document.querySelector('.nav-bar-lines');
    var navigationBarElement = document.querySelector('.navigation-bar');

    // Добавляем переменную для отслеживания состояния
    var isNavigationBarVisible = false;

    // Добавляем обработчик события для клика на элемент с классом Lines
    linesElement.addEventListener('click', function () {
        // Изменяем состояние переменной и свойство display соответственно
        if (isNavigationBarVisible) {
            navigationBarElement.style.display = 'none';
        } else {
            navigationBarElement.style.display = 'flex';
        }

        // Инвертируем значение переменной
        isNavigationBarVisible = !isNavigationBarVisible;
    });
    linesElement.addEventListener('mouseenter', function()  {
        if (isNavigationBarVisible) {
            navigationBarElement.style.display = 'none';
        } else {
            navigationBarElement.style.display = 'flex';
        }


        isNavigationBarVisible = !isNavigationBarVisible;
    });
});