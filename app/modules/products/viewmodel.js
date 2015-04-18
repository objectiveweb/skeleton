define(function(require) {

    // Module dependencies
    var Boiler = require('Boiler'),
        models = require('../models');

    var Model = models['Product'];

    return {
        data: Model.query({}),
        columns: [],
        actions: {
            'Edit': function(item) {
                Boiler.UrlController.goTo('products/' + item.id());
            }
        }
    }
});