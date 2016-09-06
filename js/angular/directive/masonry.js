ba_ag_app.directive("baMasonry", function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      elements: "="
    },
    template: $gulp_insert("templates/masonry.html"),
    controller: function ($scope, $element, $attrs, $timeout) {

      var config = {};
      config.column = {};
      config.column.xl = 5;
      config.column.l = 4;
      config.column.m = 3;
      config.column.s = 2;

      //in action
      config.currentColumn = 5;
      config.order = '';
      config.elemIndex = 0;


      var core = function (elem) {
        var w = document.getElementById(elem).offsetWidth;
        var mq = window.ba.var.media_queries;
        var col = config.column;
        if (w > mq.xl) return col.xl;
        if (w < mq.xl && w > mq.l) return col.l;
        if (w < mq.l && w > mq.m) return col.m;
        if (w < mq.m) return col.s;
      };
      var init = function () {
        $timeout(function () {
          $scope.arrays = new Array(config.currentColumn);
        });
      };

      if (!$attrs.identifier && $attrs.identifier !== '') $scope.id = "masonry_" + window.ba.util.random.string(10);
      else $scope.id = $attrs.identifier;
      if (!$attrs.order && $attrs.order !== '') config.order = "bottom";
      else config.order = $attrs.order;
      if (!$attrs.template && $attrs.template !== '') $scope.template = false;
      else $scope.template = $attrs.template;

      $timeout(function () {
        config.currentColumn = core($scope.id);
        $(window).resize(function (e) {
          var temp = core($scope.id);
          if (config.currentColumn != temp) {
            config.currentColumn = temp;
            init();
          }
        });
        init();
      }, 150);

    }
  };
});
