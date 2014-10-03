'use strict';

pPoker.constant('routes', {
    routes: [
        {
            name: 'base',
            url: '/',
            controller: 'BaseController',
            templateUrl: '/app/base/layout.html'
        },
        {
            name: 'game',
            parent: 'base',
            url: 'game',
            controller: 'PokerController',
            templateUrl: '/app/game/Game.html',
        },
        {
            name: 'login',
            parent: 'base',
            url: 'login',
            controller: 'LoginController',
            templateUrl: '/app/account/login.html',
        }
    ]
});
