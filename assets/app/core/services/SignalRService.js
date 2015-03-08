'use strict';

pPoker.factory('SignalRService', ['$q', '$rootScope', '$log', 'ipCookie', '$timeout',
    function ($q, $rootScope, $log, ipCookie, $timeout) {
    var self = this;
    self.base = {};
    
    self.startDeferred = $q.defer();
    self.initialized = self.startDeferred.promise;
    self.base.players = [];
    self.base.currentPlayer = {};
    self.base.nameAvailable = undefined;
    self.base.transport = undefined;

    self.hub = null;

    self.Init = function () {
        self.hub = $.connection.pokerHub;

        self.hub.client.updatePlayers = function (players) {
            angular.copy(players, self.base.players);
            $rootScope.$apply();
            $log.debug('game.updatePlayers');
        };

        self.hub.client.joinServer = function (player) {
            ipCookie('id', player.Id, { expires: 1 });
            angular.copy(player, self.base.currentPlayer);
            $rootScope.$apply();
            $log.debug('game.joinServer');
        };

        self.hub.client.nameAvailable = function (available) {
            self.base.nameAvailable = available;
            $rootScope.$apply();
            $log.debug('game.nameAvailable');
        };

        self.hub.client.roomName = function (room) {
            self.base.room = room;
            $rootScope.$apply();
            $log.debug('game.roomName');
        };

        //rejoin server on disconnect. auto join server if in game.
        self.hub.connection.disconnected(function() {
            $log.debug('disconnected');
            self.hub.connection.start()
                .done(function() {
                    if (self.base.currentPlayer && self.base.currentPlayer.Id)
                        $timeout(function() {
                            self.JoinServer(self.base.currentPlayer.Name, self.base.currentPlayer.IsPlaying, self.base.room);
                        }, 1000);
                });
        });

        //Starting connection
        $.connection.hub.start().done(function () {
            self.base.transport = self.hub.connection.transport.name;
            self.startDeferred.resolve();
            $rootScope.$apply();
            $log.debug('connected');
        });
    };

    self.JoinServer = function (name, isPlaying, room) {
        var reqData = { Name: name, Room: room, Spectator: isPlaying };
        var id = ipCookie('id');
        if (id) {
            reqData.Id = id;
        }

        self.hub.server.joinServer(reqData);
        $log.debug('joinServer');
    };

    self.SubmitEstimate = function (estimate) {
        self.hub.server.submitEstimate(estimate);
        $log.debug('submitEstimate');
    };

    self.Reset = function () {
        self.hub.server.reset();
        $log.debug('reset');
    };

    self.Leave = function () {
        ipCookie.remove('id');
        self.hub.server.leaveGame();
        $log.debug('leaveGame');
    };

    self.Volunteer = function () {
        self.hub.server.volunteer();
        $log.debug('volunteer');
    };

    self.AddHours = function (hours) {
        self.hub.server.addHours(hours);
        $log.debug('addHours');
    };

    self.GetPlayers = function() {
        self.hub.server.getPlayers();
    };

    self.Init();
    return {
        initialized: self.initialized,
        properties: self.base,

        JoinServer: self.JoinServer,
        SubmitEstimate: self.SubmitEstimate,
        Reset: self.Reset,
        Volunteer: self.Volunteer,
        Leave: self.Leave,
        AddHours: self.AddHours,
        GetPlayers: self.GetPlayers
    }; 
}]);