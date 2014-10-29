define([
    'lodash',
    'knockout'
], function (
    _,
    ko
) {
    'use strict';

    var Post = function (data) {
        var self = this;

        self.data = ko.observable(data);

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

        self.hasReplies = ko.computed(function () {
            return _.has(self.data(), "replies");
        });

        self.hasMedia = ko.computed(function () {
            return _.has(self.data(), "media");
        });

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