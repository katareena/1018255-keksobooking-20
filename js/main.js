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
      photos: getRandomАrray(0, 5, PHOTOS_OBJECTS),
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

var onCardEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    setHidden();
  }
};

var renderPin = function (parametrs) {
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
    var pin = renderPin(ads[i]);
    fragmentPins.appendChild(pin);
    pin.addEventListener('click', removeHiddenHandler);
  }
  document.addEventListener('keydown', onCardEscPress);
  var map = document.querySelector('.map');
  map.appendChild(fragmentPins);
};

// renderPins c renderCard внутри:
// var renderPins = function () {

//   var fragmentPins = document.createDocumentFragment();
//   for (var i = 0; i < ads.length; i++) {

//     let data = ads[i];
//     var pin = renderPin(data);
//     pin.addEventListener('click', function () {
//       renderCard(data);
//     });

//     fragmentPins.appendChild(pin);
//   }

//   var map = document.querySelector('.map');
//   map.appendChild(fragmentPins);
// };

renderPins();

// ------------------------ 3-2 ---------------------------------------------------------------------------------
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

// var renderCard = function (w) {
//   var fragmentCard = document.createDocumentFragment();
//   fragmentCard.appendChild(createCard(w));
//   var map = document.querySelector('.map');
//   var last = map.querySelector('.map__filters-container');
//   map.insertBefore(fragmentCard, last);
// };
// renderCard(ads[0]);
// вызов функции renderCard в renderPins


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
var pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
var pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;

address.value = pinMainX + ', ' + pinMainY;

// Активация страницы
var pinMain = document.querySelector('.map__pin--main');
var pins = document.querySelectorAll('.map__pin');

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
  // валидация сторки с адресом
  address.setAttribute('disabled', '');
};

pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === mainButton) {
    activationPage();
  }
});

pinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER) {
    activationPage();
  }
});

// Валидация: зависимость кол-ва гостей от кол-ва комнат
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
// Карточки объявлений
var card = document.querySelectorAll('.map__card');

var setHidden = function () {
  for (var i = 0; i < card.length; i++) {
    card[i].classList.add('visually-hidden');
  }
};
setHidden();

// перенесено в renderPins
// var removeHidden = function (m) {
//   for (var i = 0; i < card.length; i++) {
//     if (
//       m.src === card[i].querySelector('img').src
//     ) {
//       card[i].classList.remove('visually-hidden');
//     } else {
//       card[i].classList.add('visually-hidden');
//     }
//   }
// };

// var removeHiddenHandler = function (evt) {
//   removeHidden(evt.target);
// };

// var onCardEscPress = function (evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     setHidden();
//   }
// };

// var openCard = function () {
//   for (var i = 0; i < pin.length; i++) {
//     pin[i].addEventListener('click', removeHiddenHandler);
//   }

//   document.addEventListener('keydown', onCardEscPress);
// };
// openCard();

var closeCard = function () {
  for (var i = 0; i < card.length; i++) {
    var buttonClose = card[i].querySelector('.popup__close');
    buttonClose.addEventListener('click', setHidden);
  }
};
closeCard();

// Валидация цены от типа комнаты - ТЗ 3.3.
var MIN_PRICE = {
  'bungalo': '0',
  'flat': '1000',
  'house': '5000',
  'palace': '10000'
};

var typeRoom = form.querySelector('#type');
var price = form.querySelector('#price');

typeRoom.addEventListener('change', function (evt) {
  var targetValue = MIN_PRICE[evt.target.value];
  // установи то значение атрибута, которое соответствует ключу объекта и = value выбранного элемента
  price.setAttribute('min', targetValue);
  price.setAttribute('placeholder', targetValue);
});

// Валидация времени заезда и времени выезда - ТЗ 3.5.
var TIME = {
  '12:00': '12:00',
  '13:00': '13:00',
  '14:00': '14:00'
};

var timein = form.querySelector('#timein');
var timeout = form.querySelector('#timeout');

timein.addEventListener('change', function (evt) {
  for (var j = 0; j < timeout.options.length; j++) {
    timeout[j].selected = TIME[evt.target.value].includes(timeout.options[j].value);
  }
});

timeout.addEventListener('change', function (evt) {
  for (var j = 0; j < timein.options.length; j++) {
    timein[j].selected = TIME[evt.target.value].includes(timein.options[j].value);
  }
});
