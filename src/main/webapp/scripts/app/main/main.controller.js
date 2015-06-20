'use strict';

angular.module('tasksadminApp')
    .controller('MainController', function ($scope,$state,Principal, Task, User) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        }).then(function(){
        	
        	if($scope.isAuthenticated()){
        		$scope.user = User.get({login:$scope.account.login})
        	   	$scope.tasks=Task.getByUser({login:$scope.account.login});
    	        $scope.create = function () {
    	        	$scope.task.endDate = $scope.task.endDate.getTime();    	        	
    	        	$scope.task.user=$scope.user;
    	            Task.update($scope.task,
    	                function () {
    	            		$scope.tasks=Task.getByUser({login:$scope.account.login});
    	                    $('#addTaskModal').modal('hide');
    	                    $scope.clear();
    	                });
    	        };
    	        
    	        
    	        $scope.clear = function () {
    	            $scope.task = {title: null, description: null, priority: null, endDate: null, topic: null, type: null, completed: null, insertDate: null, id: null};
    	            $scope.editForm.$setPristine();
    	            $scope.editForm.$setUntouched();
    	            $('#addTaskModal').modal('hide');
    	        };
    	        
    	        $scope.removeQuery = function(){
    	        	$scope.query = "";
    	        }
    	        $scope.update = function (id) {
    	            Task.get({id: id}, function(result) {
    	                $scope.task = result;
    	                $('#addTaskModal').modal('show');
    	            });
    	        };
    	        
    	        $scope.deleteid = function (id) {
    	            Task.get({id: id}, function(result) {
    	                $scope.task = result;
    	                $('#deleteTaskConfirmation').modal('show');
    	            });
    	        };

    	        $scope.confirmDelete = function (id) {
    	            Task.delete({id: id},
    	                function () {
    	            		$scope.tasks=Task.getByUser({login:$scope.account.login});
    	                    $('#deleteTaskConfirmation').modal('hide');
    	                    $scope.clear();
    	                });
    	        };
    	        
    	        $scope.filtrarPorTopic= function(id){
    	        	Task.get({id: id}, function(result) {
    	        		$scope.query = result.topic;
    	            });
    	        }
    	        
    	        $scope.filtrarPorTipo= function(id){
    	        	Task.get({id: id}, function(result) {
    	        		$scope.query = result.type;
    	            });
    	        }
    	        
    	        $scope.filtrarPorFecha= function(id){
    	        	Task.get({id: id}, function(result) {
    	        		$scope.query = result.endDate;
    	            });
    	        }
    	        
           }else{
        	   $state.go("login");
           }
        });
       
    });
