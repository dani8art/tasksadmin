'use strict';

angular.module('tasksadminApp')
    .controller('NavbarController', function ($scope, $location, $state, Auth, Principal) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.$state = $state;
        $('#homestyle').remove();
		var check =$('#bootstrap').attr("rel");
		if(!check){
    		$('head').append('<link id="bootstrap" rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />');
    		$('head').append('<link id="main" rel="stylesheet" href="assets/styles/main.css">');
		}
		
        $scope.logout = function () {
            Auth.logout();
            $state.go('principal');
        };
    });
