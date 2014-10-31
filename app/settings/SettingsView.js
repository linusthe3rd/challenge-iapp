define([
    'knockout',
    'bluebird',

    'components/user/userService',
    'components/settings/settingsService'
], function (
    ko,
    Promise,

    userService,
    settingsService
) {
    'use strict';

    return function () {
        var self = this;

        self.template = "app/settings/settings";

        self.isLoading = ko.observable(true);
        self.isSaving = ko.observable(false);

        self.user = userService.currentUser;
        self.settings = ko.observable();

        self.saveSettings = function () {
            if (!self.isSaving()) {
                self.isSaving(true);


                Promise.all([
                    userService.updateUser(userService.currentUser().id, self.user()),
                    settingsService.updateSettings(self.settings())
                ]).finally(function () {
                    self.isSaving(false);
                });
            }
        };

        //
        // Initialization
        //

        settingsService.getSettings()
            .then(function (responseObj) {
                self.settings(responseObj);
            })
            .finally(function () {
                self.isLoading(false);
            });
    };
});