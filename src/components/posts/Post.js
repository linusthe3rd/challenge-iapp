define([
    'lodash',
    'knockout'
], function (
    _,
    ko
) {
    'use strict';

    /**
     * The model object that represents a Post that has been recorded.
     *
     * @param {Object} data The data that represents a single post entry from the backend.
     */
    var Post = function (data) {
        var self = this;

        /**
         * The raw data of the post.
         */
        self.data = ko.observable(data);

        /**
         * A computed version of the post's content to inject HTML strings in places where
         * links to content should exist.
         *
         * @return {String} A string representing the content of the post and the HTML links
         *  in it.
         */
        self.htmlContent = ko.computed(function () {
            var content = self.data().content;
            var htmlContent = content.body;

            if (_.has(content, "links")) {
                _.each(content.links, function (url, key) {
                    var linkStr = '<a href="' + url + '">' + key + '</a>';
                    htmlContent = htmlContent.replace(key, linkStr, "gi");
                });
            }

            return htmlContent;
        });

        /**
         * Determines if this post instance has any media content associated with it.
         *
         * @return {Boolean}
         */
        self.hasMedia = ko.computed(function () {
            return _.has(self.data(), "media");
        });

        /**
         * Determines if this post instance has any reply posts associated with it.
         *
         * @return {Boolean}
         */
        self.hasReplies = ko.computed(function () {
            return _.has(self.data(), "replies");
        });

        /**
         * Get the collection of Post objects that are associated with this instance as
         * replies.
         *
         * @return {Post[]}
         */
        self.replyPosts = ko.computed(function () {
            if (self.hasReplies()) {
                return _.map(self.data().replies, function (replyObj) {
                    return new Post(replyObj);
                });
            }

        });


    };

    return Post;
});