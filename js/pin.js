'use strict';
(function () {
  var PIN_HALF_WIDTH = 32;
  var PIN_HEIGHT = 84;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // var ads = window.data.createAds();

  // Создание и отрисовка пинов. Навешивание обработчиков закрытия и открытия карточки

  window.pin = {
    createPin: function (parametrs) {
      var pinElement = similarPinTemplate.cloneNode(true);
      pinElement.style.left = parametrs.location.x - PIN_HALF_WIDTH + 'px';
      pinElement.style.top = parametrs.location.y - PIN_HEIGHT + 'px';
      pinElement.children[0].src = parametrs.author.avatar;
      pinElement.children[0].alt = parametrs.offer.title;
      // pinElement.classList.add('visually-hidden');
      return pinElement;
    },

    addHendlers: function (ads) {
      for (var i = 0; i < ads.length; i++) {
        var pin = window.pin.createPin(ads[i]);
        pin.addEventListener('click', window.card.removeHiddenHandler);
        document.addEventListener('click', window.card.closeCard);
      }
      document.addEventListener('keydown', window.card.onCardEscPress);
    }

    // renderPins: function () {
    //   var fragmentPins = document.createDocumentFragment();
    //   for (var i = 0; i < ads.length; i++) {
    //     var pin = window.pin.createPin(ads[i]);
    //     fragmentPins.appendChild(pin);
    //     pin.addEventListener('click', window.card.removeHiddenHandler);
    //     document.addEventListener('click', window.card.closeCard);
    //   }
    //   document.addEventListener('keydown', window.card.onCardEscPress);
    //   var map = document.querySelector('.map');
    //   map.appendChild(fragmentPins);
    // }
  };
  // window.pin.renderPins();

})();
