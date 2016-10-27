var baDate;
(function () {
  'use strict';

  //brainsapp data types
  baDate = function (a, b) {
    var t;
    if (!a && !b) {
      t = new Date();
      this.date = t;
      this.ar = t;
    } else if (a && !b) {
      if (a instanceof Date) {


        this.date = a;
        this.ar = [a.getDate(), (a.getMonth() + 1), a.getFullYear(), a.getHours(), a.getMinutes(), a.getSeconds(), a.getMilliseconds()];

      } else if (a instanceof baDate) {

        this.date = a.date;
        this.ar = a.ar;
      } else if (typeof a === 'string') {


        if ((/[0-9]{1,2}[\.\/\-\:\,\;](1[0-2]|[1-9]|0[1-9])[\.\/\-\:\,\;][0-9]{2,4}(([\.\/\-\:\,\;][0-9]{1,2}){2,4}|([\.\/\-\:\,\;][0-9]{1,3}){0})/g).test(a)) {
          t = a.split(/[\.\/\-\:\,\;]/g);
          for (var k = 0; k < t.length; k++) t[k] = parseInt(t[k]);
          this.ar = t;

          this.date = new Date(t[2], t[1], t[0]);
          this.date.setHours(((t[3] !== undefined) ? t[3] : 0), ((t[4] !== undefined) ? t[4] : 0), ((t[5] !== undefined) ? t[5] : 0), ((t[6] !== undefined) ? t[6] : 0));
        } else {
          console.error('invalid Date format please use d.m.y.h.m.s.ms as pattern');
        }
      }
    } else if (a && b) {
      var te = b.split(/[\.\/\-\:\,\;]/g);
      t = a.split(/[\.\/\-\:\,\;]/g);
      for (var j = 0; j < t.length; j++) t[j] = parseInt(t[j]);
      this.ar = t;

      var setDate = [];
      var i = te.indexOf('d');
      setDate.push(t[i] - 1);
      i = te.indexOf('m');
      setDate.push(t[i] - 1);
      i = te.indexOf('y');
      setDate.push(t[i] - 1);
      this.date = new Date(t[2], t[1], t[0]);
      i = te.indexOf('h');
      if (i != -1) {
        this.date.setHours(t[i]);
      }
      i = te.indexOf('mi');
      if (i != -1) {
        this.date.setHours(t[i]);
      }
      i = te.indexOf('s');
      if (i != -1) {
        this.date.setHours(t[i]);
      }
      i = te.indexOf('ms');
      if (i != -1) {
        this.date.setHours(t[i]);
      }

    }
  };

  baDate.prototype.get = function (a) {
    var temp;
    if (!a) return this.ar[0] + '-' + this.ar[1] + '-' + this.ar[2];
    else if (a == 'd') return this.ar[0];
    else if (a == 'm') return this.ar[1];
    else if (a == 'y') return this.ar[2];
    else if (a == 'h') return this.ar[3];
    else if (a == 'mi') return this.ar[4];
    else if (a == 's') return this.ar[5];
    else if (a == 'ms') return this.ar[6];
    else if (a == 'time') return this.ar[3] + ':' + this.ar[4] + ':' + this.ar[5] + ':' + this.ar[6];
    else if (a == 'weekDay') return this.date.getDay();
    else if (a == 'daysCount') return ba.date.config.monthDays[this.ar[1]];
    else if (a == 'dayOfMonth') {
      return this.date.getDate();
    } else if (a == 'firstWeekDayOfMonth') {
      temp = new Date(this.ar[2], this.ar[1]-1, 1);
      return temp.getDay();
    } else if (a == 'lastWeekDayOfMonth') {
      temp = new Date(this.ar[2], (this.ar[1]), 0);
      return temp.getDay();
    }
  };
  baDate.prototype.set = function (a, b) {
    var t;
    if (a == 'd') this.ar[0] = b;
    else if (a == 'm') this.ar[1] = b;
    else if (a == 'y') this.ar[2] = b;
    else if (a == 'h') this.ar[3] = b;
    else if (a == 'mi') this.ar[4] = b;
    else if (a == 's') this.ar[5] = b;
    else if (a == 'ms') this.ar[6] = b;
    else if (a == 'time') {
      t = b.split(/[\.\/\-\:\,\;]/g);
      this.ar[3] = ((t[0] !== undefined) ? t[0] : 0);
      this.ar[4] = ((t[1] !== undefined) ? t[1] : 0);
      this.ar[5] = ((t[2] !== undefined) ? t[2] : 0);
      this.ar[6] = ((t[3] !== undefined) ? t[3] : 0);
    } else if (a == 'date') {
      t = b.split(/[\.\/\-\:\,\;]/g);
      this.ar[0] = ((t[0] !== undefined) ? t[0] : 1);
      this.ar[1] = ((t[1] !== undefined) ? t[1] : 1);
      this.ar[2] = ((t[2] !== undefined) ? t[2] : 1991);
    } else if (a == 'fullDate') {
      t = b.split(/[\.\/\-\:\,\;]/g);
      this.ar[0] = ((t[0] !== undefined) ? t[0] : 1);
      this.ar[1] = ((t[1] !== undefined) ? t[1] : 1);
      this.ar[2] = ((t[2] !== undefined) ? t[2] : 1991);
      this.ar[3] = ((t[3] !== undefined) ? t[3] : 0);
      this.ar[4] = ((t[4] !== undefined) ? t[4] : 0);
      this.ar[5] = ((t[5] !== undefined) ? t[5] : 0);
      this.ar[6] = ((t[6] !== undefined) ? t[6] : 0);
    }
    this.date = new Date(parseInt(this.ar[2]), parseInt(this.ar[1]), this.ar[0]);
    this.date.setHours(((this.ar[3] !== undefined) ? this.ar[3] : 0), ((this.ar[4] !== undefined) ? this.ar[4] : 0), ((this.ar[5] !== undefined) ? this.ar[5] : 0), ((this.ar[6] !== undefined) ? this.ar[6] : 0));
  };
  baDate.prototype.subtract = function (a, b) {

  };
  baDate.prototype.add = function (a, b) {

  };
  baDate.prototype.isBefore = function (a) {

  };
  baDate.prototype.isAfter = function (a) {

  };
  baDate.prototype.isBeforeEqual = function (a) {

  };
  baDate.prototype.isAfterEqual = function (a) {

  };
  baDate.prototype.isEqual = function (a) {

  };
  baDate.prototype.futur = function () {

  };
  baDate.prototype.past = function () {

  };




  window.ba = {};
  /*
   *  Copyright 2012-2013 (c) Pierre Duquesne <stackp@online.fr>
   *  Licensed under the New BSD License.
   *  https://github.com/stackp/promisejs
   */
  /*
   * Heavily modified but without the help of this package not possible
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


  window.ba.util.array = {};
  window.ba.util.array.addOnlyNew = function (a, b) {
    var i;
    for (i = 0; i < a.length; i++) a[i] = JSON.stringify(a[i]);
    for (i = 0; i < b.length; i++) b[i] = JSON.stringify(b[i]);

    for (i = 0; i < b.length; i++) {
      var t = a.indexOf(b[i]);
      if (t == -1) {
        a.push(b[i]);
      }
    }
    for (i = 0; i < a.length; i++) a[i] = JSON.parse(a[i]);
    return a;
  };


  window.ba.date = {};
  ba.date.config = {};

  ba.date.config.monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  ba.date.config.day = 7;
  ba.date.config.month = 12;

  ba.date.config.lang = {
    days: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    daysShort: ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.'],
    month: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    monthShort: ['Jan.','Feb.','Mär.','Apr.','Mai.','Jun.','Jul.','Aug.','Sep.','Okt.','Nov.','Dez.'],
    time: ['Stunden', 'Minuten', 'Sekunden'],
    timeShort: ['Std.', 'Min.', 'Sek.']
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
          newelements: "=",
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
            console.log(config.heights)
            console.log(temp)
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
            console.log('asdfghj')
            init().then(function () {
              fill($scope.elements.slice());
            });
          }, 150);
          $scope.$watch('newelements', function (o, n) {
            if (o && n && o != n) {
              console.log('test');
              fill(o.slice());
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
        template: "<div class=\"ba-carousel\"><div ng-if=\"headerTemplate && headerTemplate!=''\" ng:class=\"{true:'hasHeader',false:''}[headerTemplate && headerTemplate!='']\" class=\"ba-carousel-header\"><div ng-include=\"headerTemplate\"></div></div><div class=\"ba-carousel-body\"><div ng-repeat=\"elem in carousel\" class=\"ba-item ba-item-{{$index}}\" ng-class=\"[{true:'ba-very-left'}[$index<(index-1)],{true:'ba-left'}[$index==(index-1)],{true:'ba-center'}[$index==index],{true:'ba-right'}[$index==(index+1)]]\"><div ng-if=\"template && template!=''\" style=\"height:100%;\" ng-include=\"template\"></div><div ng-if=\"!template || template==''\">{{$index}} {{elem}}</div></div></div><div  ng-if=\"footerTemplate && footerTemplate!=''\" ng:class=\"{true:'hasFooter',false:''}[footerTemplate && footerTemplate!='']\" class=\"ba-carousel-footer\"><div ng-include=\"footerTemplate\"></div></div></div>",
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

    ba_ag_app.directive('baDatePicker', function () {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          ngModel: "=",
          text: "=?",
          jsDate: "=?"
        },
        template: "<div class=\"ba-date-picker\"><span ng-click=\"open()\"><input readonly ng-model=\"display\" type=\"text\" /></span><div class=\"ba-calender\" ng:class=\"{true:'ba-active'}[isOpen]\"><div class=\"ba-control\"><div class=\"ba-dynamic-row\"><div class=\"ba-dynamic-col ba-dynamic-col-7\"><span style=\"padding-right: 5px;\">{{text.month[center.month-1]}}</span><span>{{center.year}}</span></div><div class=\"ba-dynamic-col\"><div class=\"ba-dynamic-row\"><div class=\"ba-dynamic-col ba-control-elements\" ng-click=\"newMonth(center.month-1)\">◀</div><div class=\"ba-dynamic-col ba-control-elements\" ng-click=\"newMonth(current.month)\">●</div><div class=\"ba-dynamic-col ba-control-elements\" ng-click=\"newMonth(center.month+1)\">▶</div></div></div></div></div><div class=\"ba-sub\"><div class=\"ba-head\"><div class=\"ba-week-day\" ng-repeat=\"_ in ((_ = []) && (_.length=config.day) && _) track by $index\" >{{text.daysShort[$index]}}</div></div><div class=\"ba-body\" ng-class=\"changeClass\"><div class=\"ba-week-day ba-gray\" ng-repeat=\"_ in ((_ = []) && (_.length=(center.beginning - 1)) && _) track by $index\" ng-click=\"newMonth(center.month-1)\">{{config.monthDays[center.month - 2] - ((center.beginning-2)- $index)}}</div><div class=\"ba-week-day\" ng-repeat=\"_ in ((_ = []) && (_.length=config.monthDays[center.month-1]) && _) track by $index\" ng:class=\"{true:'ba-selected'}[($index+1) == current.dayOfMonth && center.month == current.month && center.year == current.year]\" ng-click=\"selectDay($index+1)\">{{$index+1}}</div><div class=\"ba-week-day ba-gray\" ng-repeat=\"_ in ((_ = []) && (_.length=(7-center.ending)) && _) track by $index\" ng-click=\"newMonth(center.month+1)\">{{$index+1}}</div></div></div></div></div>",
        controller: function ($scope, $element, $attrs, $timeout) {
          if (!$scope.text || $scope.text === '') $scope.text = ba.date.config.lang;
          $scope.config = ba.date.config;

          $scope.center = {};
          $scope.display = '';
          if (!$scope.ngModel) $scope.center.date = new baDate(new Date());
          else {
            $scope.center.date = new baDate($scope.ngModel);
            $scope.display = $scope.center.date.get();
          }


          $scope.center.beginning = $scope.center.date.get('firstWeekDayOfMonth');
          $scope.center.ending = $scope.center.date.get('lastWeekDayOfMonth');
          $scope.center.month = $scope.center.date.get('m');
          $scope.center.year = $scope.center.date.get('y');
          $scope.current = {
            month: $scope.center.month,
            year: $scope.center.year,
            dayOfMonth: $scope.center.date.get('dayOfMonth'),
          };

          $scope.selectDay = function (a) {
            var temp = $scope.center.date;
            temp.set('d', a);
            $timeout(function () {
              $scope.center = {
                date: temp
              };
              $scope.center.beginning = $scope.center.date.get('firstWeekDayOfMonth');
              $scope.center.ending = $scope.center.date.get('lastWeekDayOfMonth');
              $scope.center.month = $scope.center.date.get('m');
              $scope.center.year = $scope.center.date.get('y');
            });
            $scope.current = {
              month: $scope.center.month,
              year: $scope.center.year,
              dayOfMonth: $scope.center.date.get('dayOfMonth'),
            };
            $timeout(function () {
              if ($scope.jsDate !== undefined && $scope.jsDate === false) $scope.ngModel = $scope.center.date;
              else $scope.ngModel = $scope.center.date.date;
              $timeout(function () {
                $scope.display = $scope.center.date.get();
                $scope.open();
              }, 1000);
            });
          };
          $scope.changeClass = '';
          var newMonthUtil = function () {
            var q = ba.q.defer();
            $scope.changeClass = 'ba-hide';
            $timeout(function () {

              $scope.changeClass = 'ba-show';
              q.done(null, true);
            }, 500);
            return q;
          };
          $scope.newMonth = function (a) {
            newMonthUtil().then(function () {
              var temp = $scope.center.date;
              temp.set('m', a);
              $timeout(function () {
                $scope.center = {
                  date: temp
                };
                $scope.center.beginning = $scope.center.date.get('firstWeekDayOfMonth');
                $scope.center.ending = $scope.center.date.get('lastWeekDayOfMonth');
                $scope.center.month = $scope.center.date.get('m');
                $scope.center.year = $scope.center.date.get('y');
              });
            });
          };
          $scope.isOpen = false;
          $scope.open = function () {
            $scope.isOpen = !$scope.isOpen;
          };
        }
      };
    });




    //injects all services
    ba_ag_app.service('$baTimer', function ($rootScope, $timeout) {
      var onTimeout = function () {
        var now = new Date();
        if (active == 'start') {
          $rootScope[setScope] = now.getTime() - startTime;
          timeOut = $timeout(onTimeout, 200);
        }
      };
      var startTime = false,
        timeOut = null,
        setScope = 'timer',
        active = 'stop';
      return {
        setScope: function (a) {
          setScope = a;
        },
        start: function () {
          if (active == 'stop') {
            active = 'start';
            var now = new Date();
            startTime = now.getTime();
            timeOut = $timeout(onTimeout, 200);
          } else console.log('it\'s already running');
        },
        stop: function () {
          if (active == 'start') {
            active = 'stop';
            clearTimeout(timeOut);
            var now = new Date();
            var out = now.getTime() - this.startTime;
            startTime = '';
            $rootScope[setScope] = '';
            return out;
          } else console.log('nothing is running');
        },
        pause: function () {
          if (active == 'start') {
            active = 'pause';
            clearTimeout(timeOut);
            var now = new Date();
            $rootScope[setScope] = now.getTime() - startTime;
          } else console.log('nothing is running');
        },
        resume: function () {
          if (active == 'pause') {
            active = "start";
            var now = new Date();
            startTime = now.getTime() - $rootScope[setScope];
            timeOut = $timeout(onTimeout, 200);
          } else console.log('it\'s not paused');
        }
      };
    });


    //injects all factories
    ba_ag_app.factory('$baModal', ['$animate', '$rootElement', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateRequest', '$timeout', function ($animate, $rootElement, $compile, $controller, $http, $rootScope, $q, $templateRequest, $timeout) {
      var templates = {
        alert:"<div id=\"{{id}}\"><div id=\"ba-modal\" class=\"ba-modal-alert \"><div class=\"ba-content\"><div class=\"ba-body\"><span ng-if=\"!image\">{{text}}</span><div class=\"ba-image\" ng-if=\"image\" style=\"background-image:url({{text}})\"></div></div><div class=\"ba-footer\"><div ng-click=\"close()\" class=\"ba-btn ba-emerald ba-uppercase ba-fine ba-full\">Ok</div></div></div></div></div>",
        show:"<div ng-click=\"close()\" id=\"{{id}}\"><div id=\"ba-modal\" class=\"ba-modal-show\"><div class=\"ba-content ba-container\"><div class=\"ba-body\"><span ng-if=\"!image\">{{text}}</span><div class=\"ba-image\" ng-if=\"image\" style=\"background-image:url({{text}})\"></div></div></div></div></div>",
        confirm:"<div id=\"{{id}}\"><div id=\"ba-modal\" class=\"ba-modal-confirm \"><div class=\"ba-content ba-container\"><div class=\"ba-body\"><span ng-if=\"!image\">{{text}}</span><div class=\"ba-image\" ng-if=\"image\" style=\"background-image:url({{text}})\"></div></div><div class=\"ba-footer\"><div class=\"ba-row\"><div class=\"ba-col-xs-6\"><div ng-click=\"close(false)\" class=\"ba-btn ba-concrete-outline ba-uppercase ba-fine ba-full\">{{t.cancle}}</div></div><div class=\"ba-col-xs-6\"><div ng-click=\"close(true)\" class=\"ba-btn ba-emerald ba-uppercase ba-fine ba-full\">{{t.ok}}</div></div></div></div></div></div></div>",
        prompt:"<div id=\"{{id}}\"><div id=\"ba-modal\" class=\"ba-modal-confirm \"><div class=\"ba-content ba-container-m-6\"><div class=\"ba-body\"><span ng-if=\"!image\">{{text}}</span><div class=\"ba-image\" ng-if=\"image\" style=\"background-image:url({{text}})\"></div><div class=\"ba-form\"><input class=\"ba-input\" ng-model=\"tiped\"></div></div><div class=\"ba-footer\"><div class=\"ba-row\"><div class=\"ba-col-xs-6\"><div ng-click=\"close(tiped)\" class=\"ba-btn ba-concrete-outline ba-uppercase ba-fine ba-full\">{{t.cancle}}</div></div><div class=\"ba-col-xs-6\"><div ng-click=\"close(tiped)\" class=\"ba-btn ba-emerald ba-uppercase ba-fine ba-full\">{{t.ok}}</div></div></div></div></div></div></div>",
        custom:"",
      };
      var usedText = {
        de: {
          ok: 'Ok',
          cancle: 'Abbrechen'
        },
        en: {
          ok: 'ok'
        },
        cancle: 'cancle'
      };
      var lang = 'de';
      var closeQ;
      var rootScopeOnClose;
      var modalScope;
      var compile = function (el, controller, id) {

        modalScope = $rootScope.$new();

        rootScopeOnClose = $rootScope.$on('$locationChangeSuccess', close);

        var environment = {
          $scope: modalScope,
          id: id,
          languageText: usedText[lang],
          close: function (a, b, c) {
            close(b, a);
          }
        };

        var linkFn = $compile(el);
        var modalElement = linkFn(modalScope);
        environment.$element = modalElement;

        var modalController = $controller(controller, environment, false, null);
        $rootElement.append(modalElement);
      };
      var close = function (a, b) {
        closeQ.resolve(b);
        var target = $('#' + a);
        $animate.leave(angular.element(target)).then(function () {
          modalScope.$destroy();
          target.remove();
          rootScopeOnClose();
        });
      };

      function Modal() {}
      Modal.prototype = {

        setLanguage: function (lang) {
          lang = lang;
        },
        alert: function (text, options) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.alert, function ($scope, id, languageText, close) {
            $scope.image = false;
            $scope.t = languageText;
            $scope.id = id;
            $scope.text = text;
            $scope.close = function () {

              close(null, id);
            };
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        alertImg: function (img) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.alert, function ($scope, id, languageText, close) {
            $scope.image = true;
            $scope.t = languageText;
            $scope.id = id;
            $scope.text = img;
            $scope.close = function () {

              close(null, id);
            };
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        show: function (text, duration) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.show, function ($scope, id, languageText, close) {
            $scope.image = false;
            $scope.id = id;
            $scope.text = text;
            if (!duration) duration = 5000;
            $scope.close = function(){
              close(null, id);
            };
            $timeout(function () {
              $scope.close();
            }, duration);
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        showImg: function (img, duration) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.show, function ($scope, id, languageText, close) {
            $scope.image = true;
            $scope.id = id;
            $scope.text = img;
            if (!duration) duration = 5000;
            $scope.close = function(){
              close(null, id);
            };
            $timeout(function () {
              $scope.close();
            }, duration);
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        confirm: function (text) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.confirm, function ($scope, id, languageText, close) {
            $scope.t = languageText;
            $scope.image = false;
            $scope.id = id;
            $scope.text = text;
            $scope.close = function (a) {

              close(a, id);
            };
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        confirmImg: function (img) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.confirm, function ($scope, id, languageText, close) {
            $scope.t = languageText;
            $scope.image = true;
            $scope.id = id;
            $scope.text = img;
            $scope.close = function (a) {

              close(a, id);
            };
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        prompt: function (text) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.prompt, function ($scope, id, languageText, close) {
            $scope.t = languageText;
            $scope.image = false;
            $scope.id = id;
            $scope.text = text;
            $scope.close = function (a) {
              close(a, id);
            };
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        promptImg: function (img) {
          var mainQ = $q.defer(),
            id = 'ba-modal-' + window.ba.util.random.string(16);
          closeQ = $q.defer();
          compile(templates.prompt, function ($scope, id, languageText, close) {
            $scope.t = languageText;
            $scope.image = true;
            $scope.id = id;
            $scope.text = img;
            $scope.close = function (a) {
              close(a, id);
            };
          }, id);
          mainQ.resolve(closeQ.promise);
          return mainQ.promise;
        },
        promptArray: function (array) {
          this.array = array;
        },
        custom: function (templateName, controllerName) {

        },
      };
      return Modal;
    }]);

  })();

}());
