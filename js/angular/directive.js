(function () {
  'use strict';
  var ba_ag_app = angular.module('brainsapp', []);
  ba_ag_app.directive("timer", function () {
    return {
      restrict: 'EA',
      replace: false,
      scope: {},
      template: $gulp_insert("templates/masonry.html"),
      controller: function ($scope, $element, $attrs) {

      }
    };
  });
})();
