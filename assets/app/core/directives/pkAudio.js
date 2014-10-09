'use strict';

pPoker.directive('pkAudio', function () {
    return {
        restrict: 'A',
        scope: {
            pkAudio: '='
        },
        link: function (scope, element, attrs, ngModelCtrl) {

            var removeBehaviorsRestrictions = function() {
                element.load();
                window.removeEventListener('keydown', removeBehaviorsRestrictions);
                window.removeEventListener('mousedown', removeBehaviorsRestrictions);
                window.removeEventListener('touchstart', removeBehaviorsRestrictions);
            };
            window.addEventListener('keydown', removeBehaviorsRestrictions);
            window.addEventListener('mousedown', removeBehaviorsRestrictions);
            window.addEventListener('touchstart', removeBehaviorsRestrictions);

            scope.pkAudio = element[0];
        }
    };
});
