'use strict';

angular.module('tasksadminApp')
    .controller('TaskController', function ($scope, Task, User, ParseLinks) {
        $scope.tasks = [];
        $scope.users = User.query();
        $scope.page = 1;
        $scope.loadAll = function() {
            Task.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.tasks = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Task.update($scope.task,
                function () {
                    $scope.loadAll();
                    $('#saveTaskModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Task.get({id: id}, function(result) {
                $scope.task = result;
                $('#saveTaskModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Task.get({id: id}, function(result) {
                $scope.task = result;
                $('#deleteTaskConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Task.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteTaskConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.task = {title: null, description: null, priority: null, endDate: null, topic: null, type: null, completed: null, insertDate: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
