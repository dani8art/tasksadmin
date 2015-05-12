'use strict';

angular.module('tasksadminApp')
    .controller('ProfileController', function ($scope, Profile, User, ParseLinks) {
        $scope.profiles = [];
        $scope.users = User.query();
        $scope.page = 1;
        $scope.loadAll = function() {
            Profile.query({page: $scope.page, per_page: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.profiles = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();

        $scope.create = function () {
            Profile.update($scope.profile,
                function () {
                    $scope.loadAll();
                    $('#saveProfileModal').modal('hide');
                    $scope.clear();
                });
        };

        $scope.update = function (id) {
            Profile.get({id: id}, function(result) {
                $scope.profile = result;
                $('#saveProfileModal').modal('show');
            });
        };

        $scope.delete = function (id) {
            Profile.get({id: id}, function(result) {
                $scope.profile = result;
                $('#deleteProfileConfirmation').modal('show');
            });
        };

        $scope.confirmDelete = function (id) {
            Profile.delete({id: id},
                function () {
                    $scope.loadAll();
                    $('#deleteProfileConfirmation').modal('hide');
                    $scope.clear();
                });
        };

        $scope.clear = function () {
            $scope.profile = {image: null, LastLogin: null, id: null};
            $scope.editForm.$setPristine();
            $scope.editForm.$setUntouched();
        };
    });
