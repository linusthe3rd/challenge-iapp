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
        images: ko.observable({
            small: {
                imageUri: "assets/images/avatars/avatar-1.png",
                width: "38px",
                position: {
                    x: "-5px",
                    y: "-4px"
                }
            },
            large: {
                imageUri: "assets/images/avatars/avatar-1.png",
                width: "95px",
                position: {
                    x: "-6px",
                    y: "-5px"
                }
            }
        }),
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