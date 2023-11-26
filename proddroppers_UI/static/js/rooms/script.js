userid = sessionStorage.getItem('userid');
var library = document.getElementById('library')
var profile = document.getElementById('profile')
profile.href = window.location.origin + "/profile/" + userid
library.href = window.location.origin + "/music/" + userid

document.addEventListener('DOMContentLoaded', function () {
    var xhrProfile = new XMLHttpRequest();

    // Настройка запроса (GET-запрос по указанному URL)
    xhrProfile.open('GET', 'https://music-mts.ru:5000/users/profile/' + userid + '/', true);

    // Установка обработчика события загрузки
    xhrProfile.onload = function () {
        if (xhrProfile.status >= 200 && xhrProfile.status < 300) {
            // Обработка данных в формате JSON
            var responseData = JSON.parse(xhrProfile.responseText);
            console.log(responseData);
            var usernameHeadings = document.querySelectorAll('[id="my_username"]');
            usernameHeadings.forEach(function (heading) {
                heading.textContent = responseData.username;
            });

            // Создаем второй запрос
            var xhrRooms = new XMLHttpRequest();

            // Настройка второго запроса (GET-запрос по указанному URL)
            xhrRooms.open('GET', 'https://music-mts.ru:5000/rooms/', true);

            // Установка обработчика события загрузки для второго запроса
            xhrRooms.onload = function () {
                if (xhrRooms.status >= 200 && xhrRooms.status < 300) {
                    // Обработка данных в формате JSON для второго запроса
                    var roomsData = JSON.parse(xhrRooms.responseText);
                    alert(roomsData);

                    // Далее вы можете использовать данные о комнатах, например, отобразить их на странице
                } else {
                    // Обработка ошибок для второго запроса
                    console.error('There was a problem with the request:', xhrRooms.statusText);
                }
            };

            // Отправка второго запроса
            xhrRooms.send();

            document.getElementById('create_room').onclick = function() {
                createRoom(responseData.username);
            };        
        } else {
            // Обработка ошибок для первого запроса
            alert('There was a problem with the request:', xhrProfile.statusText);
        }
    };

    // Отправка первого запроса
    xhrProfile.send();

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
