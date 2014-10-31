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
        // ===============================================================================
        // Private Attributes
        // ===============================================================================

        var self = this;

        // var postViewCollection = ko.observableArray();

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
        // Private Methods
        // ===============================================================================

        var setMediaSizeOnPostViews = function () {
            var size = "medium";

            // Utilize peek to prevent a subscription from being created in a computed.
            if (self.selectedLayout.peek() === "l-grid") {
                size = "small";
            }

            _.each(self.postViews(), function (view) {
                view.mediaSize(size);
            });
        };

        var loadPostsForFilter = function (filter) {
            self.isLoading(true);

            postsService.getPosts(filter)
                .then(function (reponsePosts) {
                    var postViews = _.map(reponsePosts, function (postModel) {
                        return new PostView(postModel);
                    });

                    self.postViews(postViews);

                    setMediaSizeOnPostViews();
                })
                .finally(function () {
                    self.isLoading(false);
                });
        };

        // ===============================================================================
        // Event Callbacks
        // ===============================================================================

        self.refresh = function () {
            loadPostsForFilter(self.selectedFilter());
        };

        self.displayAllPosts = function () {
            self.selectedFilter("all");
        };

        self.displayPhotoPosts = function () {
            self.selectedFilter("image");
        };

        self.displayVideoPosts = function () {
            self.selectedFilter("video");
        };

        self.displayListLayout = function () {
            self.selectedLayout("l-list");
            setMediaSizeOnPostViews();
        };

        self.displayGridLayout = function () {
            self.selectedLayout("l-grid");
            setMediaSizeOnPostViews();
        };

        // ===============================================================================
        // Anonymous Computeds
        // ===============================================================================

        ko.computed(function () {
            // As the user changes the selected filter, we need to
            // reload the posts that are displayed with the selected filter.
            loadPostsForFilter(self.selectedFilter());
        });
    };
});