'use strict';

cbApp.factory('SignalRService', ['$q', '$rootScope', '$log', function ($q, $rootScope, $log) {
    //var self = this;
    //self.base = {};
    
    //self.startDeferred = $q.defer();
    //self.base.initialized = self.startDeferred.promise;
    //self.base.currentGames = [];
    //self.base.currentGame = {};
    //self.base.gameBoard = {};

    //self.base.gamePlayers = [];

    //self.hub = null;
  
    //self.Init = function () {
    //    self.hub = $.connection.pokerHub;
  
    //    self.hub.client.gamePlayers = function (players) {
    //        angular.copy(players, self.base.gamePlayers);
    //        $rootScope.$apply();
    //        $log.debug('game.gameplayers');
    //    };

    //    self.hub.client.currentGames = function (games) {
    //        angular.copy(games, self.base.currentGames);
    //        $rootScope.$apply();
    //        $log.debug('game.currentGames');
    //    };

    //    self.hub.client.joinServer = function () {
    //        $log.debug('game.joinServer');
    //    };

    //    self.hub.client.createGame = function (game) {
    //        angular.copy(game, self.base.currentGame);
    //        $rootScope.$apply();
    //        $log.debug('game.createGame');
    //    };

    //    self.hub.client.updateGameList = function (games) {
    //        angular.copy(games, self.base.currentGames);
    //        $rootScope.$apply();
    //            $log.debug('game.updateGameList');
    //    };

    //    self.hub.client.reveal = function (squares) {
    //        if (!squares || !angular.isArray(squares)) return;
    //        angular.forEach(squares, function (square) {
    //            var boardSquare = self.base.gameBoard.Squares[square.Row][square.Column];

    //            boardSquare.Bomb = square.Bomb;
    //            boardSquare.NeighboringBombs = square.NeighboringBombs;
    //            boardSquare.State = square.State;
    //        });
    //        $rootScope.$apply();
    //            $log.debug('game.reveal');
    //    };

    //    self.hub.client.initGameBoard = function (board) {
    //        angular.copy(board, self.base.gameBoard);
    //        $rootScope.$apply();
    //            $log.debug('game.initGameBoard');
    //    };

    //    //Starting connection
    //    $.connection.hub.start().done(function () {
    //        self.startDeferred.resolve();
    //        //self.JoinServer();
    //        $rootScope.$apply();
    //        $log.debug('connected');
    //    });
    //};
  
    //self.CurrentGames = function () {
    //        self.hub.server.currentGames();
    //        $log.debug('currentGames');
    //};
    //self.JoinServer = function () {
    //        self.hub.server.joinServer();
    //        $log.debug('joinServer');
    //};
    //self.ClickSquare = function (row, col) {
    //        self.hub.server.click(row, col);
    //        $log.debug('click');
    //};

    //self.CreateGame = function () {
    //        self.hub.server.createGame();
    //        $log.debug('createGame');
    //};

    //self.Init();
    return {
        //initialized: self.startPromise,

        //currentGames: self.base.currentGames,
        //currentGame: self.base.currentGame,
        //gamePlayers: self.base.gamePlayers,
        //gameBoard: self.base.gameBoard,

        //CurrentGames: self.CurrentGames,
        //ClickSquare: self.ClickSquare,
        //CreateGame: self.CreateGame
    }; 
}]);