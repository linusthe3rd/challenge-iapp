define([
    'knockout'
], function (
    ko
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "app/home/home";

        self.selectedLayout = ko.observable("l-list");

        self.selectedFilter = ko.observable("all");

        //
        // Event Callbacks
        //

        self.displayAllPosts = function () {
            self.selectedFilter("all");
        };

        self.displayPhotoPosts = function () {
            self.selectedFilter("photos");
        };

        self.displayVideoPosts = function () {
            self.selectedFilter("videos");
        };
    };
});