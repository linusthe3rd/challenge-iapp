define([
    'sammy',

    'app/appView'
], function (
    sammy,

    appView
) {
    'use strict';

    var routes = sammy(function () {
        var self = this;

        /**
         * Sammy doesn't play particularly nice with Knockout with regards to processing forms.
         *
         * REFERENCE: http://stackoverflow.com/questions/14861461/weird-redirect-using-data-bind-submit-sammy-js-and-knockout-js-together
         */
        self._checkFormSubmission = function () {
            return (false);
        };

        self.get('#/home', function () {
            require(['app/home/HomeView'], function (HomeView) {
                appView.currentView(new HomeView());
            });
        });

        self.get('#/settings', function () {
            require(['app/settings/SettingsView'], function (SettingsView) {
                appView.currentView(new SettingsView());
            });
        });

        self.get('', function () {
            window.location.replace('#/home');
        });
    });

    return routes;
});