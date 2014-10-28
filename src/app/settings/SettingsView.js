define([
    'knockout'
], function (
    ko
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "app/settings/settings";

        self.isFavoriteNotificationOn = ko.observable(true);
        self.isMentionNotificationOn = ko.observable(true);
        self.isReplyNotificationOn = ko.observable(true);
        self.isFollowNotificationOn = ko.observable(true);
    };
});