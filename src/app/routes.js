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