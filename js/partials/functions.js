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
