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

    var mockUser = {
        id:       "1",
        name:     ko.observable("Jessica Tuan"),
        email:    ko.observable("jessica@mail.com"),
        imageUri: ko.observable("assets/images/avatar-1.png"),
        password: ko.observable("chalupa batman")
    };

    var userService = {
        currentUser: ko.observable(mockUser),

        getUser: function (id) {
            if (id === "1") {
                return Promise.resolve(mockUser);
            }

            return Promise.reject(); // user not found
        },

        updateUser: function (id, attributes) {
            if (id === "1") {
                _.forIn(ko.unwrap(attributes), function (value, key) {
                    if (key !== "id") {
                        mockUser[key](ko.unwrap(value));
                    }
                });

                return Promise.resolve(mockUser);
            }

            return Promise.reject(); // user not found
        }
    };

    return userService;
});