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
