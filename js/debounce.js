'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 500;
  var mapFilter = document.querySelector('.map__filters');
  var lastTimeout;

  var setDebounce = function () {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(window.filterMap.setFilterAll, DEBOUNCE_INTERVAL);
  };

  mapFilter.addEventListener('change', setDebounce);
})();
