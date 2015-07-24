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
        		
        		$(document).scroll(function () {
        			var scroll = $(this).scrollTop();
        	        var topDist = $(".nav-principal").position();
        	        if (scroll > topDist.top + 70) {
        	            $('div.nav-principal').css({"position":"fixed","top":"0","background-image":"linear-gradient(45deg, #9dc66b 5%, #4fa49a 30%, #4361c2)"});   
        	            
        	        } else if (scroll < topDist.top + 70){
        	            $('div.nav-principal').css({"position":"absolute","top":"auto","background-image":"none"});
        	        }
        		});
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
