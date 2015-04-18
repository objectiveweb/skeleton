/*global define: true, metaproject: true, ko: true, $: true */
define(function (require) {
    "use strict";


    // Module dependencies
    var Boiler = require('Boiler'),
        models = require('../models'),
        viewTemplate = require('text!./detail.html');

    var Model = models['Product'];

    var viewModel = {
        model: ko.observable(),
        load: function(id) {
            Model.get(id, viewModel.model);
        },
        save: function() {
            viewModel.model().save(function() {
                viewModel.close();
            });
        },
        close: function() {
            Boiler.UrlController.up();
        }
    };

    return {
        template: viewTemplate,
        viewModel: viewModel,
        activate: function(parent, params) {
            // called after the template is loaded and viewModel is bound
            viewModel.load(params.id);
        },
        deactivate: function() {
            // called before hiding this module
        }
    }
});