'use strict';

angular.module('tasksadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('profile', {
                parent: 'entity',
                url: '/profile',
                data: {
                    roles: ['ROLE_ADMIN'],
                    pageTitle: 'tasksadminApp.profile.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/profile/profiles.html',
                        controller: 'ProfileController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('profile');
                        return $translate.refresh();
                    }]
                }
            })
            .state('profileDetail', {
                parent: 'entity',
                url: '/profile/:id',
                data: {
                    roles: ['ROLE_ADMIN'],
                    pageTitle: 'tasksadminApp.profile.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/profile/profile-detail.html',
                        controller: 'ProfileDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('profile');
                        return $translate.refresh();
                    }]
                }
            });
    });
