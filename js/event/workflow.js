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
