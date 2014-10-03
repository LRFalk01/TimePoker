'use strict';

pPoker.controller('LoginController',
    ['$scope', 'SignalRService', 'DebounceService',
    function LoginController($scope, SignalRService, DebounceService) {
        $scope.login = $scope.login || {};
        $scope.login.signalR = SignalRService;

        $scope.login.submitForm = function(formData) {
            if (formData.$invalid) return;
            SignalRService.initialized.then(function () {
                SignalRService.JoinServer($scope.login.user.Name, $scope.login.user.Spectator);
            });
        };

        self.Init = function () {
            $scope.login.user = {};
        };
        self.Init();
    }]
);