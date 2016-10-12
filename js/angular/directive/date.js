ba_ag_app.directive('baDatePicker', function () {
  return {
    restrict: 'E',
    replace: false,
    scope: {
      ngModel: "=",
      text: "=?",
      jsDate: "=?"
    },
    template: $gulp_insert("templates/date/datePicker.html"),
    controller: function ($scope, $element, $attrs, $timeout) {
      if (!$scope.text) $scope.text = ba.date.config.lang;
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
