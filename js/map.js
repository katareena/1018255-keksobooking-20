'use strict';
(function () {
  var ads = window.createAds();
  var PIN_HALF_WIDTH = 25;
  var PIN_HEIGHT = 70;
  var PIN_MAIN_HALF = 31;
  var PIN_MAIN_HEIGHT = 62 + 22;
  var mainButton = 0;
  var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  // Открыть объявление
  var removeHidden = function (m) {
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

  var removeHiddenHandler = function (evt) {
    removeHidden(evt.target);
  };

  // Создание и отрисовка пинов
  var createPin = function (parametrs) {
    var pinElement = similarPinTemplate.cloneNode(true);
    pinElement.style.left = parametrs.location.x - PIN_HALF_WIDTH + 'px';
    pinElement.style.top = parametrs.location.y - PIN_HEIGHT + 'px';
    pinElement.children[0].src = parametrs.author.avatar;
    pinElement.children[0].alt = parametrs.offer.title;
    pinElement.classList.add('visually-hidden');
    return pinElement;
  };

  var renderPins = function () {
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      var pin = createPin(ads[i]);
      fragmentPins.appendChild(pin);
      pin.addEventListener('click', removeHiddenHandler);
    }
    document.addEventListener('keydown', onCardEscPress);
    var map = document.querySelector('.map');
    map.appendChild(fragmentPins);
  };
  renderPins();

  // ------------------------ 3-2 ---------------------------------------------------------------------------------
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
    return cardElement;
  };

  var renderCards = function () {
    var fragmentCards = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentCards.appendChild(createCard(ads[i]));
    }
    var map = document.querySelector('.map');
    var last = map.querySelector('.map__filters-container');
    map.insertBefore(fragmentCards, last);
  };
  renderCards();

  // Закрыть объявление
  var card = document.querySelectorAll('.map__card');

  var hiddenCard = function () {
    for (var i = 0; i < card.length; i++) {
      card[i].classList.add('visually-hidden');
    }
  };
  hiddenCard();

  var onCardEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      hiddenCard();
    }
  };

  var closeCard = function () {
    for (var i = 0; i < card.length; i++) {
      var buttonClose = card[i].querySelector('.popup__close');
      buttonClose.addEventListener('click', hiddenCard);
    }
  };
  closeCard();

  // ------------------------ 4-1 ---------------------------------------------------------------------------------
  // Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled (тз 1.1.)
  var inputsForm = Array.from(document.querySelector('.ad-form').getElementsByTagName('input'));
  var selectsForm = Array.from(document.querySelector('.ad-form').getElementsByTagName('select'));
  var inputsMap = Array.from(document.querySelector('.map__features').getElementsByTagName('input'));
  var selectsMap = Array.from(document.querySelector('.map__filters').getElementsByTagName('select'));
  var elements = inputsForm.concat(selectsForm, inputsMap, selectsMap);

  var setDisabled = function (elem) {
    for (var a = 0; a < elem.length; a++) {
      elem[a].setAttribute('disabled', '');
    }
  };
  setDisabled(elements);

  // Активация страницы
  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.map__pin--main');
  var pins = document.querySelectorAll('.map__pin');
  var pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
  var pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;


  var showPins = function () {
    for (var i = 0; i < pins.length; i++) {
      pins[i].classList.remove('visually-hidden');
    }
  };

  var activationPage = function () {
    showPins();
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var x = 0; x < elements.length; x++) {
      elements[x].removeAttribute('disabled', '');
    }
    var mapFilters = document.querySelector('.map__filters');
    var mapFiltersElements = Array.from(mapFilters.getElementsByTagName('*'));
    for (var g = 0; g < mapFiltersElements.length; g++) {
      mapFiltersElements[g].removeAttribute('disabled', '');
    }
    pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
    pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HEIGHT;
    address.value = pinMainX + ', ' + pinMainY;
    address.setAttribute('disabled', '');
  };

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === mainButton) {
      activationPage();
      // pinMain.addEventListener('mousedown', moveMouse);
    }
  });

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activationPage();
    }
  });

  // Движение главного пина
  // var moveMouse = function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };

  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
  //     pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };


  // pinMain.addEventListener('mousedown', function (evt) {
  //   evt.preventDefault();

  //   var startCoords = {
  //     x: evt.clientX,
  //     y: evt.clientY
  //   };

  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
  //     pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // });

})();
