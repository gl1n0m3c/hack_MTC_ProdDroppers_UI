user_id = sessionStorage.getItem('userid');
if (user_id == null) {
    user_id = 0;
}

var currentUrl = window.location.href;
var roomID = currentUrl.match(/\d+/)[0];

// First XMLHttpRequest to fetch room list
var roomsXHR = new XMLHttpRequest();
roomsXHR.open('GET', 'https://music-mts.ru:5000/rooms/', true);

roomsXHR.onload = function () {
    if (roomsXHR.status >= 200 && roomsXHR.status < 300) {
        var roomsData = JSON.parse(roomsXHR.responseText);

        // Find the room with the matching ID
        var selectedRoom = roomsData.find(function (room) {
            return room.id === parseInt(roomID);
        });

        if (selectedRoom) {
            // Set innerHTML for the element with id="room_name"
            var roomNameElement = document.getElementById('room_name');
            if (roomNameElement) {
                roomNameElement.innerHTML = selectedRoom.name;
            }
        } else {
            console.error('Room not found for ID:', roomID);
        }
    } else {
        console.error('Error fetching rooms:', roomsXHR.statusText);
    }
};

roomsXHR.send();
