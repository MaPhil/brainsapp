ba_ag_app.directive('baCarousel', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      elements: "=",
      outScope: "=?",
      footerTemplate: "=?",
      headerTemplate: "=?",
      template: "=?",
      index: "=?"
    },
    template: $gulp_insert("templates/carousel.html"),
    controller: function ($scope, $element, $attrs, $timeout) {
      console.log($scope);
      $scope.index = 0;
      $scope.carousel = [];
      for (var i=0; i < $scope.elements.length; i++) {
        $scope.carousel.push({
          content: $scope.elements[i],
          id: 'carousel_' + window.ba.util.random.string(16)
        });
      }
    }
  };
});
