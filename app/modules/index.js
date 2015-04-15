define(function(require) {

    // app initialization
    require("./menu/module");

    // return the list of available modules
    return {
        "/": require("./base/module"),
        "/AdminLTE": require("./AdminLTE/module")
    };
});