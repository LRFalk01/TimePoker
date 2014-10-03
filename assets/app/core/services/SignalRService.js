'use strict';

pPoker.factory('SignalRService', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    var self = this;
    self.base = {};
    
    self.startDeferred = $q.defer();
    self.initialized = self.startDeferred.promise;
    self.base.gameBoard = {};
    self.base.currentPlayer = {};
    self.base.nameAvailable = undefined;

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

        self.hub.client.nameAvailable = function (available) {
            self.base.nameAvailable = available;
            $rootScope.$apply();
            $log.debug('game.nameAvailable');
        };

        //Starting connection
        $.connection.hub.start().done(function () {
            self.startDeferred.resolve();
            $rootScope.$apply();
            $log.debug('connected');
        });
    };
    self.JoinServer = function (name, isPlaying) {
        self.hub.server.joinServer({ Name: name, Spectator: isPlaying });
        $log.debug('joinServer');
    };

    self.CheckName = function (name) {
        self.hub.server.checkName(name);
        $log.debug('checkName');
    };

    self.Init();
    return {
        initialized: self.initialized,
        properties: self.base,

        JoinServer: self.JoinServer,
        CheckName: self.CheckName
    }; 
}]);