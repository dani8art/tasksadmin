/* globals $ */
'use strict';

angular.module('tasksadminApp')
    .directive('tasksadminAppPager', function() {
        return {
            templateUrl: 'scripts/components/form/pager.html'
        };
    });
