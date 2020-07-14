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


  // Валидация: зависимость кол-ва гостей от кол-ва комнат - форма
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

  rooms.addEventListener('change', function () {
    for (var j = 0; j < capacity.options.length; j++) {
      capacity[j].disabled = !DISABLED_ROOMS[rooms.value].includes(capacity.options[j].value);
      checkCapacity(capacity[j]);
    }
  });

  capacity.addEventListener('change', function () {
    for (var j = 0; j < capacity.options.length; j++) {
      checkCapacity(capacity[j]);
    }
  });

  // Валидация цены от типа комнаты - ТЗ 3.3.
  var MIN_PRICE = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000'
  };

  var typeRoom = form.querySelector('#type');
  var price = form.querySelector('#price');

  typeRoom.addEventListener('change', function (evt) {
    var targetValue = MIN_PRICE[evt.target.value];
    // установи то значение атрибута, которое соответствует ключу объекта и = value выбранного элемента
    price.setAttribute('min', targetValue);
    price.setAttribute('placeholder', targetValue);
  });

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

  var errorHandler = function () {
    var messageError = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    main.appendChild(messageError);
    var errorButton = messageError.querySelector('.error__button');
    errorButton.addEventListener('click', function () {
      messageError.remove();
    });
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        messageError.remove();
      }
    });
    window.addEventListener('click', function (evt) {
      if (!errorButton.contains(evt.target)) {
        messageError.remove();
      }
    });
  };

  var successHandler = function () {
    var messageSuccess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    main.appendChild(messageSuccess);
    setAddress();
    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        messageSuccess.remove();
      }
    });
    messageSuccess.addEventListener('click', function () {
      messageSuccess.remove();
    });
  };

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

  var deactivationPage = function () {
    removePins();
    removeCards();
    form.reset();
    resetAddress();
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    for (var x = 0; x < elements.length; x++) {
      elements[x].setAttribute('disabled', '');
    }
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.server('POST', 'https://javascript.pages.academy/keksobooking', errorHandler, function () {
      deactivationPage();
      successHandler();
    }, new FormData(form));

  });

  var clickOnReset = function () {
    var errorReset = form.querySelector('.ad-form__reset');
    errorReset.addEventListener('click', function () {
      deactivationPage();
    });
  };
  clickOnReset();

})();
