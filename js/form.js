'use strict';
(function () {
  var POST_ADRESS = 'https://javascript.pages.academy/keksobooking';
  var PIN_MAIN_HALF = 31;
  var PIN_MAIN_HEIGHT = 84;
  var ESCAPE = 'Escape';

  var DISABLED_ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var MIN_PRICE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var TIME = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

  var address = document.querySelector('#address');

  // Заполнение поля адреса
  var setAddress = function () {
    var slideMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
    var slideMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;

    address.value = slideMainX + ', ' + slideMainY;
  };
  setAddress();

  // Валидация: зависимость кол-ва гостей от кол-ва комнат
  var form = document.querySelector('.ad-form');
  var rooms = form.querySelector('#room_number');
  var capacity = form.querySelector('#capacity');

  var checkCapacity = function (item) {
    if (item.selected) {
      if (item.disabled) {
        capacity.setCustomValidity('Количество гостей не соответствует количеству комнат');
      } else {
        capacity.setCustomValidity('');
      }
    }
  };

  // Валидация цены от типа комнаты - ТЗ 3.3.
  var typeRoom = form.querySelector('#type');

  // Валидация времени заезда и времени выезда - ТЗ 3.5.
  var timein = form.querySelector('#timein');
  var timeout = form.querySelector('#timeout');

  timein.addEventListener('change', function (evt) {
    for (var j = 0; j < timeout.options.length; j++) {
      timeout[j].selected = TIME[evt.target.value].includes(timeout.options[j].value);
    }
  });

  timeout.addEventListener('change', function (evt) {
    for (var j = 0; j < timein.options.length; j++) {
      timein[j].selected = TIME[evt.target.value].includes(timein.options[j].value);
    }
  });

  var setAddressPin = function () {
    var pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
    var pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HEIGHT;
    address.value = pinMainX + ', ' + pinMainY;
  };

  var disabledCapacity = function () {
    for (var j = 0; j < capacity.options.length; j++) {
      capacity[j].disabled = !DISABLED_ROOMS[rooms.value].includes(capacity.options[j].value);
      checkCapacity(capacity[j]);
    }
  };

  var setPrice = function () {
    var price = form.querySelector('#price');
    var targetValue = MIN_PRICE[typeRoom.value];
    // установи то значение атрибута, которое соответствует ключу объекта и = value выбранного элемента
    price.setAttribute('min', targetValue);
    price.setAttribute('placeholder', targetValue);
  };

  var resetAddress = function () {
    var pinMain = document.querySelector('.map__pin--main');
    pinMain.style.left = '570px';
    pinMain.style.top = '375px';
    setAddress();
  };

  // Отправка данных формы на сервер
  var main = document.querySelector('main');

  var messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var errorMassegeEscPressHandler = function (evt) {
    if (evt.key === ESCAPE) {
      messageError.remove();
      document.removeEventListener('keydown', errorMassegeEscPressHandler);
    }
  };

  var errorHandler = function () {
    main.appendChild(messageError);
    var errorButton = messageError.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      messageError.remove();
    });
    document.addEventListener('keydown', errorMassegeEscPressHandler);

    messageError.addEventListener('click', function (evt) {
      if (!errorButton.contains(evt.target)) {
        messageError.remove();
      }
    });
  };

  var messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  var successMassegeEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      messageSuccess.remove();
      document.removeEventListener('keydown', window.form.successMassegeEscPressHandler);
    }
  };

  var successMassegeClickHandler = function () {
    messageSuccess.remove();
    document.removeEventListener('keydown', window.form.successMassegeEscPressHandler);
  };

  var successHandler = function () {
    main.appendChild(messageSuccess);
    setAddress();
    document.addEventListener('keydown', window.form.successMassegeEscPressHandler);
    messageSuccess.addEventListener('click', successMassegeClickHandler);
  };

  var submitFormHandler = function (evt) {
    evt.preventDefault();
    window.operateData.operateData('POST', POST_ADRESS, errorHandler, function () {
      window.page.deactivationPageHandler();
      successHandler();
      form.removeEventListener('submit', window.form.submitFormHandler);
    }, new FormData(form));
  };


  // Экспорт
  window.form = {
    disabledCapacity: disabledCapacity,
    resetAddress: resetAddress,
    setAddressPin: setAddressPin,
    setPrice: setPrice,
    submitFormHandler: submitFormHandler,
    successMassegeEscPressHandler: successMassegeEscPressHandler
  };

  rooms.addEventListener('change', window.form.disabledCapacity);
  capacity.addEventListener('change', window.form.disabledCapacity);
  typeRoom.addEventListener('change', window.form.setPrice);

})();
