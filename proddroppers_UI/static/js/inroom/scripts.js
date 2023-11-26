user_id = sessionStorage.getItem('userid');
if(user_id == null)
{
    user_id = 0;
}
document.querySelector('#submit').onclick = function (e) {
    const messageInputDom = document.querySelector('#input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
        'message': message,
        'user_id': parseInt(user_id),
    }));
    messageInputDom.value = '';
};

var currentUrl = window.location.href;

var roomID = currentUrl.match(/\d+/)[0];
const chatSocket = new WebSocket(
    'ws://' +
    window.location.origin +
    '/'+
    roomID +
    '/'+
    user_id +
    "/"
);

chatSocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    alert(data)
    // document.querySelector('#chat-text').value += (data.username + ': ' + data.message +'\n')
}