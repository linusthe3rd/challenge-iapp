define([
    'lodash',
    'knockout'
], function (
    _,
    ko
) {
    'use strict';

    var PostView = function (postModel) {
        // ===============================================================================
        // Private Attributes
        // ===============================================================================

        var self = this;

        var isDisplayingReplies = ko.observable(false);

        // ===============================================================================
        // Public Attributes
        // ===============================================================================

        self.isDisplayingCreateNewReply = ko.observable(false);

        self.postModel = ko.observable(postModel);

        self.isDisplayingReplies = ko.computed(function () {
            return self.postModel().hasReplies() && isDisplayingReplies();
        });

        self.replyPostViews = ko.computed(function () {
            // Look at the replies attached to the Post instance and convert them into
            // PostView instances so they can be rendered easily.
            if (self.postModel().hasReplies()) {
                return _.map(self.postModel().replyPosts(), function (post) {
                    return new PostView(post);
                });
            }

            return [];
        });

        // ===============================================================================
        // Event Callbacks
        // ===============================================================================

        self.toggleReplies = function () {
            isDisplayingReplies(!isDisplayingReplies());
            self.isDisplayingCreateNewReply(!self.isDisplayingCreateNewReply());
        };
    };

    return PostView;
});