/**
 * The models provided by this module
 */
define(function() {

    var models = {};

    models.Contact = metaproject.Model({
        id: null,
        name: null,
        email: null,
        created: null,
        modified: null
    });

    return models;
});