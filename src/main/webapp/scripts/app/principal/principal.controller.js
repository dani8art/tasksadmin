'use strict';

angular.module('tasksadminApp')
    .controller('PrincipalController', function ($scope,$rootScope,$state,$translate,Principal,Auth, Task, User) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        }).then(function(){
        	$scope.success = null;
            $scope.error = null;
            $scope.doNotMatch = null;
            $scope.errorUserExists = null;
            $scope.registerAccount = {};
            
        	if($scope.isAuthenticated()){
        		$state.go("home");	        
        	}else{        		
        		$scope.isLogin=true;
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
                
                $scope.register = function () {
                    if ($scope.registerAccount.password !== $scope.confirmPassword) {
                        $scope.doNotMatch = 'ERROR';
                    } else {
                        $scope.registerAccount.langKey = $translate.use();
                        $scope.doNotMatch = null;
                        $scope.error = null;
                        $scope.errorUserExists = null;
                        $scope.errorEmailExists = null;

                        Auth.createAccount($scope.registerAccount).then(function () {
                            $scope.success = 'OK';
                        }).catch(function (response) {
                            $scope.success = null;
                            if (response.status === 400 && response.data === 'login already in use') {
                                $scope.errorUserExists = 'ERROR';
                            } else if (response.status === 400 && response.data === 'e-mail address already in use') {
                                $scope.errorEmailExists = 'ERROR';
                            } else {
                                $scope.error = 'ERROR';
                            }
                        });
                    }
                };
        		
        		$('#carousel-principal').carousel('cycle');
        		
        		$scope.changeIsLogin = function(){
        			$scope.isLogin = !$scope.isLogin;
        			$scope.clearAll(false);
        		}
        		
        		$scope.clearAll = function(changeLogin){
        			if(changeLogin==null)
        				changeLogin = true;
        			$scope.success = null;
                    $scope.error = null;
                    $scope.doNotMatch = null;
                    $scope.errorUserExists = null;
                    $scope.registerAccount = {};
                    if(changeLogin)
                    	$scope.isLogin=true;
                    $scope.authenticationError = false;
                    $("input").val("");
        		}
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
        });
       
    });
