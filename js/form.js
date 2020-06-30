'use strict';
(function () {
  var PIN_MAIN_HALF = 31;

  // Заполнение поля адреса
  var address = document.querySelector('#address');
  var pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
  var pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;

  address.value = pinMainX + ', ' + pinMainY;

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
})();
