'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS_OBJECTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TIMES = ['12:00', '13:00', '14:00'];
var TYPES_OBJECT = ['palace', 'flat', 'house', 'bungalo'];
var TITLES = ['Уникальные Бизнес апартаменты в стиле Лофт', 'Большая светлая квартира', 'Просторная студия', 'Двухуровневые апартаменты', 'Квартира в историческом центре'];
var DISCRIPTIONS = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
var ROOMS = [1, 2, 3, 4];
var GUESTS = [1, 2, 3, 4, 5, 6, 7, 8];

function getRandom(lower, upper) {
  var min = Math.ceil(lower);
  var max = Math.floor(upper);
  return Math.floor(Math.random() * (max - min)) + min;
}

var createOneAd = function (i) {
  var X = getRandom(1, 1200);
  var Y = getRandom(130, 630);
  var PRICE = getRandom(200, 1500);
  var template = {
    author: {
      avatar: 'img/avatars/user' + '0' + (i + 1) + '.png',
    },
    offer: {
      title: TITLES [i % TITLES.length],
      address: X + ', ' + Y,
      price: PRICE,
      type: TYPES_OBJECT[i % TYPES_OBJECT.length],
      rooms: ROOMS[i % ROOMS.length],
      guests: GUESTS[i],
      checkin: TIMES[i % TIMES.length],
      checkout: TIMES[i % TIMES.length],
      features: FEATURES[i % FEATURES.length],
      description: DISCRIPTIONS[i % DISCRIPTIONS.length],
      photos: PHOTOS_OBJECTS[i % PHOTOS_OBJECTS.length],
    },
    location: {
      x: X,
      y: Y
    },
  };

  return template;
};

var createAds = function () {
  var card = [];
  for (var i = 0; i < 8; i++) {
    card.push(createOneAd(i));
  }
  return card;
};

var ADS = createAds();

// var similarAdTemplate = document.querySelector('#card')
//   .content
//   .querySelector('.popup');

// var renderAd = function (parametrs) {
//   var adElement = similarAdTemplate.cloneNode(true);
//   adElement.querySelector('.popup__avatar').src = parametrs.author.avatar;

//   return adElement;
// };

// var fragment = document.createDocumentFragment();
// for (var i = 0; i < ADS.length; i++) {
//   fragment.appendChild(renderAd(ADS[i]));
// }
// console.log(fragment);

// ------------------------ 2 -----------------------

document.querySelector('.map').classList.remove('map--faded');

// ------------------------ 3 -----------------------
var similarPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (parametrs) {
  var pinElement = similarPinTemplate.cloneNode(true);
  pinElement.style.left = parametrs.location.x - 25 + 'px';
  pinElement.style.top = parametrs.location.y - 70 + 'px';
  pinElement.children[0].src = parametrs.author.avatar;
  pinElement.children[0].alt = parametrs.offer.title;
  return pinElement;
};

var fragmentPins = document.createDocumentFragment();
for (var i = 0; i < ADS.length; i++) {
  fragmentPins.appendChild(renderPin(ADS[i]));
}

var map = document.querySelector('.map');

map.appendChild(fragmentPins);
