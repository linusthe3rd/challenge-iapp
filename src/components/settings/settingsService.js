define([
    'knockout',
    'lodash',
    'bluebird'
], function (
    ko,
    _,
    Promise
) {
    'use strict';

    var mockSettings = {
        isFavoriteNotificationOn: ko.observable(false),
        isMentionNotificationOn:  ko.observable(true),
        isReplyNotificationOn:    ko.observable(false),
        isFollowNotificationOn:   ko.observable(true),
        whoCanTagMe:              ko.observable("anyone"),
        addLocationToPosts:       ko.observable(true),
        canFindByEmail:           ko.observable(false),
        shouldDisplayPersonalAds: ko.observable(true)
    };

    var settingsService = {
        getSettings: function () {
            return Promise.resolve(mockSettings);
        },

        updateSettings: function (attributes) {
            _.forIn(ko.unwrap(attributes), function (value, key) {
                mockSettings[key](ko.unwrap(value));
            });

            return Promise.resolve(mockSettings);
        }
    };

    return settingsService;
});