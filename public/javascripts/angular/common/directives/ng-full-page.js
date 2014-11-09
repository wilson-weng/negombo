angular.module('directives.ngFullPage', [])
    .directive('ngFullPage', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.find('img').bind("load", function () {
                    var windowRate = $window.innerHeight / $window.innerWidth;
                    var imageRate = element.find('img').height() / element.find('img').width();
                    console.log(windowRate, imageRate);
                    if (windowRate > imageRate) {
                        element.find('img').css('height', '100%');
                    } else {
                        element.find('img').css('width', '100%');
                    }
                    var height = $window.innerHeight - element[0].offsetTop % $window.innerHeight;
                    element.css('height', height + 'px');
                })
            }
        }
    }]);