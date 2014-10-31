define([
    'lodash',
    'knockout',

    'components/posts/postsService',
    'components/user/userService'
], function (
    _,
    ko,

    postsService,
    userService
) {
    'use strict';

    var AppView = function () {
        var self = this;

        self.user = userService.currentUser;

        self.currentView = ko.observable();

        self.newPostContent = ko.observable();

        self.createPost = function () {
            postsService.createPost({
                user: {
                    id: self.user().id,
                    name: self.user().name(),
                    images: self.user().images(),
                },
                content: {
                    body: self.newPostContent()
                }
            }).then(function () {
                self.newPostContent("");
            }).finally(function () {
                if (_.has(self.currentView(), "refresh")) {
                    self.currentView().refresh();
                }
            });
        };
    };

    // Create a singleton of AppView since it is the root view of the application
    var appView = new AppView();

    return appView;
});