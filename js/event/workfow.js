//var event = new Event('build');
//
//// Listen for the event.
//elem.addEventListener('build', function (e) {}, false);
//
//// Dispatch the event.
//elem.dispatchEvent(event);

window.ba.workflow = {};
window.ba.workflow.init = function () {
  var prefix = window.ba.util.random.string(32) + '_';
  return {
    prefix: prefix,
    on: function (name) {
      console.log(this.prefix + name);
    }
  };
};
