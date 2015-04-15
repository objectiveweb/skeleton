/*global define: true, metaproject: true, ko: true, $: true */
define(function (require) {

    var menu = require('text!./view.html');


    $('.sidebar-menu').prepend(menu);

});