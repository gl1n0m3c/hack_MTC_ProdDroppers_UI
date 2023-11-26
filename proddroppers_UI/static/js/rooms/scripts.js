userid = sessionStorage.getItem('userid');
var library = document.getElementById('library')
var profile = document.getElementById('profile')
profile.href = window.location.origin + "/profile/" + userid
library.href = window.location.origin + "/music/" + userid
var xhr = new XMLHttpRequest();

// Настройка запроса (GET-запрос по указанному URL)
xhr.open('GET', 'https://music-mts.ru:5000/users/profile/' + userid + '/', true);

// Установка обработчика события загрузки
xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        // Обработка данных в формате JSON
        var responseData = JSON.parse(xhr.responseText);
        console.log(responseData);
        var usernameHeadings = document.querySelectorAll('[id="my_username"]');
        usernameHeadings.forEach(function (heading) {
            heading.textContent = responseData.username; // Замените "Новое значение" на ваше новое значение
        });
        document.getElementById('submit').onclick = function() {
            createRoom(responseData.username);
        };        
    } else {
        // Обработка ошибок
        alert('There was a problem with the request:', xhr.statusText);
    }
};

// Отправка запроса
xhr.send();

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
    linesElement.addEventListener('mouseenter', function () {
        if (isNavigationBarVisible) {
            navigationBarElement.style.display = 'none';
        } else {
            navigationBarElement.style.display = 'flex';
        }


        isNavigationBarVisible = !isNavigationBarVisible;
    });
});

function createRoom(username) {
    var xhr = new XMLHttpRequest();
    var data = {
        name: username,
    };

    xhr.open('POST', 'https://music-mts.ru:5000/rooms/create/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200 || xhr.status == 201) {
                alert("Create")
            } else {
                var jsonResponse = JSON.parse(xhr.responseText);
                alert("Error")
            }
        }
    };
    var jsonData = JSON.stringify(data);

    // Send the request with the JSON data
    xhr.send(jsonData);
}
