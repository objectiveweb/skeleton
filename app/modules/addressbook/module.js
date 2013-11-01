/*global require:true, ko: true */
define(function(require) {
    "use strict";
    
    // This module's dependencies
    var Boiler = require('Boiler'),
        MainMenuComponent = require('./mainMenu/component'),
        ContactComponent = require('./contact/component'),
        GridComponent = require('objectiveweb/console/libs/metaproject/components/grid/component'),
        models = require('./models');
        
    return {
        initialize: function (context) {
            
            // Instantiate dependencies
            var menuComponent = new MainMenuComponent(context),
                contactComponent = new ContactComponent(context);

            // Activate the menuComponent on the '.main-menu' element
            menuComponent.activate($('.main-menu'));
            
            // return this module's routes
            return {
                "contacts" :new GridComponent(new models.Contact.getDataSource().Nav(), {
                    header:'<div class="page-header">'
                        + '<div class="pull-right">'
                        + '<a class="btn btn-success" href="#/contacts/0">Add new</a>'
                        + '</div>'
                        + '<h1>Contacts</h1>'

                        + '</div>',
                    cols:{
                        'ID':'id',
                        'Name':'name',
                        'Email':'email'
//                      // TODO example with callback
//                      'Cidade':function (x) {
//                            return x.cidade() + ' / ' + x.estado();
//                        }
                    },
                    actions:[
                        {
                            label:'<i class="icon-edit"></i> Edit',
                            fn:function (model) { // TODO receber o elemento da row (caso delete)
                                Boiler.UrlController.goTo("contacts/" + ko.utils.unwrapObservable(model.id));
                            },
                            css:{
                                'btn-mini':true,
                                'btn-info':true
                            }
                        }

                    ]
                }),
                "contacts/{id}": contactComponent
            };
        }
    };
});
