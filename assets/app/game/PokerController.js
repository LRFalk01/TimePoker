﻿'use strict';

pPoker.controller('PokerController', ['$scope', '$log', 'SignalRService', '$timeout', 'ipCookie', '$state',
    function ($scope, $log, SignalRService, $timeout, ipCookie, $state) {
        $scope.poker = $scope.poker || {};
        $scope.poker.signalR = SignalRService.properties;

        self.Init = function () {
            $scope.poker.sounds = {};
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

        $scope.$watchCollection('poker.signalR.players', function (players, oldPlayers) {
            $timeout(function () {
                var previousReveal = $scope.poker.reveal;
                if (!players || players.length == 0) {
                    $scope.poker.reveal = false;
                    return;
                }
                if (oldPlayers && oldPlayers.length > 0 && players.length > oldPlayers.length) {
                    $scope.poker.sounds.playerJoin.play();
                }

                if (oldPlayers && oldPlayers.length) {
                    players.forEach(function (player) {
                        oldPlayers.forEach(function(oldPlayer) {
                            if (player.Id != oldPlayer.Id) return;
                            if (player.Volunteer && !oldPlayer.Volunteer)
                                $scope.poker.sounds.dibs.play();
                        });
                    });
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