'use strict';
(function () {
  var data = {};

  window.dataFromServer = {
    setData: function (value) {
      data = value;
      // console.log(data);
    },

    getData: function () {
      return data;
    }
  };

})();
