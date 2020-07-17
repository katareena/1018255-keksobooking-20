'use strict';
(function () {
  var mainButton = 0;

  var address = document.querySelector('#address');
  var pinMain = document.querySelector('.map__pin--main');

  var mapFilters = Array.from(document.querySelector('.map__filters'));
  var formFieldset = Array.from(document.querySelector('.ad-form').querySelectorAll('fieldset'));
  var elements = mapFilters.concat(formFieldset);

  var form = document.querySelector('.ad-form');

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
    window.dataFromServer.setData(ads);
    window.pin.renderPins(ads);
    var fragmentCards = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragmentCards.appendChild(window.card.createCard(ads[i]));
    }
    for (var x = 0; x < mapFilters.length; x++) {
      mapFilters[x].removeAttribute('disabled', '');
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

  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      setActivationSetup();
      window.operateData('GET', 'https://javascript.pages.academy/keksobooking/data', errorHandler, successHandler);
      // var form = document.querySelector('.ad-form');
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.addEventListener('click', window.form.deactivationPageHandler);
      form.addEventListener('submit', window.form.submitFormHandler);
    }
  });


  window.page = {
    activationPage: function (evt) {
      if (evt.button === mainButton) {
        setActivationSetup();
        window.operateData('GET', 'https://javascript.pages.academy/keksobooking/data', errorHandler, successHandler);
        // var form = document.querySelector('.ad-form');
        var errorReset = form.querySelector('.ad-form__reset');
        errorReset.addEventListener('click', window.page.deactivationPageHandler);
        form.addEventListener('submit', window.form.submitFormHandler);
      }
    },

    deactivationPageHandler: function () {
      window.pin.removePins();
      window.card.removeCards();
      form.reset();
      window.form.resetAddress();
      document.querySelector('.map').classList.add('map--faded');
      document.querySelector('.ad-form').classList.add('ad-form--disabled');
      for (var x = 0; x < elements.length; x++) {
        elements[x].setAttribute('disabled', '');
      }
      var errorReset = form.querySelector('.ad-form__reset');
      errorReset.removeEventListener('click', window.page.deactivationPageHandler);
      form.removeEventListener('submit', window.form.submitFormHandler);
      document.removeEventListener('keydown', window.form.onSuccessMassegeEscPress);
    },
  };

})();
