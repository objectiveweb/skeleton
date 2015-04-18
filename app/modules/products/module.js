/*global define: true, metaproject: true, ko: true, $: true */
define(function (require) {
    "use strict";

    // Module dependencies
    var Boiler = require('Boiler'),
        viewModel = require('./viewmodel'),
        viewTemplate = require('text!./view.html');

    // 
    $('.sidebar-menu').append(require('text!./menu.html'));
    // 

    return function(context) {

        // module routes

        return {
            "/": {
                template: viewTemplate,
                viewModel: viewModel,
                activate: function(parent, params) {
                    // called after the template is loaded and viewModel is bound

                },
                deactivate: function() {
                    // called before hiding this module
                }
            },
            ":id:": require("./detail")
        }
    };

});
