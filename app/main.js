/*global define: true, require: true, $: true, hasher: true */
(function () {
    "use strict"; // avoid accidental global variable declarations

    /*
     * Let's define short alias for commonly used AMD libraries and name-spaces. Using
     * these alias, we do not need to specify lengthy paths, when referring a child
     * files. We will 'import' these scripts, using the alias, later in our application.
     */
    require.config({
        paths: {
            // requirejs plugins in use
            text: './assets/requirejs-text/text',
            //order: './core/require/order',
            //i18n: './core/require/i18n',
            domReady: './assets/requirejs-domready/domReady',
            path: './core/require/path',
            // BoilerplateJS namespace used to access core classes
            Boiler: './core/_boiler_',
            metaproject: './assets/metaproject/'  + 'components'
        }
    });


    define(function (require) {

        /*
         * Let's import all dependencies as variables of this script file.
         *
         * Note: when we define the variables, we use PascalCase for namespaces ('Boiler' in the case) and classes,
         * whereas object instances ('settings' and 'modules') are represented with camelCase variable names.
         */
        var domReady = require("domReady"), // requirejs domReady plugin to know when DOM is ready
            Boiler = require("Boiler"),
            modules = {
                "/": require('./modules/index')
            };

        // register all metaproject components
        require('./assets/metaproject/components/index');

        //Here we use the requirejs domReady plugin to run our code, once the DOM is ready to be used.
        domReady(function () {

            $(document).ajaxError(function(event, jqXHR, settings) {
                if(jqXHR.status !== 401) {
                    alert(jqXHR.responseText);
                }
            });

            Boiler.bootstrap(".appcontent", modules);

        });
    });
}());