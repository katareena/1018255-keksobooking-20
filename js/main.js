'use strict';
// ------------------------ 3-1 ---------------------------------------------------------------------------------
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_OBJECTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES_OBJECT = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = ['Уникальные Бизнес апартаменты в стиле Лофт', 'Большая светлая квартира', 'Просторная студия', 'Двухуровневые апартаменты', 'Квартира в историческом центре'];
var DISCRIPTIONS = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var TIMES = ['12:00', '13:00', '14:00'];
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var NUMBER_OF_ADS = 8;
var PIN_MAIN_HALF = 31;
var PIN_MAIN_HEIGHT = 62 + 22;
var ENTER = 13;
var mainButton = 0;

var getRandom = function (lower, upper) {
  var min = Math.ceil(lower);
  var max = Math.floor(upper);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomАrray = function (ceil, floor, name) {
  var length = getRandom(ceil, floor);
  var arrayNew = name.slice();

  while (arrayNew.length > length) {
    arrayNew.splice(getRandom(ceil, arrayNew.length), 1);
  }

  return arrayNew;
};

var createOneAd = function (i) {
  var X = getRandom(1, 1200);
  var Y = getRandom(130, 630);

  var template = {
    author: {
      avatar: 'img/avatars/user' + '0' + (i + 1) + '.png',
    },
    offer: {
      title: TITLES[Math.floor(Math.random() * TITLES.length)],
      address: X + ', ' + Y,
      price: getRandom(1500, 5000),
      type: TYPES_OBJECT[Math.floor(Math.random() * TYPES_OBJECT.length)],
      rooms: getRandom(1, 4),
      guests: getRandom(1, 6),
      checkin: TIMES[Math.floor(Math.random() * TIMES.length)],
      checkout: TIMES[Math.floor(Math.random() * TIMES.length)],
      features: getRandomАrray(0, 5, FEATURES),
      description: DISCRIPTIONS[Math.floor(Math.random() * DISCRIPTIONS.length)],
      photos: getRandomАrray(0, 2, PHOTOS_OBJECTS),
    },
    location: {
      x: X,
      y: Y
    },
  };

  return template;
};

var createAds = function () {
  var cards = [];
  for (var i = 0; i < NUMBER_OF_ADS; i++) {
    cards.push(createOneAd(i));
  }
  return cards;
};

var ads = createAds();

// -----------------------------------------------

// document.querySelector('.map').classList.remove('map--faded');

// -----------------------------------------------
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (parametrs) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = parametrs.location.x - PIN_HALF_WIDTH + 'px';
  pinElement.style.top = parametrs.location.y - PIN_HEIGHT + 'px';
  pinElement.children[0].src = parametrs.author.avatar;
  pinElement.children[0].alt = parametrs.offer.title;
  return pinElement;
};


var renderPins = function () {
  var fragmentPins = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragmentPins.appendChild(renderPin(ads[i]));
  }
  var map = document.querySelector('.map');
  map.appendChild(fragmentPins);
};

renderPins();

// ------------------------ 3-2 ---------------------------------------------------------------------------------
var similarCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var TYPS = {
  'flat': 'Квартира',
  'bungalo': 'Бунгало',
  'house': 'Дом',
  'palace': 'Дворец'
};

var createCard = function (parametrs) {
  var cardElement = similarCardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = parametrs.author.avatar;
  cardElement.querySelector('.popup__title').textContent = parametrs.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = parametrs.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = parametrs.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = TYPS[parametrs.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = parametrs.offer.rooms + ' комнаты для ' + parametrs.offer.guests + ' гостей.';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + parametrs.offer.checkin + ', выезд до ' + parametrs.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = parametrs.offer.features;
  cardElement.querySelector('.popup__description').textContent = parametrs.offer.description;
  if (parametrs.offer.photos.length > 0) {
    cardElement.querySelector('.popup__photo').src = parametrs.offer.photos[0];
  } else {
    cardElement.querySelector('.popup__photos').setAttribute('style', 'display: none;');
  }

  return cardElement;
};

var renderCard = function () {
  var fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(createCard(ads[0]));
  var map = document.querySelector('.map');
  var last = map.querySelector('.map__filters-container');
  map.insertBefore(fragmentCard, last);
};

renderCard();

// ------------------------ 4-1 ---------------------------------------------------------------------------------
// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled (тз 1.1.)

var form = document.querySelector('.ad-form');

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

// Заполнение поля адреса
var address = document.querySelector('#address');
var pinX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
var pinY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;

address.value = pinX + ', ' + pinY;

// Активация страницы
var pin = document.querySelector('.map__pin--main');

var activationPage = function () {
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

  pinX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
  pinY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HEIGHT;

  address.value = pinX + ', ' + pinY;
};

pin.addEventListener('mousedown', function (evt) {
  if (evt.button === mainButton) {
    activationPage();
  }
});

pin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    activationPage();
  }
});

// Непростая валидация: зависимость кол-ва гостей от кол-ва комнат

var DISABLED_ROOMS = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};
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

// ------------------------ 4-2 ---------------------------------------------------------------------------------
