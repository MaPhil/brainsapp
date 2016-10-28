ba_ag_app.directive("baMasonry", function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      elements: "=",
      newelements: "=",
      outScope: "=?"
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
      config.heights = [];

      var core = function (elem) {
        var w = document.getElementById(elem).offsetWidth;
        var mq = window.ba.var.media_queries;
        var col = config.column;
        if (w > mq.xl) return col.xl;
        if (w < mq.xl && w > mq.l) return col.l;
        if (w < mq.l && w > mq.m) return col.m;
        if (w < mq.m) return col.s;
      };
      var fill = function (a) {
        var q = ba.q.defer();
        var array = a;
        var temp = window.ba.array.min.numEntry(config.heights);
        $timeout(function () {
          config.elemIndex++;
          if (temp !== -2) {
            console.log($scope.arrays);
            $scope.arrays[temp].push(array[0]);
          } else {
            console.log($scope.arrays);
            $scope.arrays[0].push(array[0]);
          }
          $timeout(function () {
            config.heights[temp] = $('#masonry-column-' + temp).height();
            array.splice(0, 1);
            if (array.length > 0) {
              fill(array).then(function () {
                q.done(null, null);
              });
            } else {
              q.done(null, null);
            }
          }, 100);
        });
        return q;
      };
      var init = function () {
        var q = ba.q.defer();
        $timeout(function () {
          $scope.arrays = [];
          config.heights = [];
          for (var i = 0; i < config.currentColumn; i++) {
            $scope.arrays.push([]);
            config.heights.push(0);
          }
          q.done(null, null);
        });
        return q;
      };

      if (!$attrs.identifier && $attrs.identifier !== '') $scope.id = "masonry_" + window.ba.util.random.string(10);
      else $scope.id = $attrs.identifier;
      if (!$attrs.order && $attrs.order !== '') config.order = "bottom";
      else {
        console.log('order is implemented as a parameter but has currently no effect');
        config.order = $attrs.order;
      }
      if (!$attrs.template && $attrs.template !== '') $scope.template = false;
      else $scope.template = $attrs.template;

      $timeout(function () {
        config.currentColumn = core($scope.id);
        $(window).resize(function (e) {
          var temp = core($scope.id);
          if (config.currentColumn != temp) {
            config.currentColumn = temp;
            init().then(function () {
              fill($scope.elements.slice());
            });
          }
        });
        init().then(function () {
          fill($scope.elements.slice());
        });
      }, 150);
      var hasStarted = false;
      $scope.$watch('newelements', function (o, n) {
        if (o && n && o != n) {
          if (!hasStarted) {
            $timeout(function () {
              hasStarted = true;
              fill(o.slice());
            }, 200);
          } else {
            fill(o.slice());
          }
        }
      }, true);
    }
  };
});
