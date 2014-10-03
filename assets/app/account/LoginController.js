'use strict';

pPoker.controller('LoginController',
    ['$scope', 'SignalRService', '$state',
    function LoginController($scope, SignalRService, $state) {
        $scope.login = $scope.login || {};
        $scope.login.signalR = SignalRService.properties;

        $scope.login.submitForm = function(formData) {
            if (formData.$invalid) return;
            SignalRService.initialized.then(function () {
                SignalRService.JoinServer($scope.login.user.Name, !$scope.login.user.Spectator);
            });
        };
        $scope.$watch('login.signalR.currentPlayer.Id', function (newValue) {
            if (!newValue) return;
            $state.go('game');
        });

        self.Init = function () {
            $scope.login.user = {};
        };
        self.Init();
    }]
);