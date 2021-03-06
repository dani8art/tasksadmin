'use strict';

angular.module('tasksadminApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.$state = $state;
		Principal.identity().then(function(account){
			$scope.user = account;
		});
        
        $scope.logout = function () {
            Auth.logout();
            $state.go('principal');
        };
    });
