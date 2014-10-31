(function () {
    'use strict';

    require.config({
        config: {
            moment: {
                noGlobal: true
            }
        },

        paths: {
            'bluebird':      'vendor/js/bluebird',
            'lodash':        'vendor/js/lodash',
            'jquery':        'vendor/js/jquery-2.1.1.min',
            'knockout':      'vendor/js/knockout-3.2.0',
            'ko.amdHelpers': 'vendor/js/knockout-amd-helpers.min',
            'moment':        'vendor/js/moment',
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
            },
            'vendor/js/masonry': {
                deps: ['jquery']
            },
            'vendor/js/jquery.placeholder': {
                deps: ['jquery']
            }
        }
    });
})();