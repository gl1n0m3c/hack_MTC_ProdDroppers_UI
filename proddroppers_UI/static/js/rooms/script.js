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
                    
                        // Create an anchor element
                        var anchorElement = document.createElement('a');
                        anchorElement.href = window.location.origin + "/room/" + room.id; // Set href attribute
                    
                        // Create the SVG element
                        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        svgElement.setAttribute("width", "4vh");
                        svgElement.setAttribute("height", "4vh");
                        svgElement.setAttribute("viewBox", "0 0 40 40");
                        svgElement.setAttribute("fill", "none");
                    
                        // Create the path element for the SVG
                        var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathElement.setAttribute("d", "M19.9999 5C19.9999 5 9.68992 13.9 3.92825 18.72C3.74491 18.8797 3.5972 19.0762 3.4947 19.2968C3.3922 19.5173 3.33719 19.7569 3.33325 20C3.33325 20.442 3.50885 20.8659 3.82141 21.1785C4.13397 21.4911 4.55789 21.6667 4.99992 21.6667H8.33325V33.3333C8.33325 33.7754 8.50885 34.1993 8.82141 34.5118C9.13397 34.8244 9.55789 35 9.99992 35H14.9999C15.4419 35 15.8659 34.8244 16.1784 34.5118C16.491 34.1993 16.6666 33.7754 16.6666 33.3333V26.6667H23.3333V33.3333C23.3333 33.7754 23.5088 34.1993 23.8214 34.5118C24.134 34.8244 24.5579 35 24.9999 35H29.9999C30.4419 35 30.8659 34.8244 31.1784 34.5118C31.491 34.1993 31.6666 33.7754 31.6666 33.3333V21.6667H34.9999C35.4419 21.6667 35.8659 21.4911 36.1784 21.1785C36.491 20.8659 36.6666 20.442 36.6666 20C36.6643 19.7522 36.6056 19.5082 36.495 19.2864C36.3844 19.0646 36.2248 18.871 36.0283 18.72C30.3066 13.9 19.9999 5 19.9999 5Z"); // Replace with your path data
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
                    
                        // Append the anchor element to the friends row
                        friendsRow.appendChild(anchorElement);
                    
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
