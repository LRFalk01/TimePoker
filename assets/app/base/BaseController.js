'use strict';

pPoker.controller('BaseController', ['$scope', '$log', '$state', 'SignalRService',
    function BaseController($scope, $log, $state, SignalRService) {
        $scope.base = $scope.base || {};
        $scope.base.signalR = SignalRService.properties;

        self.Init = function () {
            if (!$scope.base.signalR.currentPlayer.Id)
                $state.go('login');
        };

        $scope.$watch('base.signalR.currentPlayer.Id', function (newValue) {
            if (!newValue) return;
            $state.go('game');
        });

        self.Init();
    }]
);