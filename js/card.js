'use strict';
(function () {
  // Создание и отрисовка обьявления
  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var addValue = function (elem, value) {
    elem.textContent = value;
  };

  var addTextCapacity = function (elem, parametrs) {
    if (parametrs.offer.rooms === 1) {
      var textCapacityRooms = parametrs.offer.rooms + ' комната для ';
    } else {
      textCapacityRooms = parametrs.offer.rooms + ' комнаты для ';
    }
    if (parametrs.offer.guests === 1) {
      var textCapacityGuests = parametrs.offer.guests + ' гостя.';
    } else {
      textCapacityGuests = parametrs.offer.guests + ' гостей.';
    }
    elem.querySelector('.popup__text--capacity').textContent = textCapacityRooms + textCapacityGuests;
  };

  var addFeatures = function (elem, parametrs) {
    var parent = elem.querySelector('.popup__features');
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
    for (var i = 0; i < parametrs.offer.features.length; i++) {
      var li = document.createElement('li');
      li.setAttribute('class', 'popup__feature popup__feature--' + parametrs.offer.features[i]);
      parent.appendChild(li);
    }
  };

  var addPhotos = function (elem, parametrs) {
    var parent = elem.querySelector('.popup__photos');
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
    for (var i = 0; i < parametrs.offer.photos.length; i++) {
      var img = document.createElement('img');
      img.setAttribute('class', 'popup__photo');
      img.setAttribute('width', '45');
      img.setAttribute('height', '40');
      img.setAttribute('src', parametrs.offer.photos[i]);
      elem.querySelector('.popup__photos').appendChild(img);
    }
  };

  var createCard = function (parametrs) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__avatar').src = parametrs.author.avatar;
    addValue(cardElement.querySelector('.popup__title'), parametrs.offer.title);
    addValue(cardElement.querySelector('.popup__text--address'), parametrs.offer.address);
    addValue(cardElement.querySelector('.popup__text--price'), parametrs.offer.price + '₽/ночь');
    addValue(cardElement.querySelector('.popup__type'), TYPES[parametrs.offer.type]);
    addTextCapacity(cardElement, parametrs);
    addValue(cardElement.querySelector('.popup__text--time'), 'Заезд после ' + parametrs.offer.checkin + ', выезд до ' + parametrs.offer.checkout);
    addFeatures(cardElement, parametrs);
    addValue(cardElement.querySelector('.popup__description'), parametrs.offer.description);
    addPhotos(cardElement, parametrs);
    cardElement.classList.add('visually-hidden');
    return cardElement;
  };

  var renderCards = function (data) {
    var fragmentCards = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragmentCards.appendChild(window.card.createCard(data[i]));
    }
    var map = document.querySelector('.map');
    var last = map.querySelector('.map__filters-container');
    map.insertBefore(fragmentCards, last);
  };

  var openCardHandler = function (evt) {
    var cards = document.querySelectorAll('.map__card');
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
    for (var i = 0; i < cards.length; i++) {
      if (evt.target.src === cards[i].querySelector('img').src) {
        cards[i].classList.remove('visually-hidden');
        evt.target.parentElement.classList.add('map__pin--active');
      } else {
        cards[i].classList.add('visually-hidden');
      }
    }
  };

  var cardEnterPressHandler = function (evt) {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      var cards = document.querySelectorAll('.map__card');
      var activePin = document.querySelector('.map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }
      for (var i = 0; i < cards.length; i++) {
        if (evt.target.lastChild.src === cards[i].querySelector('img').src) {
          cards[i].classList.remove('visually-hidden');
          evt.target.classList.add('map__pin--active');
        } else {
          cards[i].classList.add('visually-hidden');
        }
      }
    }
  };

  var hideCardHandler = function () {
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add('visually-hidden');
    }
    var activePin = document.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  };

  var cardEscPressHandler = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      window.card.hideCardHandler();
    }
  };

  var closeCardHandler = function () {
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      var buttonClose = cards[i].querySelector('.popup__close');
      buttonClose.addEventListener('click', window.card.hideCardHandler);
    }
  };

  var removeCards = function () {
    var cards = document.querySelectorAll('.map__card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].remove();
    }
  };

  document.addEventListener('keydown', window.card.cardEscPressHandler);

  window.card = {
    cardEscPressHandler: cardEscPressHandler,
    cardEnterPressHandler: cardEnterPressHandler,
    closeCardHandler: closeCardHandler,
    createCard: createCard,
    hideCardHandler: hideCardHandler,
    openCardHandler: openCardHandler,
    removeCards: removeCards,
    renderCards: renderCards
  };

})();
