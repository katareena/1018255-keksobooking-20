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
    setAdress();
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

  var pin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var PIN_HALF_WIDTH = 32;

  var limits = {
    top: map.offsetTop + 130,
    right: 1200 + PIN_HALF_WIDTH - pin.offsetWidth,
    bottom: 630,
    left: 0 + PIN_HALF_WIDTH - pin.offsetWidth
  };

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
