'use strict';

angular.module('tasksadminApp')
    .controller('ProfileDetailController', function ($scope, $stateParams, Profile, User) {
        $scope.profile = {};
        $scope.load = function (id) {
            Profile.get({id: id}, function(result) {
              $scope.profile = result;
            });
        };
        $scope.load($stateParams.id);
    });
