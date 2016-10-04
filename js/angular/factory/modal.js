ba_ag_app.factory('$baModal', function ($rootElement) {
  return {
    template:['<ba-modal>',''],
    init: function () {
      $($rootElement[0]).html('bla');
    }
  };
});
