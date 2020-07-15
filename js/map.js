'use strict';
(function () {
  var PIN_MAIN_HALF = 31;
  var PIN_MAIN_HEIGHT = 62 + 22;
  var mainButton = 0;

  // ------------------------ 4-1 ---------------------------------------------------------------------------------
  var mapArray = Array.from(document.querySelector('.map__filters'));
  var formArray = Array.from(document.querySelector('.ad-form').querySelectorAll('fieldset'));
  var elements = mapArray.concat(formArray);


  window.map = {
    setDisabled: function (elem) {
      for (var a = 0; a < elem.length; a++) {
        elem[a].setAttribute('disabled', '');
      }
    }
  };
  window.map.setDisabled(elements);

  // Активация страницы
  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
  var pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HALF;

  var setAddressPin = function () {
    pinMainX = parseInt(document.querySelector('.map__pin--main').style.left, 10) + PIN_MAIN_HALF;
    pinMainY = parseInt(document.querySelector('.map__pin--main').style.top, 10) + PIN_MAIN_HEIGHT;
    address.value = pinMainX + ', ' + pinMainY;
  };

  var setActivationSetup = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var x = 0; x < elements.length; x++) {
      elements[x].removeAttribute('disabled', '');
    }
    setAddressPin();
    address.setAttribute('readonly', '');
    window.form.disabledCapacity();
    window.form.setPrice();
  };

  var successHandler = function (ads) {
    window.pin.renderPins(ads);
    var fragmentCards = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentCards.appendChild(window.card.createCard(ads[i]));
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

  var activationPage = function (evt) {
    if (evt.button === mainButton) {
      setActivationSetup();
      window.operateData('GET', 'https://javascript.pages.academy/keksobooking/data', errorHandler, successHandler);
      var form = document.querySelector('.ad-form');
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.addEventListener('click', window.form.deactivationPageHandler);
      form.addEventListener('submit', window.form.submitFormHandler);
    }
  };

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActivationSetup();
      window.operateData('GET', 'https://javascript.pages.academy/keksobooking/data', errorHandler, successHandler);
      var form = document.querySelector('.ad-form');
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.addEventListener('click', window.form.deactivationPageHandler);
      form.addEventListener('submit', window.form.submitFormHandler);
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

        setAddressPin();
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
