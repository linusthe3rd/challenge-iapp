require([
    'knockout',

    'app/appView',
    'app/routes',

    'ko.amdHelpers',
], function (
    ko,

    appView,
    routes
) {
    'use strict';

    function startup() {
        // Configure knockout's AMD plugin
        ko.amdTemplateEngine.defaultPath = "";

        // Start App
        ko.applyBindings(appView);
        routes.run();
    }

    startup();
});