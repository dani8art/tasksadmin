'use strict';

angular.module('tasksadminApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


