'use strict';

cbApp.controller('LoginController', ['$scope',
    function LoginController($scope) {
        var self = this;

        $scope.submitForm = function(formData) {
            if (formData.$invalid) return;
            $scope.Login($scope.user.Email, $scope.user.Password);
        };

        self.Init = function () {
            $scope.user = {};
        };
        self.Init();
    }]
);