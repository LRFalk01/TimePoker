'use strict';

pPoker.controller('PokerController', ['$scope', '$log', 'SignalRService', '$timeout', 'ipCookie', '$state',
    function ($scope, $log, SignalRService, $timeout, ipCookie, $state) {
        $scope.poker = $scope.poker || {};
        $scope.poker.signalR = SignalRService.properties;

        self.Init = function () {
        };

        $scope.poker.SubmitEstimate = function () {
            SignalRService.SubmitEstimate($scope.poker.estimate);
        };

        $scope.poker.SubmitUnknown = function () {
            $scope.poker.estimate = '?';
            $scope.poker.SubmitEstimate();
        };

        $scope.poker.Reset = function () {
            $scope.poker.estimate = '';
            SignalRService.Reset();
        };

        $scope.poker.Volunteer = function () {
            SignalRService.Volunteer();
        };

        $scope.$watchCollection('poker.signalR.players', function (players) {
            $timeout(function() {
                if (!players || players.length == 0) {
                    $scope.poker.reveal = false;
                    return;
                }
                $scope.poker.reveal = players.every(function (player) {
                    if (!player.IsPlaying) return true;
                    return player.Estimate;
                });
            }, 100);
        });

        $scope.poker.Leave = function() {
            SignalRService.Leave();
            ipCookie.remove('name');
            ipCookie.remove('spectator');
            ipCookie.remove('room');
            $state.go('login');
        };

        self.Init();
    }]
);