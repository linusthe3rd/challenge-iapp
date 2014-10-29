define([
    'knockout',

    'components/posts/postsService'
], function (
    ko,

    postsService
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "app/home/home";

        self.isLoading = ko.observable(false);

        self.selectedLayout = ko.observable("l-list");

        self.selectedFilter = ko.observable("all");

        self.posts = ko.observableArray();

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

        //
        // Anonymous Computeds
        //

        ko.computed(function () {
            // As the user changes the selected filter, we need to
            // reload the posts that are displayed with the selected filter.

            self.isLoading(true);

            postsService.getPosts(self.selectedFilter())
                .then(function (response) {
                    self.posts(response);
                })
                .finally(function () {
                    self.isLoading(false);
                });
        });
    };
});