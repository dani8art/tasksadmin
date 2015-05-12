'use strict';

angular.module('tasksadminApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
