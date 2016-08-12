(function () {
    'use strict';
    window.ba = {};

    window.ba.var = {};

    window.ba.var.media_queries = {};
    window.ba.var.media_queries.xl = 1200;
    window.ba.var.media_queries.l = 992;
    window.ba.var.media_queries.m = 768;
    window.ba.var.media_queries.s = 544;
    window.ba.var.media_queries.xs = 400;


    window.ba.util = {};
    
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
    



    window.ba.masonry = {};
    console.log('hallo');
    window.ba.masonry.config = {};
    window.ba.masonry.config.colum = {};
    window.ba.masonry.config.colum.xl = 5;
    window.ba.masonry.config.colum.l = 4;
    window.ba.masonry.config.colum.m = 3;
    window.ba.masonry.config.colum.s = 2;

    (function () {
        'use strict';



        window.ba.masonry.init = function (elem, array) {
            var cols = core(elem);
            var o = [];
            var i;
            for (i = 0; i < cols; i++) {
                o.push([]);
            }
            for (i = 0; i < array.length; i++) {
                o[i % cols].push(array[i]);
            }
            setTimeout(function(){
                window.ba.masonry.get_basic(elem);
            },500);
            return o;
        };

        window.ba.masonry.resize = function (elem, array) {
            var cols = core(elem);
            var o = [];
            var i;
            if (cols < array.length) {
                for (i = 0; i < cols; i++) {
                    o.push(array[i]);
                }
                array.splice(0, i);
            } else {
                for (i = 0; i < cols; i++) {
                    o.push([]);
                }
            }
            array = [].concat.apply([], array);
            for (i = 0; i < array.length; i++) {
                o[i % cols].push(array[i]);
            }
            return o;
        };
        window.ba.masonry.get_basic = function (elem) {
            window.ba.masonry.config.temp = {};
            window.ba.masonry.config.temp.colum = core(elem);
            var t = [];
            for (var i = 0; i < window.ba.masonry.config.temp.colum; i++) {
                t.push($('#' + elem + '>div:nth-child(' + (i + 1) + ')').height());
            }
            window.ba.masonry.config.temp.height = t;
            return window.ba.masonry.config.temp;
        };
        window.ba.masonry.get_by_id = function (elem, id) {

        };
        window.ba.masonry.get_index = function () {
            var height_array = window.ba.masonry.config.temp.height;
            return height_array.indexOf(height_array.min());
        };
        window.ba.masonry.push_item = function(array){
            array[window.ba.masonry.get_index].push();
        };
        var core = function (elem) {
            var w = document.getElementById(elem).offsetWidth;
            var mq = window.ba.var.media_queries;
            var col = window.ba.masonry.config.colum;
            if (w > mq.xl) return col.xl;
            if (w < mq.xl && w > mq.l) return col.l;
            if (w < mq.l && w > mq.m) return col.m;
            if (w < mq.m) return col.s;
        };



    })();

}());
