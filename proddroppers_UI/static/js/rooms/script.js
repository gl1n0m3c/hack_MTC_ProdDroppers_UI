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
                    console.log(roomsData);
                    var friendsContainer = document.querySelector('.friends');

                    // Iterate over each room in roomsData
                    roomsData.forEach(function (room) {
                        // Create a new friends row div
                        var friendsRow = document.createElement('div');
                        friendsRow.className = 'friends_row';

                        // Create the SVG element
                        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        svgElement.setAttribute("width", "40");
                        svgElement.setAttribute("height", "40");
                        svgElement.setAttribute("viewBox", "0 0 40 40");
                        svgElement.setAttribute("fill", "none");

                        // Create the path element for the SVG
                        var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathElement.setAttribute("d", "M28.2052 15.2382H22.0514V9.52389C22.0514 8.76613 21.7272 8.0394 21.1502 7.50359C20.5731 6.96777 19.7905 6.66675 18.9744 6.66675C18.1584 6.66675 17.3758 6.96777 16.7987 7.50359C16.2217 8.0394 15.8975 8.76613 15.8975 9.52389L16.0067 15.2382H9.74367C8.92762 15.2382 8.14499 15.5392 7.56796 16.075C6.99092 16.6108 6.66675 17.3376 6.66675 18.0953C6.66675 18.8531 6.99092 19.5798 7.56796 20.1156C8.14499 20.6514 8.92762 20.9525 9.74367 20.9525L16.0067 20.851L15.8975 26.6667C15.8975 27.4245 16.2217 28.1512 16.7987 28.6871C17.3758 29.2229 18.1584 29.5239 18.9744 29.5239C19.7905 29.5239 20.5731 29.2229 21.1502 28.6871C21.7272 28.1512 22.0514 27.4245 22.0514 26.6667V20.851L28.2052 20.9525C29.0213 20.9525 29.8039 20.6514 30.3809 20.1156C30.958 19.5798 31.2821 18.8531 31.2821 18.0953C31.2821 17.3376 30.958 16.6108 30.3809 16.075C29.8039 15.5392 29.0213 15.2382 28.2052 15.2382Z"); // Replace with your path data
                        pathElement.setAttribute("fill", "#747474");

                        // Create the circle element for the SVG
                        var circleElement = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        circleElement.setAttribute("cx", "36");
                        circleElement.setAttribute("cy", "36");
                        circleElement.setAttribute("r", "4");
                        circleElement.setAttribute("fill", "#00A607");

                        // Append path and circle elements to the SVG
                        svgElement.appendChild(pathElement);
                        svgElement.appendChild(circleElement);

                        // Create the inroom div
                        var inroomDiv = document.createElement('div');
                        inroomDiv.className = 'inroom';
                        
                        // Create the heading elements
                        var h2Element = document.createElement('h2');
                        h2Element.textContent = 'комната';

                        var h1Element = document.createElement('h1');
                        h1Element.textContent = room.name; // Use the room name here

                        // Append heading elements to the inroom div
                        inroomDiv.appendChild(h2Element);
                        inroomDiv.appendChild(h1Element);

                        // Append SVG and inroom div to the friends row
                        friendsRow.appendChild(svgElement);
                        friendsRow.appendChild(inroomDiv);

                        // Append the friends row to the container
                        friendsContainer.appendChild(friendsRow);
                    });
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
