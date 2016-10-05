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
