'use strict';

angular.module('tasksadminApp')
    .factory('Task', function ($resource) {
        return $resource('api/tasks/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.endDate = new Date(data.endDate);                    
                    data.insertDate = new Date(data.insertDate);
                    return data;
                }
            },
            'update': { method:'PUT' },
            'getByUser': {
            	url: "api/tasks/:login/all",
            	method: 'GET', 
            	isArray: true            	
            }
        });
    });
