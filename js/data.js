'use strict';
// ------------------------ 3-1 ---------------------------------------------------------------------------------
(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS_OBJECTS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TYPES_OBJECT = ['palace', 'flat', 'house', 'bungalo'];
  var TITLES = ['Уникальные Бизнес апартаменты в стиле Лофт', 'Большая светлая квартира', 'Просторная студия', 'Двухуровневые апартаменты', 'Квартира в историческом центре'];
  var DISCRIPTIONS = ['description1', 'description2', 'description3', 'description4', 'description5', 'description6', 'description7', 'description8'];
  var TIMES = ['12:00', '13:00', '14:00'];
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
        photos: getRandomАrray(0, 5, PHOTOS_OBJECTS),
      },
      location: {
        x: X,
        y: Y
      },
    };

    return template;
  };

  window.createAds = function () {
    var cards = [];
    for (var i = 0; i < NUMBER_OF_ADS; i++) {
      cards.push(createOneAd(i));
    }
    return cards;
  };
})();
