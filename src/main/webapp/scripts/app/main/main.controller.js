'use strict';

angular.module('tasksadminApp')
    .controller('MainController', function ($scope,$state,Principal, Task, User) {
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        }).then(function(){
        	
        	if($scope.isAuthenticated()){
        		$('#homestyle').remove();
        		$('head').append('<link id="bootstrap" rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.css" />');
        		$('head').append('<link id="main" rel="stylesheet" href="assets/styles/main.css">');
        		
        		$scope.user = User.get({login:$scope.account.login})
        	   	$scope.tasks=Task.getByUser({login:$scope.account.login});
    	        $scope.create = function () {
    	        	//$scope.task.endDate = $scope.task.endDate.getTime();    	        	
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
    	        
    	        $scope.completeTask = function(id){
    	        	$('#'+id).find('.task-check').toggleClass('glyphicon-unchecked');
    	        	$('#'+id).find('.task-check').toggleClass('glyphicon-check');    	        	
    	        	Task.get({id: id}, function(result) {
    	                result.completed=1;    	               
    	                //$('#addTaskModal').modal('show');
    	                Task.update(result,function () {
    	                	$('#'+id).closest('.task').delay(500).slideUp(1000);
    	    	            //$scope.tasks=Task.getByUser({login:$scope.account.login});
    	                	// $('#addTaskModal').modal('hide');
    	    	            $scope.clear();
    	    	        });
    	            });
    	        };
    	        
    	        //filtros:
    	        $scope.filtrarPorTopic= function(topic){
	        		$scope.query = topic;
		        }
		        
		        $scope.filtrarPorTipo= function(type){
		        		$scope.query = type;
		        }
    	        
    	        $scope.filtrarPorFecha= function(id){
    	        	Task.get({id: id}, function(result) {
    	        		$scope.query = result.endDate;
    	            });
    	        }
    	        
    	        //editor:
    	        $scope.addLink = function(){
    	        	$('#description').val($('#description').val()+"<a href='' target='_blank'>Link</a>");
    	        }
    	        
    	        $scope.addBlod =function(){
    	        	$('#description').val($('#description').val()+"<b></b>");
    	        }
    	        
    	        $scope.addEm = function(){
    	        	$('#description').val($('#description').val()+"<em></em>");
    	        }
    	        
    	        $scope.addBr = function(){
    	        	$('#description').val($('#description').val()+"<br>");
    	        }
    	        
    	        $scope.addList = function(){
    	        	var description= $('#description').val();
    	        	if(description.length > 0){
    	        		$('#description').val($('#description').val()+"\n<ul>\n<li>item</li>\n</ul>");
    	        	}else{
    	        		$('#description').val($('#description').val()+"<ul>\n<li>item</li>\n</ul>");
    	        	}    	        	
    	        }
    	        
           }else{
        	   $state.go("principal");
           }
        });
       
    });
