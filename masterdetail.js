
/**
 * Lista documentos da URL, edita um por vez
 * @param url
 * @param ModelClass
 */
function MasterDetailController(url, ModelClass, settings) {

    var self = this;
    settings = $.extend({
        key: 'id',
        autoLoad: true
    }, settings);


    this.data = ko.observableArray();
    this.current = ko.observable(false);

    this.setCurrent = function(data) {
        if(undefined == data) {
            data = {};
        }


        self.current(self.model(data));
    };

    this.model = function(data) {
        var model = new ModelClass(data);
        model.save = self.save;
        model.close = self.close;

        return model;
    };

    this.create = function() {
        self.setCurrent({});
    };

    this.load = function (id, success, error) {
        $.ajax({
            url: url + '/' + id,
            success:function (data) {
                var model = new ModelClass(data);

                self.setCurrent(data);

                if(typeof(success) == 'function') {
                    success(model);
                }
            },
            error:function (e, text) {
                if(undefined != error) {
                    error(e.responseText);
                }
                else {
                    alert(e.responseText);
                }
            }
        });
    };


    this.save = function (model, success) {

        if(undefined == model) {
            model = self.current();
        }

        var id = ko.utils.unwrapObservable(model[settings.key]);

        if(id) {
            $.ajax({
                url: url + '/' + id,
                type: 'PUT',
                dataType: 'json',
                data:ko.toJSON(model),
                success:function (data) {
                    if(typeof(settings.onsave) == 'function') {
                        settings.onsave(data);
                    }
                },
                error:function (e, text) {
                    // TODO usar callbacks para error/success
                    alert(e.responseText);

                }
            });
        }
        else {
            $.ajax({
                url: url,
                dataType:'json',
                type:'POST',
                data:ko.toJSON(model),
                success:function (data) {
                    $.each(data, function(k, v) {
                        if(typeof(model[k]) == 'function') {
                            model[k](v);
                        }
                    });

                    if(typeof(settings.onsave) == 'function') {
                        settings.onsave(ko.toJS(model));
                    }

                },
                error:function (e, text) {
                    alert(e.responseText);
                }
            });
        }
    };

    this.close = function() {
        // TODO check if changed
        self.current(null);
    };

    // TODO incluir paginação
    this.refresh = function (success, error) {
        $.ajax({
            url: url,
            dataType:'json',
            success:function (data) {
                self.data(data);
                if(undefined != success) {
                    success(data);
                }
            },
            error:function (e, text) {
                if(undefined != error) {
                    error(e.responseText());
                }
                else {
                    alert(e.responseText);
                }
            }
        });
    };


    if(settings.autoLoad) {
        this.refresh();
    }
}