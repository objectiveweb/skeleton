define(['Boiler'], function (Boiler) {


    var ViewModel = function (moduleContext) {

        var self = this;
        //Implement the viewmodel here
        self.model = ko.observable();

        self.incluirAnimal = function (form) {
            self.model().incluirAnimal({
                nome: form.nome.value,
                especie_id: form.especie_id.value
            });

            $('#incluir-animal').modal('hide');
        };

        self.close = function () {
            Boiler.UrlController.goTo("contacts");
        };

        self.load = function (id) {

            if (id > 0) {
                moduleContext.ds.get(id, self.model);
            }
            else {
                self.model(moduleContext.ds.create());
            }

        };


        self.del = function (vm, event) {

            if (event.currentTarget.dataset.confirm && !confirm(event.currentTarget.dataset.confirm)) {
                return;
            }

            moduleContext.ds.delete(self.model(), function () {
                if (event.currentTarget.dataset.close == "true") {
                    self.close();
                }
            });

        };


        self.save = function (vm, event) {
            moduleContext.ds.save(self.model(), function () {
                if (event.currentTarget.dataset.close == "true") {
                    self.close();
                }
            });
        };

    };

    return ViewModel;
});
