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
      title: TITLES [i % TITLES.length],
      address: X + ', ' + Y,
      price: getRandom(200, 1500),
      type: TYPES_OBJECT[i % TYPES_OBJECT.length],
      rooms: getRandom(1, 4),
      guests: getRandom(1, 6),
      checkin: TIMES[i % TIMES.length],
      checkout: TIMES[i % TIMES.length],
      features: getRandomАrray(0, 5, FEATURES),
      description: DISCRIPTIONS[i % DISCRIPTIONS.length],
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

document.querySelector('.map').classList.remove('map--faded');

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
