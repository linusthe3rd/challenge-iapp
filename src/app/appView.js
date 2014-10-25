define([
    'knockout'
], function (
    ko
) {
    'use strict';

    var AppView = function () {
        var self = this;

        self.currentView = ko.observable();
    };

    // Create a singleton of AppView since it is the root view of the application
    var appView = new AppView();

    return appView;
});