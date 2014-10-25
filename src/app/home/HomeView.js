define([
    'knockout'
], function (
    ko
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "test";

        self.taco = ko.observable("chalupa home");
    };
});