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
                        // Create an anchor element
                        var anchorElement = document.createElement('a');
                        anchorElement.href = window.location.origin + "/room/" + room.id; // Set href attribute
                        anchorElement.style.textDecoration = "None"; // Set inline style
                    
                        // Create a new friends row div
                        var friendsRow = document.createElement('div');
                        friendsRow.className = 'friends_row';
                    
                        // Create the SVG element
                        var svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                        svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                        svgElement.setAttribute("width", "3.4vh");
                        svgElement.setAttribute("height", "3vh");
                        svgElement.setAttribute("viewBox", "0 0 34 30");
                        svgElement.setAttribute("fill", "none");
                    
                        // Create the path element for the SVG
                        var pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
                        pathElement.setAttribute("d", "M16.9999 0C16.9999 0 6.68992 8.9 0.928252 13.72C0.744914 13.8797 0.597202 14.0762 0.494699 14.2968C0.392196 14.5173 0.337191 14.7569 0.333252 15C0.333252 15.442 0.508847 15.8659 0.821407 16.1785C1.13397 16.4911 1.55789 16.6667 1.99992 16.6667H5.33325V28.3333C5.33325 28.7754 5.50885 29.1993 5.82141 29.5118C6.13397 29.8244 6.55789 30 6.99992 30H11.9999C12.4419 30 12.8659 29.8244 13.1784 29.5118C13.491 29.1993 13.6666 28.7754 13.6666 28.3333V21.6667H20.3333V28.3333C20.3333 28.7754 20.5088 29.1993 20.8214 29.5118C21.134 29.8244 21.5579 30 21.9999 30H26.9999C27.4419 30 27.8659 29.8244 28.1784 29.5118C28.491 29.1993 28.6666 28.7754 28.6666 28.3333V16.6667H31.9999C32.4419 16.6667 32.8659 16.4911 33.1784 16.1785C33.491 15.8659 33.6666 15.442 33.6666 15C33.6643 14.7522 33.6056 14.5082 33.495 14.2864C33.3844 14.0646 33.2248 13.871 33.0283 13.72C27.3066 8.9 16.9999 0 16.9999 0Z"); // Replace with your path data
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
                    
                        // Append the friends row to the anchor element
                        anchorElement.appendChild(friendsRow);
                    
                        // Append the anchor element to the container
                        friendsContainer.appendChild(anchorElement);
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
