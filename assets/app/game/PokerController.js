'use strict';

pPoker.controller('PokerController', ['$scope', '$log', 'SignalRService',
    function ($scope, $log, SignalRService) {
        $scope.poker = $scope.poler || {};
        $scope.poker.signalR = SignalRService.properties;

        self.Init = function () {
        };

        self.Init();
    }]
);