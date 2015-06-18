'use strict';

angular.module('tasksadminApp')
    .controller('LogoutController', function (Auth, $state) {
        Auth.logout();
        
    });
