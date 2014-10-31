define([
    'jquery',
    'lodash',
    'knockout'
], function (
    $,
    _,
    ko
) {
    'use strict';

    var L_GRID_CLASS = ".l-grid";
    var DOM_DATA_KEY = "masonry-binding-instance";

    var getMasonryInstance = function (element) {
        if (!element) {
            return undefined;
        }

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
            ko.unwrap(valueAccessor());

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                var $parentNode = $(element).closest(L_GRID_CLASS);

                // Wait until the main thread has completed its work before we
                // reset the layout. This ensures that masonry executes its layout
                // after the attached element has been completely removed from the
                // page.
                setTimeout(function () {
                    layoutMasonry($parentNode);
                }, 0);
            });
        },
        update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            ko.unwrap(valueAccessor());

            if (_.has(bindingContext.$parent, "isGridLayout")) {
                ko.unwrap(bindingContext.$parent.isGridLayout());
            }


            var $parentNode = $(element).closest(L_GRID_CLASS);

            if ($parentNode.length === 0) {
                return;
            }

            layoutMasonry($parentNode);
        }
    };
});