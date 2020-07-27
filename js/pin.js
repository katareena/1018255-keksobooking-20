'use strict';
(function () {
  var PIN_HALF_WIDTH = 32;
  var PIN_HEIGHT = 84;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Создание и отрисовка пинов. Навешивание обработчиков закрытия и открытия карточки
  var createPin = function (parametrs) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = parametrs.location.x - PIN_HALF_WIDTH + 'px';
    pinElement.style.top = parametrs.location.y - PIN_HEIGHT + 'px';
    pinElement.children[0].src = parametrs.author.avatar;
    pinElement.children[0].alt = parametrs.offer.title;
    pinElement.addEventListener('click', window.card.openCardHandler);
    pinElement.addEventListener('click', window.card.closeCardHandler);
    document.addEventListener('keydown', window.card.cardEscPressHandler);
    pinElement.addEventListener('keydown', window.card.cardEnterPressHandler);
    return pinElement;
  };

  var renderPins = function (ads) {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      var pin = window.pin.createPin(ads[i]);
      fragmentPins.appendChild(pin);
    }
    var map = document.querySelector('.map');
    map.appendChild(fragmentPins);
  };

  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');
    for (var i = 0; i < pins.length; i++) {
      if (!pins[i].classList.contains('map__pin--main')) {
        pins[i].remove();
      }
    }
  };

  window.pin = {
    createPin: createPin,
    renderPins: renderPins,
    removePins: removePins
  };

})();
