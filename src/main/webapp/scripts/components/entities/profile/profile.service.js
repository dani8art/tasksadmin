'use strict';

angular.module('tasksadminApp')
    .factory('Profile', function ($resource) {
        return $resource('api/profiles/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    var LastLoginFrom = data.LastLogin.split("-");
                    data.LastLogin = new Date(new Date(LastLoginFrom[0], LastLoginFrom[1] - 1, LastLoginFrom[2]));
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    });
