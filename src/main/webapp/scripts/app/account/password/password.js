'use strict';

angular.module('tasksadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('password', {
                parent: 'account',
                url: '/password',
                data: {
                    roles: ['ROLE_USER'],
                    pageTitle: 'global.menu.account.password'
                },
                views: {
                	'navbar@': {
                        templateUrl: 'scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    },
                    'content@': {
                        templateUrl: 'scripts/app/account/password/password.html',
                        controller: 'PasswordController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('password');
                        return $translate.refresh();
                    }]
                }
            });
    });
