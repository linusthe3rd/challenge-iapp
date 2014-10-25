define([
    'knockout'
], function (
    ko
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "app/settings/settings";

        self.taco = ko.observable("settings");
    };
});