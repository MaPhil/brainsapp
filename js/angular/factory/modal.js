ba_ag_app.factory('$baModal', function () {
  console.log('bla');
  return {
    init: function (scope) {
      console.log(scope);
    }
  };
});
