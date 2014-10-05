'use strict';

pPoker.controller('LoginController',
    ['$scope', 'SignalRService', '$state', 'ipCookie',
    function LoginController($scope, SignalRService, $state, ipCookie) {
        $scope.login = $scope.login || {};
        $scope.login.signalR = SignalRService.properties;

        $scope.login.submitForm = function(formData) {
            if (formData && formData.$invalid) return;
            SignalRService.initialized.then(function () {
                $scope.login.SetCookieValues();
                SignalRService.JoinServer($scope.login.user.Name, !$scope.login.user.Spectator, $scope.login.user.Room);
            });
        };
        $scope.$watch('login.signalR.currentPlayer.Id', function (newValue) {
            if (!newValue) return;
            $state.go('game');
        });

        $scope.login.GetCookieValues = function() {
            var cookieUser = ipCookie('name');
            var cookieSpectator = ipCookie('spectator');
            var cookieRoom = ipCookie('room');
            if (cookieUser && cookieRoom && (cookieSpectator === true || cookieSpectator === false)) {
                $scope.login.user.Name = cookieUser;
                $scope.login.user.Spectator = cookieSpectator;
                $scope.login.user.Room = cookieRoom;
                return true;
            }
            return false;
        };

        $scope.login.SetCookieValues = function() {
            ipCookie('name', $scope.login.user.Name, { expires: 21 });
            ipCookie('spectator', $scope.login.user.Spectator || false, { expires: 21 });
            ipCookie('room', $scope.login.user.Room || false, { expires: 21 });
        };

        self.Init = function () {
            $scope.login.user = {};
            if ($scope.login.GetCookieValues())$scope.login.submitForm();
        };
        self.Init();
    }]
);