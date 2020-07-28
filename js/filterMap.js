'use strict';
(function () {
  var FIRST_BREAK_PRICE = 10000;
  var SECOND_BREAK_PRICE = 50000;

  var mapFilter = document.querySelector('.map__filters');
  var filterType = mapFilter.querySelector('#housing-type');
  var filterPrice = mapFilter.querySelector('#housing-price');
  var filterRooms = mapFilter.querySelector('#housing-rooms');
  var filterGuests = mapFilter.querySelector('#housing-guests');

  var filterWifi = mapFilter.querySelector('#filter-wifi');
  var filterDishwasher = mapFilter.querySelector('#filter-dishwasher');
  var filterParking = mapFilter.querySelector('#filter-parking');
  var filterWasher = mapFilter.querySelector('#filter-washer');
  var filterElevator = mapFilter.querySelector('#filter-elevator');
  var filterConditioner = mapFilter.querySelector('#filter-conditioner');

  var valueType = 'any';
  var valuePrice = 'any';
  var valueRoom = 'any';
  var valueGuest = 'any';

  var valueWifi = false;
  var valueDishwasher = false;
  var valueParking = false;
  var valueWasher = false;
  var valueElevator = false;
  var valueConditioner = false;

  var setFilterType = function (evt) {
    valueType = evt.target.value;
  };

  var setFilterPrice = function (evt) {
    valuePrice = evt.target.value;
  };

  var setFilterRoom = function (evt) {
    valueRoom = evt.target.value;
  };

  var setFilterGuest = function (evt) {
    valueGuest = evt.target.value;
  };

  var setFilterWifi = function () {
    valueWifi = !valueWifi;
  };

  var setFilterDishwasher = function () {
    valueDishwasher = !valueDishwasher;
  };

  var setFilterParking = function () {
    valueParking = !valueParking;
  };

  var setFilterWasher = function () {
    valueWasher = !valueWasher;
  };

  var setFilterElevator = function () {
    valueElevator = !valueElevator;
  };

  var setFilterConditioner = function () {
    valueConditioner = !valueConditioner;
  };

  filterType.addEventListener('change', setFilterType);
  filterPrice.addEventListener('change', setFilterPrice);
  filterRooms.addEventListener('change', setFilterRoom);
  filterGuests.addEventListener('change', setFilterGuest);

  filterWifi.addEventListener('change', setFilterWifi);
  filterDishwasher.addEventListener('change', setFilterDishwasher);
  filterParking.addEventListener('change', setFilterParking);
  filterWasher.addEventListener('change', setFilterWasher);
  filterElevator.addEventListener('change', setFilterElevator);
  filterConditioner.addEventListener('change', setFilterConditioner);

  var createFilter = function () {
    var data = window.operateData.getData();
    var resultType = data.filter(function (value) {
      return value.offer.type === valueType || valueType === 'any';
    });
    var resultPrice = resultType.filter(function (value) {
      if (valuePrice === 'middle') {
        return value.offer.price >= FIRST_BREAK_PRICE && value.offer.price <= SECOND_BREAK_PRICE;
      } else if (valuePrice === 'low') {
        return value.offer.price < FIRST_BREAK_PRICE;
      } else if (valuePrice === 'high') {
        return value.offer.price > SECOND_BREAK_PRICE;
      }
      return true;
    });
    var resultRooms = resultPrice.filter(function (value) {
      return value.offer.rooms === parseInt(valueRoom, 10) || valueRoom === 'any';
    });
    var resultGuests = resultRooms.filter(function (value) {
      return value.offer.guests === parseInt(valueGuest, 10) || valueGuest === 'any';
    });
    var resultWifi = resultGuests.filter(function (value) {
      if (valueWifi) {
        return value.offer.features.includes('wifi');
      }
      return true;
    });
    var resultDishwasher = resultWifi.filter(function (value) {
      if (valueDishwasher) {
        return value.offer.features.includes('dishwasher');
      }
      return true;
    });
    var resultParking = resultDishwasher.filter(function (value) {
      if (valueParking) {
        return value.offer.features.includes('parking');
      }
      return true;
    });
    var resultWasher = resultParking.filter(function (value) {
      if (valueWasher) {
        return value.offer.features.includes('washer');
      }
      return true;
    });
    var resultElevator = resultWasher.filter(function (value) {
      if (valueElevator) {
        return value.offer.features.includes('elevator');
      }
      return true;
    });
    var resultConditioner = resultElevator.filter(function (value) {
      if (valueConditioner) {
        return value.offer.features.includes('conditioner');
      }
      return true;
    });
    return resultConditioner.slice(0, 5);
  };

  var setFilterAll = function () {
    window.pin.removePins();
    window.card.removeCards();
    var arr = createFilter();
    window.pin.renderPins(arr);
    window.card.renderCards(arr);
  };

  var removeFilterAll = function () {
    valueType = 'any';
    valuePrice = 'any';
    valueRoom = 'any';
    valueGuest = 'any';
    valueWifi = false;
    valueDishwasher = false;
    valueParking = false;
    valueWasher = false;
    valueElevator = false;
    valueConditioner = false;
    mapFilter.reset();
  };

  window.filterMap = {
    removeFilterAll: removeFilterAll,
    setFilterAll: setFilterAll
  };

})();
