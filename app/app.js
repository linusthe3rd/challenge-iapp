require([
    'knockout',

    'app/appView',
    'app/routes',

    // Dependencies that don't need an argument for the module
    'ko.amdHelpers',

    'components/dropdown/dropdown-binding',
    'components/flipswitch/flipswitch-binding',
    'components/masonry/masonry-binding',
    'components/masonry/masonry-reload-binding',
    'components/modal/modal-binding',
    'components/placeholder/placeholder-binding',
], function (
    ko,

    appView,
    routes
) {
    'use strict';

    function startup() {
        // Configure knockout's AMD plugin to define where to look
        // for external templates
        ko.amdTemplateEngine.defaultPath = "";

        // Start the app
        ko.applyBindings(appView);
        routes.run();
    }

    startup();
});