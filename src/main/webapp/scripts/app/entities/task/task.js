'use strict';

angular.module('tasksadminApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('task', {
                parent: 'entity',
                url: '/task',
                data: {
                    roles: ['ROLE_ADMIN'],
                    pageTitle: 'tasksadminApp.task.home.title'
                },
                views: {
                	'navbar@': {
                        templateUrl: 'scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    },
                    'content@': {
                        templateUrl: 'scripts/app/entities/task/tasks.html',
                        controller: 'TaskController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('task');
                        return $translate.refresh();
                    }]
                }
            })
            .state('taskDetail', {
                parent: 'entity',
                url: '/task/:id',
                data: {
                    roles: ['ROLE_ADMIN'],
                    pageTitle: 'tasksadminApp.task.detail.title'
                },
                views: {
                	'navbar@': {
                        templateUrl: 'scripts/components/navbar/navbar.html',
                        controller: 'NavbarController'
                    },
                    'content@': {
                        templateUrl: 'scripts/app/entities/task/task-detail.html',
                        controller: 'TaskDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('task');
                        return $translate.refresh();
                    }]
                }
            });
    });
