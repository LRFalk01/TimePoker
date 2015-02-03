'use strict';

pPoker.controller('PokerController', ['$scope', '$log', 'SignalRService', '$timeout', 'ipCookie', '$state',
    function ($scope, $log, SignalRService, $timeout, ipCookie, $state) {
        $scope.poker = $scope.poker || {};
        $scope.poker.signalR = SignalRService.properties;
        $scope.poker.spectators = [];

        self.Init = function () {
            $scope.poker.sounds = {};
            SignalRService.initialized.then(function() {
                SignalRService.GetPlayers();
            });
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

        $scope.poker.AddHours = function () {
            if (!$scope.poker.hours) return;
            SignalRService.AddHours($scope.poker.hours);
            $scope.poker.hours = undefined;
        };

        $scope.$watch('poker.reveal', function(newValue, oldValue) {
            if (!newValue && oldValue) {
                angular.forEach($scope.poker.signalR.players, function (player) {
                    player.EstimateChanged = false;
                });
            }
        });


        $scope.$watchCollection('poker.signalR.players', function (players, oldPlayers) {
            angular.forEach(players, function (player) {
                if (player.Hours.length > 0)
                    player.TotalHours = player.Hours.reduce(function (previousValue, currentValue, index, array) { return previousValue + currentValue; });
            });

            $scope.poker.spectators = [];
            angular.forEach(players, function (player) {
                if (!player.IsPlaying)
                    $scope.poker.spectators.push(player);
            });
            
            var previousReveal = $scope.poker.reveal;
            if (oldPlayers && oldPlayers.length) {
                players.forEach(function (player) {
                    oldPlayers.forEach(function (oldPlayer) {
                        if (player.Id != oldPlayer.Id) return;
                        if (player.Volunteer && !oldPlayer.Volunteer)
                            $scope.poker.sounds.dibs.play();

                        player.EstimateChanged = oldPlayer.EstimateChanged;
                        if (!player.EstimateChanged && previousReveal && player.Estimate != oldPlayer.Estimate)
                            player.EstimateChanged = true;

                    });
                });
            }

            $timeout(function () {
                if (!players || players.length == 0) {
                    $scope.poker.reveal = false;
                    return;
                }
                if (oldPlayers && oldPlayers.length > 0 && players.length > oldPlayers.length) {
                    $scope.poker.sounds.playerJoin.play();
                }

                $scope.poker.reveal = players.every(function (player) {
                    if (!player.IsPlaying) return true;
                    return player.Estimate;
                });

                if ($scope.poker.reveal && !previousReveal)
                    $scope.poker.sounds.reveal.play();
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