'use strict';
(function () {
  var MAIN_BUTTON = 0;
  var GET_ADRESS = 'https://javascript.pages.academy/keksobooking/data';

  var mapFilters = Array.from(document.querySelector('.map__filters'));
  var formFieldset = Array.from(document.querySelector('.ad-form').querySelectorAll('fieldset'));
  var elements = mapFilters.concat(formFieldset);

  var form = document.querySelector('.ad-form');

  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.map__pin--main');

  // Начальное состояние страницы
  var setDisabled = function (elem) {
    for (var a = 0; a < elem.length; a++) {
      elem[a].setAttribute('disabled', '');
    }
  };
  setDisabled(elements);

  // Активация страницы
  var setActivationSetup = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    for (var x = 0; x < formFieldset.length; x++) {
      formFieldset[x].removeAttribute('disabled', '');
    }
    window.form.setAddressPin();
    address.setAttribute('readonly', '');
    window.form.disabledCapacity();
    window.form.setPrice();
  };

  var successHandler = function (ads) {
    window.operateData.setData(ads);
    window.filterMap.setFilterAll();
    for (var x = 0; x < mapFilters.length; x++) {
      mapFilters[x].removeAttribute('disabled', '');
    }
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

  // настройки деактивации страницы
  var deactivationPageHandler = function () {
    window.pin.removePins();
    window.card.removeCards();
    form.reset();
    window.filterMap.removeFilterAll();
    window.form.resetAddress();
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    for (var x = 0; x < elements.length; x++) {
      elements[x].setAttribute('disabled', '');
    }
    var errorReset = form.querySelector('.ad-form__reset');
    errorReset.removeEventListener('click', window.page.deactivationPageHandler);
    form.removeEventListener('submit', window.form.submitFormHandler);
    document.removeEventListener('keydown', window.form.successMassegeEscPressHandler);
    document.removeEventListener('keydown', window.card.cardEscPressHandler);
  };

  var activationPage = function (evt) {
    if (evt.button === MAIN_BUTTON) {
      setActivationSetup();
      window.operateData.operateData('GET', GET_ADRESS, errorHandler, successHandler);
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.addEventListener('click', window.page.deactivationPageHandler);
      form.addEventListener('submit', window.form.submitFormHandler);
    }
  };

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActivationSetup();
      window.operateData.operateData('GET', GET_ADRESS, errorHandler, successHandler);
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.addEventListener('click', window.page.deactivationPageHandler);
      form.addEventListener('submit', window.form.submitFormHandler);
    }
  });

  // Движение главного пина + активация
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

      var mouseMoveHandler = function (moveEvt) {
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

        window.form.setAddressPin();
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();
        pinMain.removeEventListener('mousedown', activationPage);
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  window.page = {
    deactivationPageHandler: deactivationPageHandler
  };

})();
