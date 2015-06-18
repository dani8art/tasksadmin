'use strict';

angular.module('tasksadminApp')
    .factory('Task', function ($resource) {
        return $resource('api/tasks/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    var EndDateFrom = data.endDate.split("-");
                    data.endDate = new Date(new Date(EndDateFrom[0], EndDateFrom[1] - 1, EndDateFrom[2]));
                    var insertDateFrom = data.insertDate.split("-");
                    data.insertDate = new Date(new Date(insertDateFrom[0], insertDateFrom[1] - 1, insertDateFrom[2]));
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
