// Получаем текущий URL страницы
var currentUrl = window.location.href;
// Извлекаем цифры из URL
var userid = currentUrl.match(/\d+/)[0];
alert(userid)
