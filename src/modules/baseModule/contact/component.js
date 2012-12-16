define(['Boiler', './viewmodel', 'text!./view.html'], function(Boiler, ViewModel, template) {

    var Contact = metaproject.Model({
        id: null,
        name: null,
        email: null
    });


    Contact.prototype.incluirAnimal = function(animal) {
        this.animais.push(new Animal(animal));
    };

	var Component = function(moduleContext) {

		var vm, panel = null, context = new Boiler.Context(moduleContext);

        this.dataSource = new metaproject.DataSource('../objectiveweb/index.php/contact', { model: Contact });

        context.ds = this.dataSource;

		this.activate = function(parent, params) {
			if (!panel) {
				panel = new Boiler.ViewTemplate(parent, template, null);
				vm = new ViewModel(context);
				ko.applyBindings(vm, panel.getDomElement());
			}

            vm.load(params.id);
			panel.show();
			
		}

		this.deactivate = function() {
			if(panel) {
				panel.hide();
			}
			
		}

	};

	return Component;

}); 