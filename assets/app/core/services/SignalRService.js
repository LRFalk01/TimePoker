'use strict';

pPoker.factory('SignalRService', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    var self = this;
    self.base = {};
    
    self.startDeferred = $q.defer();
    self.base.initialized = self.startDeferred.promise;
    self.base.gameBoard = {};
    self.base.currentPlayer = {};

    self.hub = null;
  
    self.Init = function () {
        self.hub = $.connection.pokerHub;

        self.hub.client.initGameBoard = function (board) {
            angular.copy(board, self.base.gameBoard);
            $rootScope.$apply();
            $log.debug('game.initGameBoard');
        };

        self.hub.client.joinServer = function (player) {
            angular.copy(player, self.base.currentPlayer);
            $rootScope.$apply();
            $log.debug('game.joinServer');
        };

        //Starting connection
        $.connection.hub.start().done(function () {
            self.startDeferred.resolve();
            $rootScope.$apply();
            $log.debug('connected');
        });
    };
    self.JoinServer = function (name, isPlaying) {
        self.hub.server.joinServer(name);
        $log.debug('joinServer');
    };

    self.Init();
    return {
        initialized: self.base.initialized,

        gameBoard: self.base.gameBoard,
        player: self.base.currentPlayer,

        JoinServer: self.JoinServer
    }; 
}]);