define([
    'knockout',
    'jquery',
    'lodash'
], function (
    ko,
    $,
    _
) {
    'use strict';

    var IS_OPEN_DOMDATA_KEY = "dropdown-isopen";

    ko.bindingHandlers.dropdown = {
        init: function (element) {
            var $dropdown = $(element);
            var EVENT_NAMESPACE = _.uniqueId(".dropdown-event");

            // normally we would respond to an observable's value on a view model, but we don't need that
            // for the dropdown because we don't have a use case to control the open/close state from a
            // view model. Instead, we will create one here and save it to the DOM node to track the open state
            // of the dropdown.
            var isOpen = ko.observable(false);
            ko.utils.domData.set(element, IS_OPEN_DOMDATA_KEY, isOpen);

            $dropdown.addClass('dropdown');

            $('body').on('click' + EVENT_NAMESPACE, function (event) {
                if ($(event.target).closest($dropdown).length === 0) {
                    // Hide the dropdown if the user clicks anywhere outside of it
                    isOpen(false);
                } else {
                    // If the user clicks anywhere within the dropdown element, toggle its
                    // display
                    isOpen(!isOpen());
                }
            });

            //Clean up the binding handler when the element is removed from the DOM.
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $('body').off(EVENT_NAMESPACE);
            });
        },

        update: function (element) {
            var $dropdown = $(element);
            var isOpen = ko.utils.domData.get(element, IS_OPEN_DOMDATA_KEY);

            if (isOpen()) {
                $dropdown.addClass('is-open');
            } else {
                $dropdown.removeClass('is-open');
            }
        }
    };
});