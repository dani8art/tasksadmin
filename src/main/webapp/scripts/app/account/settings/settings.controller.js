'use strict';

angular.module('tasksadminApp')
    .controller('SettingsController', function ($scope, Principal, Auth) {
        $scope.success = null;
        $scope.error = null;
        Principal.identity().then(function(account) {
            $scope.settingsAccount = account;
        });
        $scope.logout = Auth.logout;
        $scope.save = function () {
            Auth.updateAccount($scope.settingsAccount).then(function() {
                $scope.error = null;
                $scope.success = 'OK';
                Principal.identity().then(function(account) {
                    $scope.settingsAccount = account;
                });
            }).catch(function() {
                $scope.success = null;
                $scope.error = 'ERROR';
            });
        };
        
        $scope.isLangSelected = function(language){
        	if($scope.settingsAccount.langKey == language){
        		return "selected";
        	}
        }
    });
