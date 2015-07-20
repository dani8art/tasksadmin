'use strict';

angular.module('tasksadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('logs', {
                parent: 'admin',
                url: '/logs',
                data: {
                    roles: ['ROLE_ADMIN'],
                    pageTitle: 'logs.title'
                },
                views: {
                	'navbar@': {
                        templateUrl: 'scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    },
                    'content@': {
                        templateUrl: 'scripts/app/admin/logs/logs.html',
                        controller: 'LogsController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('logs');
                        return $translate.refresh();
                    }]
                }
            });
    });
