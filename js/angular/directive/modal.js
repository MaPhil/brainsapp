ba_ag_app.directive("baModal", function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      options: "=",
    },
    template: $gulp_insert("templates/modal.html"),
    controller: function ($scope, $element, $attrs, $timeout) {

    }
  };
});
