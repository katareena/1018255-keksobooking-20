'use strict';
(function () {
  // получение данных
  // URL = 'https://javascript.pages.academy/keksobooking/data';
  // METHOD = 'GET';

  // отправка данных
  // URL = 'https://javascript.pages.academy/keksobooking';
  // METHOD = 'POST';

  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  window.operateData = function (method, url, onError, onSuccess, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    xhr.send(data);
  };

})();
