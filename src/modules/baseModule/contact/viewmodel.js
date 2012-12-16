define(['Boiler'], function(Boiler) {


	var ViewModel = function(moduleContext) {

        var self = this;
		//Implement the viewmodel here
        self.model = ko.observable();

        self.incluirAnimal = function(form) {
            self.model().incluirAnimal({
                nome: form.nome.value,
                especie_id: form.especie_id.value
            });

            $('#incluir-animal').modal('hide');
        };

        self.close = function() {
            Boiler.UrlController.goTo("contacts");
        };

        self.load = function(id) {

            if(id > 0) {
                moduleContext.ds.get(id, self.model);
            }
            else {
                self.model(moduleContext.ds.create());
            }

        };


        self.save = function() {
            moduleContext.ds.save(self.model(), self.close);
        };

	};

	return ViewModel;
});
