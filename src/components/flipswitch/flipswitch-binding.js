define([
    'knockout',
    'jquery'
], function (
    ko,
    $
) {
    'use strict';

    var IS_ON_STATE_CLASS = "is-on";
    var IS_ANIMATING_STATE_CLASS = "is-animating";
    var EVENT_NAMESPACE = ".flipswitch-event";

    var configureFlipswitchRoot = function ($element, isOn) {
        // ensure that the root class is on the element
        $element.addClass("flipswitch");

        // ensure that the root element receives keyboard focus
        $element.attr("tabindex", "0");

        // Set the correct state of the widget according to the
        // provided value.
        if (ko.unwrap(isOn)) {
            $element.addClass(IS_ON_STATE_CLASS);
        } else {
            $element.removeClass(IS_ON_STATE_CLASS);
        }
    };

    // The valueAccessor argument needs to be a function in order to work w/
    // calling other bindings.
    var flipswitchViewModelAccessor = function () {
        return {
            name: 'components/modal/FlipswitchBindingViewModel',
            template: 'components/flipswitch/flipswitch'
        };
    };

    /**
     * Create a flipswitch widget that will toggle between two states according to
     * the observable boolean passed in as an argument.
     *
     * # Example Markup
     *
     * <div data-bind="flipswitch: myObservableBoolean"></div>
     *
     * # Arguments
     *
     * @param {Observable Boolean} isOn - An observable function that will toggle the flipswitch
     *  between its two states. If "true" is provided, the flipswitch will be in an "on" state.
     *  If "false", the flipswitch will be in its off state.
     */
    ko.bindingHandlers.flipswitch = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $flipswitchContainer = $(element);
            var isOn = valueAccessor();

            configureFlipswitchRoot($flipswitchContainer, isOn);

            //
            // Render the flipswitch template
            //

            // Create an AMD module since the module binding (which handles the loading of external templates)
            // needs to load a module in order to then load an external template. This is fairly kludgy, but is
            // the only way to compose the module binding in this custom binding. This isn't great and I have
            // opened the following feature request to improve this:
            //
            // https://github.com/rniemeyer/knockout-amd-helpers/issues/26
            //
            define('components/modal/FlipswitchBindingViewModel', [], function () {
                return bindingContext.$data;
            });

            ko.bindingHandlers.module.init(element, flipswitchViewModelAccessor, allBindings, viewModel, bindingContext);

            //
            // Event Handling
            //

            $flipswitchContainer.on('click' + EVENT_NAMESPACE, function () {
                // Do not trigger animations until the user interacts with the element
                $flipswitchContainer.addClass(IS_ANIMATING_STATE_CLASS);

                // Focus the root element, even if the inner button was the target and got focus
                $flipswitchContainer.focus();

                // Toggle the state of the observable.
                isOn(!isOn());

                // Trigger the change event to ensure that other bindings see that the
                // element's value has changed.
                ko.utils.triggerEvent(element, "change");
            });

            //
            // Cleanup
            //

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $flipswitchContainer.off(EVENT_NAMESPACE);
            });
        },
        update: function (element, valueAccessor) {
            var $flipswitchContainer = $(element);
            var isOn = ko.unwrap(valueAccessor());

            if (isOn) {
                $flipswitchContainer.addClass(IS_ON_STATE_CLASS);
            } else {
                $flipswitchContainer.removeClass(IS_ON_STATE_CLASS);
            }
        }
    };
});