
(function () {
    'use strict';



    window.ba.masonry.init = function (elem, array) {
        var cols = core(elem);
        console.log(cols)
        var o = [];
        var i;
        for (i = 0; i < cols; i++) {
            o.push([]);
        }
        for (i = 0; i < array.length; i++) {
            o[i % cols].push(array[i]);
        }
        return o;
    };

    var core = function (elem) {
        var w = document.getElementsByClassName(elem)[0].offsetWidth;
        var mq = window.ba.var.media_queries;
        var col = window.ba.masonry.config.colum;
        if (w > mq.xl) return col.xl;
        if (w < mq.xl && w > mq.l) return col.l;
        if (w < mq.l && w > mq.m) return col.m;
        if (w < mq.m && w > mq.s) return col.s;
    };

})();
