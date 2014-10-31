define([
    'knockout',
    'jquery',

    'vendor/js/jquery.placeholder'
], function (
    ko,
    $
) {
    'use strict';

    /**
     * Ensure that all input and textarea nodes that is a child of the provided
     * element supports the placeholder attribute. Placeholder text can be styled
     * by using the ".placeholder" class for older browsers or the .placeholder()
     * mixin for modern ones.
     *
     */
    ko.bindingHandlers.placeholder = {
        init: function (element) {
            $("input, textarea", element).placeholder();
        }
    };
});