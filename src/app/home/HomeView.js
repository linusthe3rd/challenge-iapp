define([
    'knockout'
], function (
    ko
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "app/home/home";

        self.taco = ko.observable("chalupa home");
    };
});