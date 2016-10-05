ba_ag_app.directive('baCarousel', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      elements: "=",
      outScope: "=?"
    },
    template: $gulp_insert("templates/carousel.html"),
    controller: function ($scope, $element, $attrs, $timeout) {

    }
  };
});
