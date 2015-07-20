'use strict';

angular.module('tasksadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('error', {
                parent: 'site',
                url: '/error',
                data: {
                    roles: [],
                    pageTitle: 'errors.title'
                },
                views: {
                	'navbar@': {
                        templateUrl: 'scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    },
                    'content@': {
                        templateUrl: 'scripts/app/error/error.html'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('error');
                        return $translate.refresh();
                    }]
                }
            })
            .state('accessdenied', {
                parent: 'site',
                url: '/accessdenied',
                data: {
                    roles: []
                },
                views: {
                	'navbar@': {
                        templateUrl: 'scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    },
                    'content@': {
                        templateUrl: 'scripts/app/error/accessdenied.html'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('error');
                        return $translate.refresh();
                    }]
                }
            });
    });
