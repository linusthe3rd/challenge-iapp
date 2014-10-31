define([
    'knockout',
    'jquery',

    'vendor/js/masonry'
], function (
    ko,
    $,
    Masonry
) {
    'use strict';

    var GRID_LAYOUT_CLASS = "l-grid";
    var DOM_DATA_KEY = "masonry-binding-instance";

    var saveMasonryInstance = function (element, masonry) {
        ko.utils.domData.set(element, DOM_DATA_KEY, masonry);
    };

    var getMasonryInstance = function (element) {
        return ko.utils.domData.get(element, DOM_DATA_KEY);
    };

    var destroyMasonryInstance = function (element) {
        var masonryInstance = getMasonryInstance(element);

        if (masonryInstance) {
            masonryInstance.destroy();

            saveMasonryInstance(element, null);
        }
    };

    /**
     *
     *
     */
    ko.bindingHandlers.masonry = {
        init: function (element) {
            //
            // Clean up
            //

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                destroyMasonryInstance(element);
                saveMasonryInstance(element, null);
            });
        },
        update: function (element, valueAccessor) {
            var bindingData = ko.unwrap(valueAccessor());
            var isActive = ko.unwrap(bindingData.isActive);
            var options = ko.unwrap(bindingData.options);

            if (isActive) {
                $(element).addClass(GRID_LAYOUT_CLASS);

                var existingMasonryInstance = getMasonryInstance(element);

                if (!existingMasonryInstance) {
                    var newMasonry = new Masonry(element, options);

                    saveMasonryInstance(element, newMasonry);
                }
            } else if (!isActive) {
                $(element).removeClass(GRID_LAYOUT_CLASS);
                destroyMasonryInstance(element);
            }
        }
    };
});