'use strict';


// Declare app level module which depends on filters, and services
var cbApp = angular.module('cbApp', ['ui.router', 'ui.validate', 'cgBusy', 'ui.bootstrap'])
    .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', function ($urlRouterProvider, $stateProvider, $locationProvider) {
        $locationProvider.html5Mode(false);

        $urlRouterProvider.otherwise('/');

        var routes = new Array();
        routes.push({
            name: 'base',
            url: '/',
            controller: 'BaseController',
            templateUrl: '/app/base/layout.html'
        });
        routes.push({
            name: 'game',
            parent: 'base',
            url: 'game',
            controller: 'GameController',
            templateUrl: '/app/game/Game.html',
        });

        for (var route in routes) {
            $stateProvider.state(routes[route]);
        }
    }]);


