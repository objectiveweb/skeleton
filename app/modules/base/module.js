define(['Boiler', './landingPage/component', './mainMenu/component'],
    function (Boiler, LandingPageComponent, MainMenuComponent) {

        var Module = {
            initialize: function (context) {
    
                var menuComponent = new MainMenuComponent(context);
    
                // Activate the menuComponent on the '.main-menu' element
                menuComponent.activate($('.main-menu'));
    
                //the landing page should respond to the root URL, so let's use an URLController too
                return {
                    "/":new LandingPageComponent(context)
                };
            }
        };

        return Module;

    });
