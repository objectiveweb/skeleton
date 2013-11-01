(function() {

    'use strict'; // avoid accidental global variable declarations

    /*
     * Let's define short alias for commonly used AMD libraries and name-spaces. Using
     * these alias, we do not need to specify lengthy paths, when referring a child
     * files. We will 'import' these scripts, using the alias, later in our application.
     */
    require.config({
        paths : {
            // requirejs plugins in use
            text : '../../objectiveweb/console/libs/require/text',
            order : '../../objectiveweb/console/libs/require/order',
            i18n : '../../objectiveweb/console/libs/require/i18n',
            domReady : '../../objectiveweb/console/libs/require/domReady',
            path :  '../../objectiveweb/console/libs/require/path',
            objectiveweb: '../../objectiveweb',
            // namespace that aggregate core classes that are in frequent use
            Boiler : './core/_boiler_'
        }
    });


    define(function(require) {
        var domReady = require("domReady"), // requirejs domReady plugin to know when DOM is ready
            Boiler = require("Boiler"), // BoilerplateJS namespace used to access core classes, see above for the definition
            settings = require("./settings"), //global settings file of the product suite
            modules = [
                require('./modules/base/module'),
                require('./modules/addressbook/module')
            ];
            
        /*
         * This is the main entry to the application.
         * This script is called from the main HTML file.
         * 
         * We use requirejs for writing modular JavaScript. The 'require' function below
         * behaves just like 'import' in PHP or 'using' in .NET. You may define the
         * relative path to the script you wish to import in the first array parameter,
         * then requirejs will invoke the callback function (given in second param) with
         * the return values of those scripts.
         * 
         * Here we use the requirejs domReady plugin to run our code, once the DOM is ready to be used.
         */    
        domReady(function() {
		    /* In JavaScript, functions can be used similarly to classes in OO programming. Below,
             * we create an instance of 'Boiler.Context' by calling the 'new' operator. Then add
             * global settings. These will be propagated to child contexts
             */
            var globalContext = new Boiler.Context();
            globalContext.addSettings(settings);

            /* In BoilerplateJS, your product module hierachy is associated to a 'Context' hierarchy. Below
             * we create the global 'Context' and load child contexts (representing your product sub modules)
             * to create a 'Context' tree (product modules as a tree).
             */
            for (var i = 0; i < modules.length; i++) {

                var context = new Boiler.Context(globalContext),
                    routes = modules[i].initialize(context);

                if(undefined !== routes) {
                    var controller = new Boiler.UrlController($(".appcontent"));

                    controller.addRoutes(routes);
                    controller.start();
                }
            }

            /**
             * Handle all ajax errors
             */
            $(document).ajaxError(function(event, jqXHR, settings) {
                if(jqXHR.status !== 401) {
                    alert(jqXHR.responseText);
                }
            });
        });
    });
})();