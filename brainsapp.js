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


  window.ba.array = {};
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



  window.ba.workflow = {};
  window.ba.workflow.init = function () {
    var prefix = window.ba.util.random.string(32) + '_';
    return {
      prefix: prefix,
      events: {},
      on: function (name, callback) {
        this.events[this.prefix + name] = new CustomEvent(this.prefix + name, {
          details: {}
        });
        var el = window.addEventListener(this.prefix + name, function (e) {
          window.removeEventListener(this.prefix + name, el);
          callback(e.details);
        });
      },
      emit: function (name, attr) {
        var e = this.events[this.prefix + name];
        e.details = attr;
        window.dispatchEvent(e);
      }
    };
  };

  //click and mouse over stuff

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


  //angular stuff
  (function () {
    'use strict';
    var ba_ag_app = angular.module('brainsapp', []);

    //injects all directives
    ba_ag_app.directive("baMasonry", function () {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          elements: "=",
          outScope: "=?"
        },
        template: "<div class=\"ba-masonry\" id=\"{{id}}\"><div class=\"ba-column\" id=\"masonry-column-{{$index}}\" ng-repeat=\"array in arrays track by $index\"><div ng-repeat=\"elem in array track by $index\"><span ng-if=\"template ==false\">{{elem}}</span><div ng-if=\"template != false\" ng-include=\"template\"></div></div></div></div>",
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
              $scope.arrays[temp].push(array[0]);
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
          $scope.$watch('elements', function (o, n) {
            if (o && n && o != n) {
              var t = $scope.elements.slice();
              t.splice(0, config.elemIndex);
              fill(t.slice());
            }
          }, true);
        }
      };
    });

    ba_ag_app.directive("timer", function () {
      return {
        restrict: 'EA',
        replace: false,
        scope: {},
    //    template: "<div class=\"ba-masonry\" id=\"{{id}}\"><div class=\"ba-column\" id=\"masonry-column-{{$index}}\" ng-repeat=\"array in arrays track by $index\"><div ng-repeat=\"elem in array track by $index\"><span ng-if=\"template ==false\">{{elem}}</span><div ng-if=\"template != false\" ng-include=\"template\"></div></div></div></div>",
        controller: function ($scope, $element, $attrs) {

        }
      };
    });



    //injects all factories
    ba_ag_app.factory('$baModal', function () {
      console.log('bla');
      return {
        init: function (scope) {
          console.log(scope);
        }
      };
    });

  })();

}());
