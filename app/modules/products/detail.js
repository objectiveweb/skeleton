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
        create: function() {
            viewModel.model(Model.create());
        },
        load: function(id) {
            Model.get(id, viewModel.model);
        },
        destroy: function() {
            //if(confirm('Are you sure ?')) {
                viewModel.model().destroy(function() {
                    viewModel.close();
                });
            //}
        },
        save: function() {
            viewModel.model().save(function() {
                viewModel.close();
            });
        },
        close: function() {
            viewModel.model(null);
            Boiler.UrlController.up();
        }
    };

    return {
        template: viewTemplate,
        viewModel: viewModel,
        activate: function(parent, params) {
            // called after the template is loaded and viewModel is bound
            if(params.id == 'new') {
                viewModel.create();
            }
            else {
                viewModel.load(params.id);
            }
        },
        deactivate: function() {
            // called before hiding this module
        }
    }
});