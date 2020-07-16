'use strict';
(function () {
  var PIN_HALF_WIDTH = 32;
  var PIN_HEIGHT = 84;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Создание и отрисовка пинов. Навешивание обработчиков закрытия и открытия карточки
  window.pin = {
    createPin: function (parametrs) {
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.style.left = parametrs.location.x - PIN_HALF_WIDTH + 'px';
      pinElement.style.top = parametrs.location.y - PIN_HEIGHT + 'px';
      pinElement.children[0].src = parametrs.author.avatar;
      pinElement.children[0].alt = parametrs.offer.title;
      pinElement.addEventListener('click', window.card.removeHiddenHandler);
      pinElement.addEventListener('click', window.card.closeCard);
      pinElement.addEventListener('keydown', window.card.onCardEscPress);
      return pinElement;
    },

    renderPins: function (ads) {
      var fragmentPins = document.createDocumentFragment();
      for (var i = 0; i < ads.length; i++) {
        var pin = window.pin.createPin(ads[i]);
        fragmentPins.appendChild(pin);
      }
      var map = document.querySelector('.map');
      map.appendChild(fragmentPins);
    },

    removePins: function () {
      var pins = document.querySelectorAll('.map__pin');
      for (var i = 0; i < pins.length; i++) {
        if (!pins[i].classList.contains('map__pin--main')) {
          pins[i].remove();
        }
      }
    }
  };

})();
