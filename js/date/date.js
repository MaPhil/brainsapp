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
