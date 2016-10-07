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
