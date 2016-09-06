(function () {
  'use strict';


  window.ba = {};
  /*
   *  Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
   *  Licensed under the New BSD License.
   *  https://github.com/stackp/promisejs
   */
  /*
   * Heavily modified but with the help of this package not possible
   */


  var Promise = function () {
    this.cbs = [];
    this.then = function (func) {
      var p;
      if (this._isdone) {
        p = func.apply(null, this.result);
      } else {
        p = new Promise();
        this.cbs.push(function () {
          var res = func.apply(null, arguments);
          if (res && typeof res.then === 'function')
            res.then(p.done, p);
        });
      }
      return p;
    };
    this.done = function () {
      this.result = arguments;
      this._isdone = true;
      for (var i = 0; i < this.cbs.length; i++) {
        this.cbs[i].apply(null, arguments);
      }
      this.cbs = [];
    };
  };
  var paralell = function (promises) {
    var p = new Promise();
    var results = [];

    if (!promises || !promises.length) {
      p.done(results);
      return p;
    }

    var numdone = 0;
    var total = promises.length;

    function notifier(i) {
      return function () {
        numdone += 1;
        results[i] = Array.prototype.slice.call(arguments);
        if (numdone === total) {
          p.done(results);
        }
      };
    }

    for (var i = 0; i < total; i++) {
      promises[i].then(notifier(i));
    }

    return p;
  };
  var waterfall = function (funcs, args) {
    var p = new Promise();
    if (funcs.length === 0) {
      p.done.apply(p, args);
    } else {
      funcs[0].apply(null, args).then(function () {
        funcs.splice(0, 1);
        waterfall(funcs, arguments).then(function () {
          p.done.apply(p, arguments);
        });
      });
    }
    return p;
  };
  ba.q = {
    defer: function () {
      return new Promise();
    },
    paralell: paralell,
    waterfall: waterfall,
  };


  window.ba.var = {};

  window.ba.var.media_queries = {};
  window.ba.var.media_queries.xl = 1200;
  window.ba.var.media_queries.l = 992;
  window.ba.var.media_queries.m = 768;
  window.ba.var.media_queries.s = 544;
  window.ba.var.media_queries.xs = 400;


  window.ba.util = {};

  //random functions
  window.ba.util.random = {};
  window.ba.util.random.int = function (a, b) {
      return Math.floor(Math.random() * (b - a + 1)) + a;
  };
  window.ba.util.random.float = function (a, b) {
      return Math.random() * (b - a) + a;
  };
  window.ba.util.random.string = function (l) {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < l; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
      return text;
  };




  window.ba.masonry = {};
  console.log('hallo');
  window.ba.masonry.config = {};
  window.ba.masonry.config.colum = {};
  window.ba.masonry.config.colum.xl = 5;
  window.ba.masonry.config.colum.l = 4;
  window.ba.masonry.config.colum.m = 3;
  window.ba.masonry.config.colum.s = 2;

  (function () {
      'use strict';



      window.ba.masonry.init = function (elem, array) {
          var cols = core(elem);
          window.ba.masonry.current_colums = cols;
          var o = [];
          var i;
          for (i = 0; i < cols; i++) {
              o.push([]);
          }
          for (i = 0; i < array.length; i++) {
              o[i % cols].push(array[i]);
          }
          setTimeout(function () {
              window.ba.masonry.get_basic(elem);
          }, 500);
          return o;
      };

      window.ba.masonry.resize = function (elem, array) {
          var cols = core(elem);
          window.ba.masonry.current_colums = cols;
          var o = [];
          var i;

          if (cols < array.length) {
              for (i = 0; i < cols; i++) {
                  o.push(array[i]);
              }
              array.splice(0, i);
          } else {
              for (i = 0; i < cols; i++) {
                  o.push([]);
              }
          }
          array = [].concat.apply([], array);
          for (i = 0; i < array.length; i++) {
              o[i % cols].push(array[i]);
          }
          return o;
      };
      window.ba.masonry.colums = function (elem) {
          return core(elem);
      };
      var core = function (elem) {
          var w = document.getElementById(elem).offsetWidth;
          var mq = window.ba.var.media_queries;
          var col = window.ba.masonry.config.colum;
          if (w > mq.xl) return col.xl;
          if (w < mq.xl && w > mq.l) return col.l;
          if (w < mq.l && w > mq.m) return col.m;
          if (w < mq.m) return col.s;
      };



  })();



  $(function () {
    'use strict';
    $('.ba-dropbtn').on('click', function (e) {
      $('#'+e.target.id+'.ba-dropdown-content').toggleClass("ba-show");
    });
  });
  window.onclick = function (event) {
    if (!event.target.matches('.ba-dropbtn')) {
      var dropdowns = document.getElementsByClassName("ba-dropdown-content ");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('ba-show')) {
          openDropdown.classList.remove('ba-show');
        }
      }
    }
  };


  (function () {
    'use strict';
    var ba_ag_app = angular.module('brainsapp', []);

    //injects all directives
    ba_ag_app.directive("baMasonry", function () {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          elements: "="
        },
        template: "<div class=\"ba-masonry\" id=\"{{id}}\"><div ng-repeat=\"array in arrays track by $index\"><div ng-repeat=\"elem in array track by $index\"><span ng-if=\"template ==false\">{{elem}}</span><div ng-if=\"template != false\" ng-include=\"template\"></div></div></div></div>",
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

    ba_ag_app.directive("timer", function () {
      return {
        restrict: 'EA',
        replace: false,
        scope: {},
    //    template: "<div class=\"ba-masonry\" id=\"{{id}}\"><div ng-repeat=\"array in arrays track by $index\"><div ng-repeat=\"elem in array track by $index\"><span ng-if=\"template ==false\">{{elem}}</span><div ng-if=\"template != false\" ng-include=\"template\"></div></div></div></div>",
        controller: function ($scope, $element, $attrs) {

        }
      };
    });


    //injects all factories
  })();
}());
