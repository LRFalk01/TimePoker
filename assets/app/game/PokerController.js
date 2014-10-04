'use strict';

pPoker.controller('PokerController', ['$scope', '$log', 'SignalRService',
    function ($scope, $log, SignalRService) {
        $scope.poker = $scope.poler || {};
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

        $scope.poker.Reveal = function() {
            return $scope.poker.signalR.players.every(function (player) {
                if (!player.IsPlaying) return true;
                return player.Estimate;
            });
        };

        self.Init();
    }]
);