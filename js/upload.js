'use strict';
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCode = {
    OK: 200
  };

  window.upload = function (data, onError, onSuccess) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        console.log(xhr.status);
        console.log(xhr.response);

        onError();
      }
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  // После заполнения всех данных, при нажатии на кнопку «Опубликовать»,
  // все данные из формы, включая изображения, с помощью AJAX-запроса
  // отправляются на сервер https://javascript.pages.academy/keksobooking
  // методом POST с типом multipart/form-data.

})();
