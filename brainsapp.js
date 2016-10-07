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
          console.log($scope.elements);
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

    //ba_ag_app.service('$baModal', function ($rootScope, $timeout, $interpolate, $rootElement, $document, $compile) {
    //  var compile = function (el) {
    //    console.log(el)
    //    var t = window.ba.util.random.string(16),
    //      out = angular.element('<div class="ba-modal-' + t + '">' + el + ' </div>');
    //    $rootElement.append(out);
    //    $compile($('.ba-modal-'+t));
    //  };
    //  return {
    //    alert: function (text) {
    //      console.log(text)
    //      compile('<ba-alert text="\''+text+'\'"></ba-alert>');
    //    },
    //    alertImg: function (img) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    show: function (text, duration) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    showImg: function (img, duration) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    confirm: function (text) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    confirmImg: function (img) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    prompt: function (text) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    promptImg: function (img) {
    //      compile('<ba-alert text="text"></ba-alert>', {
    //        text: text
    //      });
    //    },
    //    promptArray: function (array) {
    //      compile('<ba-alert array="array"></ba-alert>', {
    //        array: array
    //      });
    //    },
    //    //    promptMixArray: function (img) {
    //    //      compile('<ba-alert text="text"></ba-alert>',{text:text});
    //    //    },
    //    custom: function (templateName, controllerName) {
    //
    //    },
    //    customElement: function (element, templateName, scopeName) {
    //
    //    }
    //  };
    //});


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
