define([
    'knockout',
    'jquery',

    'vendor/js/blur'
], function (
    ko,
    $
) {
    'use strict';

    var IS_MODAL_SHOWN_STATE_CLASS = "is-modal-shown";
    var EVENT_NAMESPACE = ".modal-event";

    /**
     * Display the contents of the provided template in a modal window in the app. In order to use this binding
     * handler, a child element of the node this binding is attached to will require to have a class of
     * "modal-toggle". This child element will be used as the interactive element to display the modal window.
     *
     * # Example Markup
     *
     * <div data-bind="modal: 'path/to/templateName'">
     *     <button class="modal-toggle">Show Modal</button>
     * </div>
     *
     * # Arguments
     *
     * @param {String|Object} bindingData - If a string is provided, it will be used a the name of the template
     *  to display as the contents of the modal window. If an object is provided, it will require the following
     *  attributes:
     *
     *      * {String} name: The name of the template to use for the modal's contents.
     *      * {Object} data: The object to use as the binding context of the template.
     */
    ko.bindingHandlers.modal = {
        init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
            var $element = $(element);
            var bindingData = ko.unwrap(valueAccessor());

            //
            // Render the modal window
            //

            // append area where the modal will display since Knockout's template binding will overwrite
            // the contents of a node with the template. Instead of changing the contents of the root element,
            // we want to append the content to the end of it.
            var modalContainerNode = $("<div/>", {"class": "modal-wrapper"}).appendTo($element)[0];

            // Create an AMD module since the module binding (which handles the loading of external templates)
            // needs to load a module in order to then load an external template. This is fairly kludgy, but is
            // the only way to compose the module binding in this custom binding. This isn't great and I have
            // opened the following feature request to improve this:
            //
            // https://github.com/rniemeyer/knockout-amd-helpers/issues/26
            //
            define('components/modal/ModalBindingViewModel', [], function () {
                return {
                    closeModal: function () {
                        $element.removeClass(IS_MODAL_SHOWN_STATE_CLASS);
                    },
                    contentTemplate: bindingData
                };
            });

            // The valueAccessor argument needs to be a function in order to work w/ calling other bindings.
            var modalViewModelAccessor = function () {
                return {
                    name: 'components/modal/ModalBindingViewModel',
                    template: 'components/modal/modal'
                };
            };

            ko.bindingHandlers.module.init(modalContainerNode, modalViewModelAccessor, allBindings, viewModel, bindingContext);

            //
            // Event Handling
            //

            $element.on('click' + EVENT_NAMESPACE, function (event) {
                if (!$element.hasClass(IS_MODAL_SHOWN_STATE_CLASS) &&
                    $(event.target).closest(".modal-toggle").length > 0)
                {
                    // Only display the modal if a click happended w/in the "modal-toggle" element and
                    // if the modal is not already shown.
                    $element.addClass(IS_MODAL_SHOWN_STATE_CLASS);
                }
            });

            //
            // Cleanup
            //

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                $element.off(EVENT_NAMESPACE);
            });
        },
        update: function () {

        }
    };
});