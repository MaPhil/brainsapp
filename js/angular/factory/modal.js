ba_ag_app.factory('$baModal', ['$animate', '$rootElement', '$compile', '$controller', '$http', '$rootScope', '$q', '$templateRequest', '$timeout', function ($animate, $rootElement, $compile, $controller, $http, $rootScope, $q, $templateRequest, $timeout) {
  var templates = {
    alert:$gulp_insert("templates/modal/alert.html"),
    show:$gulp_insert("templates/modal/show.html"),
    confirm:$gulp_insert("templates/modal/confirm.html"),
    prompt:$gulp_insert("templates/modal/prompt.html"),
    custom:$gulp_insert("templates/modal/custom.html"),
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
