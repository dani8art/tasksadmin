/* globals $ */
'use strict';

angular.module('tasksadminApp')
    .directive('tasksadminAppPagination', function() {
        return {
            templateUrl: 'scripts/components/form/pagination.html'
        };
    });
