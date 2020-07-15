'use strict';
(function () {
  var PIN_MAIN_HALF = 31;

  // Заполнение поля адреса
  var setAddress = function () {
    var address = document.querySelector('#address');
    var pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
    var pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;

    address.value = pinMainX + ', ' + pinMainY;
  };
  setAddress();


  // Валидация: зависимость кол-ва гостей от кол-ва комнат
  var DISABLED_ROOMS = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

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

  window.form = {
    disabledCapacity: function () {
      for (var j = 0; j < capacity.options.length; j++) {
        capacity[j].disabled = !DISABLED_ROOMS[rooms.value].includes(capacity.options[j].value);
        checkCapacity(capacity[j]);
      }
    },

    setPrice: function () {
      var price = form.querySelector('#price');
      var targetValue = MIN_PRICE[typeRoom.value];
      // установи то значение атрибута, которое соответствует ключу объекта и = value выбранного элемента
      price.setAttribute('min', targetValue);
      price.setAttribute('placeholder', targetValue);
    },

    deactivationPageHandler: function () {
      removePins();
      removeCards();
      form.reset();
      resetAddress();
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      for (var x = 0; x < elements.length; x++) {
        elements[x].setAttribute('disabled', '');
      }
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.removeEventListener('click', window.form.deactivationPageHandler);
      form.removeEventListener('submit', window.form.submitFormHandler);
      document.removeEventListener('keydown', onSuccessMassegeEscPress);
    },

    submitFormHandler: function (evt) {
      evt.preventDefault();
      window.operateData('POST', 'https://javascript.pages.academy/keksobooking', errorHandler, function () {
        window.form.deactivationPageHandler();
        successHandler();
        form.removeEventListener('submit', window.form.submitFormHandler);
      }, new FormData(form));
    }
  };

  rooms.addEventListener('change', window.form.disabledCapacity);

  capacity.addEventListener('change', window.form.disabledCapacity);

  // Валидация цены от типа комнаты - ТЗ 3.3.
  var MIN_PRICE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  // var setPrice = function () {
  //   var targetValue = MIN_PRICE[typeRoom.value];
  //   // установи то значение атрибута, которое соответствует ключу объекта и = value выбранного элемента
  //   price.setAttribute('min', targetValue);
  //   price.setAttribute('placeholder', targetValue);
  // };

  var typeRoom = form.querySelector('#type');
  typeRoom.addEventListener('change', window.form.setPrice);

  // Валидация времени заезда и времени выезда - ТЗ 3.5.
  var TIME = {
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00'
  };

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

  // Отправка данных на сервер
  var main = document.querySelector('main');
  var mapArray = Array.from(document.querySelector('.map__filters'));
  var formArray = Array.from(document.querySelector('.ad-form').querySelectorAll('fieldset'));
  var elements = mapArray.concat(formArray);

  var messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  var onErrorMassegeEscPress = function (evt) {
    if (evt.key === 'Escape') {
      messageError.remove();
      document.removeEventListener('keydown', onErrorMassegeEscPress);
    }
  };

  var errorHandler = function () {
    main.appendChild(messageError);
    var errorButton = messageError.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      messageError.remove();
    });
    document.addEventListener('keydown', onErrorMassegeEscPress);

    messageError.addEventListener('click', function (evt) {
      if (!errorButton.contains(evt.target)) {
        messageError.remove();
      }
    });
  };

  var messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  var onSuccessMassegeEscPress = function (evt) {
    if (evt.key === 'Escape') {
      messageSuccess.remove();
    }
  };

  var successHandler = function () {
    main.appendChild(messageSuccess);
    setAddress();
    document.addEventListener('keydown', onSuccessMassegeEscPress);
    messageSuccess.addEventListener('click', function () {
      messageSuccess.remove();
    });
  };

  // Деактивация страницы
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  var removeCards = function () {
    var cards = document.querySelectorAll('.map-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }
  };

  var resetAddress = function () {
    var pinMain = document.querySelector('.map__pin--main');
    pinMain.style.left = '570px';
    pinMain.style.top = '375px';
    setAddress();
  };

  // var form = document.querySelector('.ad-form');
  // var errorReset = form.querySelector('.ad-form__reset');
  // errorReset.addEventListener('click', window.form.deactivationPageHandler);
  // form.addEventListener('submit', window.form.submitFormHandler);

  // form.addEventListener('submit', function (evt) {
  //   evt.preventDefault();
  //   window.operateData('POST', 'https://javascript.pages.academy/keksobooking', errorHandler, function () {
  //     deactivationPage();
  //     successHandler();
  //   }, new FormData(form));
  // });

})();
