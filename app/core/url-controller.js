define(function (require) {

    var ViewTemplate = require('./view-template');

	/**
	 URL controller is used to trigger events when there is a url change

	 @namespace Boiler
	 @module BoilerCoreClasses
	 @class UrlController
	 @constructor
	 @param scope {Object} jQuery element to which the routed components get attached to
	 **/
	var UrlController = function(scope) {

		/**
		 @private
		 @property {Object} 'router' Holds an instance of crossroads router
		 **/
		var router = crossroads.create();
		router.normalizeFn = crossroads.NORM_AS_OBJECT;


		/**
		 * Wrapper for handles. This allows us to intercept activation calls so
		 * that we are able to execute custom logic such as deactivation of
		 * other handles.

		 @method Wrapper
		 @private
		 @param {Object} handle route-handler class
		 **/
		function Wrapper(handle) {

            var self = this;

            self.handle = handle;
            self.viewTemplate = undefined;

			this.activate = function(vals) {

                scope.one('DEACTIVATE_HANDLERS', self.deactivate);

                // load template if present
                if(undefined !== self.handle.template) {
                    if(undefined === self.viewTemplate) {
                        // TODO support i18n
                        self.viewTemplate = new ViewTemplate(scope, self.handle.template, null);

                        // bind viewModel if present
                        if(undefined !== self.handle.viewModel) {
                            var vm = self.handle.viewModel;
                            if(typeof(vm) === "function" ) {
                                vm = new vm(vals);
                            }

                            ko.applyBindings(vm, self.viewTemplate.getDomElement());
                        }

                    }

                    self.viewTemplate.show();

                }

                if(typeof(self.handle.activate) === 'function') {
                    // activate the requested handler
                    self.handle.activate(scope, vals);
                }
			};

            this.deactivate = function() {

                if(typeof(self.handle.deactivate) === 'function') {
                    // deactivate the requested handler
                    self.handle.deactivate();
                }

                if(undefined !== self.viewTemplate) {
                    self.viewTemplate.hide();
                }

            }

		}

		return {
			/**
			 Create handler objects from each route handler using the 'Wrapper' method and add the activated handler object to the router as routes

			 @method addRoutes
			 @param {Array} handles route-handler object array
			 **/
			addRoutes : function(handles) {
				for (path in handles) {
					if (handles.hasOwnProperty(path)) {
						var handlerObj = new Wrapper(handles[path]);
						router.addRoute(path, handlerObj.activate);
					}
				}
			},

			/**
			 Initializes the router by parsing initial hash, parsing hash changes and initializing the hasher

			 @method init
			 **/
			start : function() {

				function parseHash(newHash, oldHash) {
					// deactivate all active handles in current controller
					scope.trigger('DEACTIVATE_HANDLERS');
					router.resetState();
					router.parse(newHash);
				}
				hasher.initialized.add(parseHash);// parse initial hash
				hasher.changed.add(parseHash);// parse hash changes

				if (!hasher.isActive()) {
					hasher.init(); // start listening for history change
				}
			}
		};

	};

	/**
	 Adds a new path to the router

	 @method goTo
	 @param {String} newPath New path
	 **/
	UrlController.goTo = function(newPath) {
		hasher.setHash(newPath);
	};

    /**
     * Go up one level in the hash hierarchy
     */
    UrlController.up = function() {
        var path = window.location.hash.match(/(.*)\/[^/]+/);

        if(path) {
            hasher.setHash(path[1].substr(2));
        }
    };

	return UrlController;
});
