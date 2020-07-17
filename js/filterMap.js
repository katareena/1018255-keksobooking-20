'use strict';
(function () {
  var filterTypeRoom = document.querySelector('#housing-type');

  // var createFilterTypeRoom = function (value) {
  //   var dataObject = window.dataFromServer.getData();
  //   if (value === 'any') {
  //     return dataObject;
  //   }
  //   var dataObjectType = dataObject.filter(function (el) {
  //     return el.offer.type === value;
  //   });
  //   // console.log(dataObjectType);
  //   return dataObjectType;
  // };


  var createFilterTypeRoom = function (value) {
    var dataObject = window.dataFromServer.getData();
    var arr = [];
    for (var i = 0; i < dataObject.length; i++) {
      if (dataObject[i].offer.type === value || value === 'any') {
        arr.push(dataObject[i]);
        if (arr.length > 4) {
          return arr;
        }
      }
    }
    return arr;
  };

  var setFilterTypeRoom = function (evt) {
    window.pin.removePins();
    window.card.removeCards();
    var data = createFilterTypeRoom(evt.target.value);
    window.pin.renderPins(data);
    window.card.renderCards(data);
  };

  filterTypeRoom.addEventListener('change', setFilterTypeRoom);

  window.filterMap = {
    createFilterTypeRoom: createFilterTypeRoom
  };
})();
