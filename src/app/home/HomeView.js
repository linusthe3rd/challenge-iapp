define([
    'knockout',
    'lodash',

    'components/posts/PostView',
    'components/posts/postsService'
], function (
    ko,
    _,

    PostView,
    postsService
) {
    'use strict';

    return function () {
        var self = this;

        // ===============================================================================
        // Public Attributes
        // ===============================================================================

        // Used to tell AppView which template to load
        self.template = "app/home/home";

        self.isLoading = ko.observable(false);

        self.selectedFilter = ko.observable("all");

        self.selectedLayout = ko.observable("l-list");

        self.postViews = ko.observableArray();

        self.isGridLayout = ko.computed(function () {
            return self.selectedLayout() === "l-grid";
        });

        // ===============================================================================
        // Event Callbacks
        // ===============================================================================

        self.displayAllPosts = function () {
            self.selectedFilter("all");
        };

        self.displayPhotoPosts = function () {
            self.selectedFilter("photos");
        };

        self.displayVideoPosts = function () {
            self.selectedFilter("videos");
        };

        self.displayListLayout = function () {
            self.selectedLayout("l-list");
        };

        self.displayGridLayout = function () {
            self.selectedLayout("l-grid");
        };

        // ===============================================================================
        // Anonymous Computeds
        // ===============================================================================

        ko.computed(function () {
            // As the user changes the selected filter, we need to
            // reload the posts that are displayed with the selected filter.

            self.isLoading(true);

            postsService.getPosts(self.selectedFilter())
                .then(function (reponsePosts) {
                    var postViews = _.map(reponsePosts, function (postModel) {
                        return new PostView(postModel);
                    });

                    self.postViews(postViews);
                })
                .finally(function () {
                    self.isLoading(false);
                });
        });
    };
});