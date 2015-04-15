/*global define: true, metaproject: true, ko: true, $: true */
define(function (require) {
    "use strict";

    // Module dependencies
    var Boiler = require('Boiler'),
        models = require('../models'),
        viewTemplate = require('text!./view.html');

    var viewModel = {
        name: 'Skeleton',
        url: 'http://github.com/bravado/generator-metaproject'
    };

    return {

        template: viewTemplate,
        viewModel: viewModel,
        activate: function (parent, params) {
            // called after the template is loaded and viewModel is bound

        },
        deactivate: function () {
            // called before hiding this module
        }

    };

});
