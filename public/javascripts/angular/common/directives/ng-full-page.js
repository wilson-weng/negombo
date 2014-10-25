angular.module('directives.ngFullPage', [])
    .directive('ngFullPage', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var height = $window.innerHeight - element[0].offsetTop%$window.innerHeight;
                element.css('height', height + 'px');
            }
        }
    }]);