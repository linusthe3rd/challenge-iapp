require([
    'knockout',

    'app/appView',
    'app/routes'
], function (
    ko,

    appView,
    routes
) {
    'use strict';

    function startup() {
        ko.applyBindings(appView);
        routes.run();
    }

    startup();
});