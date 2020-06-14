'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_OBJECTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TYPES_OBJECT = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = ['Уникальные Бизнес апартаменты в стиле Лофт', 'Большая светлая квартира', 'Просторная студия', 'Двухуровневые апартаменты', 'Квартира в историческом центре'];
var DISCRIPTIONS = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var TIMES = ['12:00', '13:00', '14:00'];
var PIN_HALF_WIDTH = 25;
var PIN_HEIGHT = 70;
var NUMBER_OF_ADS = 8;
var PIN_MAIN_RADIUS = 33;
var PIN_MAIN_HEIGHT = 65 + 22;

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
      price: getRandom(200, 1500),
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

// ------------------------ 2 -----------------------

// document.querySelector('.map').classList.remove('map--faded');

// ------------------------ 3 -----------------------
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (parametrs) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = parametrs.location.x - PIN_HALF_WIDTH + 'px';
  pinElement.style.top = parametrs.location.y - PIN_HEIGHT + 'px';
  pinElement.children[0].src = parametrs.author.avatar;
  pinElement.children[0].alt = parametrs.offer.title;
  return pinElement;
};

var fragmentPins = document.createDocumentFragment();
for (var i = 0; i < ads.length; i++) {
  fragmentPins.appendChild(renderPin(ads[i]));
}

var map = document.querySelector('.map');

map.appendChild(fragmentPins);

// ------------------------ module4-task2 -----------------------------------------------------------------------
// Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled (тз 1.1.)
var form = document.querySelector('.ad-form');
var inputs = Array.from(form.getElementsByTagName('input'));
var selects = Array.from(form.getElementsByTagName('select'));
var elements = inputs.concat(selects);
for (var i = 0; i < elements.length; i++) {
  elements[i].setAttribute('disabled', true);
}

// Заполнение поля адреса
var address = document.querySelector('#address');
var pinX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_RADIUS;
var pinY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_RADIUS;

address.value = pinX + ', ' + pinY;

// Активация страницы
var pin = document.querySelector('.map__pin--main');

var activationPage = function () {
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled', true);
  }

  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersElements = Array.from(mapFilters.getElementsByTagName('*'));
  for (var i = 0; i < mapFiltersElements.length; i++) {
    mapFiltersElements[i].removeAttribute('disabled', true);
  }

  pinX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_RADIUS;
  pinY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HEIGHT;

  address.value = pinX + ', ' + pinY;
};

pin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    activationPage();
  }
});

pin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    activationPage();
  }
});

// Непростая валидация: зависимость кол-ва гостей от кол-ва комнат
var rooms = document.querySelector('#room_number').getElementsByTagName('option');
var guests = document.querySelector('#capacity').getElementsByTagName('option');

document.querySelector('#room_number').addEventListener('click', function () {
  if (rooms[0].selected) {
    guests[0].setAttribute('disabled', true);
    guests[1].setAttribute('disabled', true);
    guests[2].removeAttribute('disabled', true);
    guests[3].setAttribute('disabled', true);
  }

  if (rooms[1].selected) {
    guests[0].setAttribute('disabled', true);
    guests[1].removeAttribute('disabled', true);
    guests[2].removeAttribute('disabled', true);
    guests[3].setAttribute('disabled', true);
  }

  if (rooms[2].selected) {
    guests[0].removeAttribute('disabled', true);
    guests[1].removeAttribute('disabled', true);
    guests[2].removeAttribute('disabled', true);
    guests[3].setAttribute('disabled', true);
  }

  if (rooms[3].selected) {
    guests[0].setAttribute('disabled', true);
    guests[1].setAttribute('disabled', true);
    guests[2].setAttribute('disabled', true);
    guests[3].removeAttribute('disabled', true);
  }
});
