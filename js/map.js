'use strict';
(function () {
  var PIN_MAIN_HALF = 31;
  var PIN_MAIN_HEIGHT = 62 + 22;
  var mainButton = 0;

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

  var setAdress = function () {
    pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
    pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HEIGHT;
    address.value = pinMainX + ', ' + pinMainY;
  };

  var setActivationSetup = function () {
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
    setAdress();
    address.setAttribute('disabled', '');
  };

  // pinMain.addEventListener('mousedown', function (evt) {
  //   if (evt.button === mainButton) {
  //     setActivationSetup();
  //     // pinMain.addEventListener('mousedown', moveMouse);
  //   }
  // });


  var successHandler = function (ads) {
    var fragmentCards = document.createDocumentFragment();
    var fragmentPins = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentCards.appendChild(window.card.createCard(ads[i]));
      fragmentPins.appendChild(window.pin.createPin(ads[i]));
    }
    var map = document.querySelector('.map');
    var last = map.querySelector('.map__filters-container');
    map.insertBefore(fragmentCards, last);
    map.appendChild(fragmentPins);
  };

  // var successHandler = function (ads) {
  //   var fragmentCards = document.createDocumentFragment();
  //   for (var i = 0; i < ads.length; i++) {
  //     fragmentCards.appendChild(window.card.createCard(ads[i]));
  //   }
  //   var map = document.querySelector('.map');
  //   var last = map.querySelector('.map__filters-container');
  //   map.insertBefore(fragmentCards, last);
  // };

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

  var activationPage = function (evt) {
    if (evt.button === mainButton) {
      setActivationSetup();
      window.load(successHandler, errorHandler);
      window.pin.addHendlers();
    }
  };

  // pinMain.addEventListener('mousedown', function () {
  //   if (map.classList.contains('map--faded')) {
  //     console.log(1);

  //     pinMain.addEventListener('mousedown', activationPage);
  //   } else {
  //     console.log(2);

  //     pinMain.removeEventListener('mousedown', activationPage);
  //     console.log(3);
  //     pinMain.addEventListener('mousedown', moveMouse);
  //   }
  // });


  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActivationSetup();
    }
  });

  // Движение главного пина
  var pin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var PIN_HALF_WIDTH = 32;
  var PIN_HEIGHT = 84;
  var mapTop = 130;
  var mapLeft = 0;
  var mapRight = 1200;
  var mapBottom = 630;

  var limits = {
    top: map.offsetTop + mapTop - PIN_HEIGHT,
    right: mapRight + PIN_HALF_WIDTH - pin.offsetWidth,
    bottom: mapBottom - PIN_HEIGHT,
    left: mapLeft + PIN_HALF_WIDTH - pin.offsetWidth
  };


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

  //     var coordinates = {
  //       x: pinMain.offsetLeft - shift.x,
  //       y: pinMain.offsetTop - shift.y
  //     };

  //     if (coordinates.x < limits.left) {
  //       coordinates.x = limits.left;
  //     } else if (coordinates.x > limits.right) {
  //       coordinates.x = limits.right;
  //     }

  //     if (coordinates.y < limits.top) {
  //       coordinates.y = limits.top;
  //     } else if (coordinates.y > limits.bottom) {
  //       coordinates.y = limits.bottom;
  //     }

  //     pinMain.style.top = coordinates.y + 'px';
  //     pinMain.style.left = coordinates.x + 'px';

  //     setAdress();
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();
  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (map.classList.contains('map--faded')) { // активация страницы
      activationPage(evt);
    } else { // движение главного пина после активации

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        // координаты после смещения мыши
        var coordinates = {
          x: pinMain.offsetLeft - shift.x,
          y: pinMain.offsetTop - shift.y
        };

        if (coordinates.x < limits.left) {
          coordinates.x = limits.left;
        } else if (coordinates.x > limits.right) {
          coordinates.x = limits.right;
        }

        if (coordinates.y < limits.top) {
          coordinates.y = limits.top;
        } else if (coordinates.y > limits.bottom) {
          coordinates.y = limits.bottom;
        }

        pinMain.style.top = coordinates.y + 'px';
        pinMain.style.left = coordinates.x + 'px';

        setAdress();
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        pinMain.removeEventListener('mousedown', activationPage);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
