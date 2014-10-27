define([
    'knockout',
    'jquery'
], function (
    ko,
    $
) {
    'use strict';

    var EVENT_NAMESPACE = ".dropdown-event";
    var IS_OPEN_DOMDATA_KEY = "dropdown-isopen";

    ko.bindingHandlers.dropdown = {
        init: function (element) {
            var $dropdown = $(element);

            // normally we would respond to an observable's value on a view model, but we don't need that
            // for the dropdown because we don't have a use case to control the open/close state from a
            // view model. Instead, we will create one here and save it to the DOM node to track the open state
            // of the dropdown.
            var isOpen = ko.observable(false);
            ko.utils.domData.set(element, IS_OPEN_DOMDATA_KEY, isOpen);

            $dropdown.addClass('dropdown');

            $dropdown.on('click' + EVENT_NAMESPACE, function () {
                isOpen(!isOpen());
            });

            //Clean up the binding handler when the element is removed from the DOM.
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $dropdown.off(EVENT_NAMESPACE);
            });
        },

        update: function (element) {
            var $dropdown = $(element);
            var isOpen = ko.utils.domData.get(element, IS_OPEN_DOMDATA_KEY);

            if (isOpen()) {
                $dropdown.addClass('open');
            } else {
                $dropdown.removeClass('open');
            }
        }
    };
});