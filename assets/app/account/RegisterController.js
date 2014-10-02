'use strict';

cbApp.controller('RegisterController', ['$scope', 'HttpRequestService',
    function RegisterController($scope, HttpRequestService) {
        var self = this;

        $scope.submitForm = function(formData) {
            if (formData.$invalid) return;
            $scope.registerUserPromise = HttpRequestService.Go({
                method: 'POST',
                url: '/API/account/Register',
                data: JSON.stringify($scope.user)
            }).then(function(data) {

            });
        };

        self.Init = function () {
            $scope.user = {};
        };
        self.Init();
    }]
);