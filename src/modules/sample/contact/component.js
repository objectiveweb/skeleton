define(['Boiler', '../models', './viewmodel', 'text!./view.html'], function(Boiler, models, ViewModel, template) {

    var ds = new metaproject.DataSource('../objectiveweb/index.php/contact', { model: models.Contact });

	var Component = function(moduleContext) {

		var vm, panel = null, context = new Boiler.Context(moduleContext);

        context.ds = this.dataSource = ds;

		this.activate = function(parent, params) {
			if (!panel) {
				panel = new Boiler.ViewTemplate(parent, template, null);
				vm = new ViewModel(context);
				ko.applyBindings(vm, panel.getDomElement());
			}

            vm.load(params.id);
			panel.show();
			
		};

		this.deactivate = function() {
			if(panel) {
				panel.hide();
			}
			
		}

	};

	return Component;

}); 