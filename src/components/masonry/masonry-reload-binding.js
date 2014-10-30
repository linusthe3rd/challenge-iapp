define([
    'jquery',
    'knockout'
], function (
    $,
    ko
) {
    'use strict';

    var DOM_DATA_KEY = "masonry-binding-instance";

    var getMasonryInstance = function (element) {
        return ko.utils.domData.get(element, DOM_DATA_KEY);
    };

    var layoutMasonry = function ($parentNode) {
        var masonryObj = getMasonryInstance($parentNode[0]);

        if (masonryObj) {
            masonryObj.layout();
        }
    };

    /**
     *
     *
     */
    ko.bindingHandlers.masonryReload = {
        init: function (element, valueAccessor) {
            var bindingData = ko.unwrap(valueAccessor());
            ko.unwrap(bindingData.observable);
            var parentSelector = ko.unwrap(bindingData.parentSelector);
            var $parentNode = $(element).closest(parentSelector);

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                setTimeout(function () {
                    // Wait until the main thread has completed its work before we
                    // reset the layout. This ensures that masonry executes its layout
                    // after the attached element has been completely removed from the
                    // page.
                    layoutMasonry($parentNode);
                }, 0);
            });
        },
        update: function (element, valueAccessor) {
            var bindingData = ko.unwrap(valueAccessor());
            ko.unwrap(bindingData.observable);
            var parentSelector = ko.unwrap(bindingData.parentSelector);
            var $parentNode = $(element).closest(parentSelector);

            if ($parentNode.length === 0) {
                return;
            }

            layoutMasonry($parentNode);
        }
    };
});