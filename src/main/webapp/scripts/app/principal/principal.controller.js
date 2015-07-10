'use strict';

angular.module('tasksadminApp')
    .controller('PrincipalController', function ($scope,$rootScope,$state,Principal,Auth, Task, User) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        }).then(function(){
        	if($scope.isAuthenticated()){
        		$state.go("home");	        
        	}else{
        		$('#bootstrap').remove();
        		$('#main').remove();
        		var check =$('#homestyle').attr("rel");
        		if(!check){
        			$('head').append('<link id="homestyle" rel="stylesheet" href="assets/css/main.css" />');
        		}
        		$scope.login = function () {
                    Auth.login({
                        username: $scope.username,
                        password: $scope.password,
                        rememberMe: $scope.rememberMe
                    }).then(function () {
                        $scope.authenticationError = false;
                        if ($rootScope.previousStateName === 'register') {
                            $state.go('home');
                        } else {
                        	$state.go('home');
                            //$rootScope.back();
                        }
                    }).catch(function () {
                        $scope.authenticationError = true;
                    });
                };
        		$('.scrolly').scrolly();
        	}
        }).catch(function(){
        	$scope.login = function () {
                Auth.login({
                    username: $scope.username,
                    password: $scope.password,
                    rememberMe: $scope.rememberMe
                }).then(function () {
                    $scope.authenticationError = false;
                    if ($rootScope.previousStateName === 'register') {
                        $state.go('home');
                    } else {
                    	$state.go('home');
                        //$rootScope.back();
                    }
                }).catch(function () {
                    $scope.authenticationError = true;
                });
            };
        	$('.scrolly').scrolly();
        });
       
    });
