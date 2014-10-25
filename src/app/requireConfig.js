(function () {
    'use strict';

    require.config({
        paths: {
            'bluebird':      'vendor/js/bluebird',
            'lodash':        'vendor/js/lodash',
            'jquery':        'vendor/js/jquery-2.1.1.min',
            'knockout':      'vendor/js/knockout-3.2.0',
            'ko.amdHelpers': 'vendor/js/knockout-amd-helpers.min',
            'sammy':         'vendor/js/sammy',
            'text':          'vendor/js/text',
        },

        shim: {
            'knockout': {
                deps: [ 'jquery' ],
                exports: 'knockout'
            },
            'vendor/js/bluebird': {
                exports: 'Promise'
            },
            'vendor/js/sammy': {
                deps: ['jquery'],
                exports: 'Sammy'
            }
        }
    });
})();