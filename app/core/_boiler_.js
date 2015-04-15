define(function (require) {

    /**
    * Here we define the frequently accessed core classes of boilerplatejs. We are creating a object
 	* that carry these classes as properties of it. This object is then used as a namespace when 
 	* accessing the core classes. This is a trick we use to aggregate classes under namespaces 
 	* since javascript has no formal way of grouping functions in to namespace.
    
    * Here you will notice we are not returning a function from this AMD module. We are returning a 
    * plain javascript object with its properties holding references to core classes (functions).
    * We use 'require' function from requirejs inside the object to load appropriate core classes
    * from the respective AMD modules.
	
	@namespace Boiler
	@module BoilerCoreClasses
	@main BoilerCoreClasses
	**/
    var Boiler = {
        Context : require("./core/context"),
        DomController : require("./core/dom-controller"),
        UrlController : require("./core/url-controller"),
        ViewTemplate: require("./core/view-template"),
        Helpers : require ("./core/helpers/_helpers_"),
        bootstrap: function(selector, modules) {
            /* In JavaScript, functions can be used similarly to classes in OO programming. Below,
             * we create an instance of 'Boiler.Context' by calling the 'new' operator. Then add
             * global settings. These will be propagated to child contexts
             */
            var globalContext = new Boiler.Context();

            var controller = new Boiler.UrlController($(selector)),
                routes = {};


            $.each(modules, function(root, module) {

                $.each(module, function(i, Module) {

                    /* In BoilerplateJS, your product module hierachy is associated to a 'Context' hierarchy. Below
                     * we create the global 'Context' and load child contexts (representing your product sub modules)
                     * to create a 'Context' tree (product modules as a tree).
                     */
                    if(typeof(Module) == 'function') {
                        var context = new Boiler.Context(globalContext),
                            paths = new Module(context);

                        if(undefined !== paths) {
                            $.each(paths, function(j, e) {
                                routes[(root == '/' ? '' : root)
                                + (i !== '/' ? (i.charAt(0) == '/' ? i: '/' + i) : '')
                                + (j !== '/' ? (j.charAt(0) == '/' ? j: '/' + j) : '')] = e;
                            });
                        }
                    }
                    else {
                        routes[(root == '/' ? '' : root)
                        + (i !== '/' ? (i.charAt(0) == '/' ? i: '/' + i) : '')] = Module;
                    }
                });

            });

            controller.addRoutes(routes);
            controller.start();
        }
    };

    return Boiler;
});
