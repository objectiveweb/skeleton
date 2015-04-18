define(function(require) {

    // return the list of available modules
    return {
        "/": require("./base/module"),
        "/AdminLTE": require("./AdminLTE/module"),
		"/products": require("./products/module")
    };
});
