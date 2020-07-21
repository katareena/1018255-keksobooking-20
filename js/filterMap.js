'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  // ---------------- 1 вариант --------------------------------------------------------------
  // var createFilterTypeRoom = function (value) {
  //   var dataObject = window.operateData.getData();
  //   if (value === 'any') {
  //     return dataObject;
  //   }
  //   var dataObjectType = dataObject.filter(function (el) {
  //     return el.offer.type === value;
  //   });
  //   // console.log(dataObjectType);
  //   return dataObjectType;
  // };

  // ---------------- 2 вариант --------------------------------------------------------------
  // var createFilterTypeRoom = function (value) {
  //   var dataObject = window.operateData.getData();
  //   var arr = [];
  //   for (var i = 0; i < dataObject.length; i++) {
  //     if (dataObject[i].offer.type === value || value === 'any') {
  //       arr.push(dataObject[i]);
  //       if (arr.length > 4) {
  //         return arr;
  //       }
  //     }
  //   }
  //   return arr;
  // };

  //   var setFilterTypeRoom = function (evt) {
  //   window.pin.removePins();
  //   window.card.removeCards();
  //   var data = createFilterTypeRoom(evt.target.value);
  //   window.pin.renderPins(data);
  //   window.card.renderCards(data);
  // };

  // filterTypeRoom.addEventListener('change', setFilterTypeRoom);

  // ---------------- 3 вариант --------------------------------------------------------------
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

  var setF = function () {
    var data = window.operateData.getData();
    var r1 = data.filter(function (value) {
      return value.offer.type === valueType || valueType === 'any';
    });
    var r2 = r1.filter(function (value) {
      if (valuePrice === 'middle') {
        return value.offer.price >= 10000 && value.offer.price <= 50000;
      } else if (valuePrice === 'low') {
        return value.offer.price < 10000;
      } else if (valuePrice === 'high') {
        return value.offer.price > 50000;
      }
      return true;
    });
    var r3 = r2.filter(function (value) {
      return value.offer.rooms === parseInt(valueRoom, 10) || valueRoom === 'any';
    });
    var r4 = r3.filter(function (value) {
      return value.offer.guests === parseInt(valueGuest, 10) || valueGuest === 'any';
    });
    var r5 = r4.filter(function (value) {
      if (valueWifi) {
        return value.offer.features.includes('wifi');
      }
      return true;
    });
    var r6 = r5.filter(function (value) {
      if (valueDishwasher) {
        return value.offer.features.includes('dishwasher');
      }
      return true;
    });
    var r7 = r6.filter(function (value) {
      if (valueParking) {
        return value.offer.features.includes('parking');
      }
      return true;
    });
    var r8 = r7.filter(function (value) {
      if (valueWasher) {
        return value.offer.features.includes('washer');
      }
      return true;
    });
    var r9 = r8.filter(function (value) {
      if (valueElevator) {
        return value.offer.features.includes('elevator');
      }
      return true;
    });
    var r10 = r9.filter(function (value) {
      if (valueConditioner) {
        return value.offer.features.includes('conditioner');
      }
      return true;
    });
    return r10.slice(0, 5);
  };

  var setFilterAll = function () {
    window.pin.removePins();
    window.card.removeCards();
    var arr = setF();
    window.pin.renderPins(arr);
    window.card.renderCards(arr);
  };

  var lastTimeout;
  var setDebounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(setFilterAll, DEBOUNCE_INTERVAL);
  };

  mapFilter.addEventListener('change', setDebounce);

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
    setFilterAll: setFilterAll,
    removeFilterAll: removeFilterAll
  };
})();
