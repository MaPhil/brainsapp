(function () {
  window.ba.array.min = {};
  window.ba.array.min.numEntry = function (a) {
    if (typeof a === 'object' && a.length > 0) {
      var min = 0;
      for (var i = 0; i < a.length; i++) {
        if (a[i] < a[min]) min = i;
      }
      return min;
    } else return -2;
  };
  window.ba.array.min.entryLength = function () {
    if (typeof a === 'object' && a.length > 0) {
      var min = 0;
      for (i = 0; i < a.length; i++) {
        if (a[i].length < a[min].length) min = i;
      }
      return min;
    } else return -2;
  };
})();
