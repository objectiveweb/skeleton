/*global define: true, metaproject: true, ko: true, $: true */
define(function (require) {
    "use strict";

    // Module dependencies
    var Boiler = require('Boiler'),
        models = require('../models');

    $('.sidebar-menu').append(require('text!./menu.html'));

    return function (context) {

        return {
            "/": {
                template: require('text!./widgets.html')
            },
            "/general": {
                template: require('text!./general.html')
            },
            "/icons": {
                template: require('text!./icons.html')
            },
            "/buttons": {
                template: require('text!./buttons.html')
            },
            "/forms": {
                template: require('text!./forms.html')
            },
            "/tables": {
                template: require('text!./tables.html')
            }
        }
    };

});
