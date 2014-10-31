define([
    'lodash',
    'knockout',
    'moment'
], function (
    _,
    ko,
    moment
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

        self.mediaSize = ko.observable("medium");

        self.postModel = ko.observable(postModel);

        self.isDisplayingReplies = ko.computed(function () {
            return self.postModel().hasReplies() && isDisplayingReplies();
        });

        self.timeSincePostCreation = ko.computed(function () {
            var diff = moment().diff(self.postModel().data().createdDate, "minutes");

            if (diff >= 60) {
                return Math.floor(diff / 60) + "h";
            } else if (diff >= 1) {
                return diff + "m";
            } else {
                return "1m";
            }
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