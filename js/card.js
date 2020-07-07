'use strict';
(function () {
  // Создание и отрисовка обьявления
  var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var TYPES = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

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
      elem.querySelector('.popup__features').appendChild(li);
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

  // var ads = window.data.createAds();
  // var renderCards = function () {
  //   var fragmentCards = document.createDocumentFragment();
  //   for (var i = 0; i < ads.length; i++) {
  //     fragmentCards.appendChild(createCard(ads[i]));
  //   }
  //   var map = document.querySelector('.map');
  //   var last = map.querySelector('.map__filters-container');
  //   map.insertBefore(fragmentCards, last);
  // };
  // renderCards();

  var successHandler = function (ads) {
    var fragmentCards = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentCards.appendChild(createCard(ads[i]));
    }
    var map = document.querySelector('.map');
    var last = map.querySelector('.map__filters-container');
    map.insertBefore(fragmentCards, last);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  // window.load(function (ads) {
  //   var fragmentCards = document.createDocumentFragment();
  //   for (var i = 0; i < ads.length; i++) {
  //     fragmentCards.appendChild(createCard(ads[i]));
  //   }
  //   var map = document.querySelector('.map');
  //   var last = map.querySelector('.map__filters-container');
  //   map.insertBefore(fragmentCards, last);
  // }, function () {});


  // Открыть объявление
  var removeHidden = function (m) {
    var card = document.querySelectorAll('.map__card');
    for (var i = 0; i < card.length; i++) {
      if (
        m.src === card[i].querySelector('img').src
      ) {
        card[i].classList.remove('visually-hidden');
      } else {
        card[i].classList.add('visually-hidden');
      }
    }
  };

  // Закрыть объявление
  // var card = document.querySelectorAll('.map__card');

  window.card = {

    removeHiddenHandler: function (evt) {
      removeHidden(evt.target);
    },

    hiddenCard: function () {
      var card = document.querySelectorAll('.map__card');
      for (var i = 0; i < card.length; i++) {
        card[i].classList.add('visually-hidden');
      }
    },

    onCardEscPress: function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.card.hiddenCard();
      }
    },

    closeCard: function () {
      var card = document.querySelectorAll('.map__card');
      for (var i = 0; i < card.length; i++) {
        var buttonClose = card[i].querySelector('.popup__close');
        buttonClose.addEventListener('click', window.card.hiddenCard);
      }
    }
  };
  window.card.hiddenCard();

  // var closeCard = function () {
  //   var card = document.querySelectorAll('.map__card');
  //   for (var i = 0; i < card.length; i++) {
  //     var buttonClose = card[i].querySelector('.popup__close');
  //     buttonClose.addEventListener('click', window.card.hiddenCard);
  //   }
  // };
  // closeCard();

})();
