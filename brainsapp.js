(function () {
    'use strict';
    window.ba = {};
    window.ba.var = {};
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
    
        
    var testMasonry = 'bla';

    //$xl_width: 1200px;
    //$l_width: 992px;
    //$m_width: 768px;
    //$s_width: 544px;
    //$xs_width: 400px;

    var masonry_init = function (array_el) {
        // > 1280 -> Desktop
        // 750 - 1280 -> tablet, phablet
        // < 750 -> phone

        var col_w = $('#masonry').clientWidth;
        var result = [];

        if (window.screen.width > 768) {

            // columns verteilen max5 min2
            if(col_w > 768 && col_w < 1200){

            }


            for(var i = 0; i < col.length; i++){
                result[i] = [];
            }
            for (var i = 0; i < array_el.length; i++) {
                result[i % col.length].push(array_el[i]);
            }

        } else {

            // columns verteilen max3 min2

            for(var i = 0; i < col.length; i++){
                result[i] = [];
            }
            for (var i = 0; i < array_el.length; i++) {
                result[i % col.length].push(array_el[i]);
            }

        }

        return result;
    }

    $(window).resize(function () {
    //    var result_array = masonry_init(array_el);
        console.log($('#masonry')[0].clientWidth);
    })

}());
