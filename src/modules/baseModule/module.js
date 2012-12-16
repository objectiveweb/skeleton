define(['Boiler', './landingPage/component', './mainMenu/component', './contact/component', '../../../../objectiveweb/console/libs/metaproject/components/grid/component' ],
    function (Boiler, LandingPageComponent, MainMenuComponent, ContactComponent, GridComponent) {

        var Module = function (globalContext) {
            var context = new Boiler.Context(globalContext),
                contactComponent = new ContactComponent(context);


            //scoped DomController that will be effective only on $('#page-content')
            var controller = new Boiler.DomController($('#page-content'));
            //add routes with DOM node selector queries and relevant components
            controller.addRoutes({
                ".main-menu":new MainMenuComponent(context)
            });
            controller.start();

            //the landing page should respond to the root URL, so let's use an URLController too
            var controller = new Boiler.UrlController($(".appcontent"));
            controller.addRoutes({
                "/":new LandingPageComponent(context),
                "contacts" :new GridComponent(new contactComponent.dataSource.Nav(), {
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
                            label:'Edit',
                            fn:function (model) { // TODO receber o elemento da row (caso delete)
                                Boiler.UrlController.goTo("contacts/" + ko.utils.unwrapObservable(model.id));
                            },
                            css:{
                                'btn-mini':true,
                                'btn-success':true
                            }
                        }

                    ]
                }),
                "contacts/{id}": contactComponent
            });
            controller.start();
        };

        return Module;

    });
