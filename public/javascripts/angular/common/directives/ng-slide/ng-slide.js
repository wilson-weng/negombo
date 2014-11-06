angular.module('directives.ngSlide', [])
    .directive('ngSlide', function() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/javascripts/angular/common/directives/ng-slide/slide.tpl.html',
            link: function (scope, element, attrs) {
                var container = angular.element(element.children()[0]);
                var slideWidth = -601;
                scope.slideLeft = function(){
                    scope.slideIndex -= 1;
                    var left = slideWidth * scope.slideIndex;
                    container.animate({
                        left: left+'px'
                    })
                };
                scope.slideRight = function(){
                    scope.slideIndex += 1;
                    var left = slideWidth * scope.slideIndex;
                    container.animate({
                        left: left+'px'
                    })
                };

                scope.active = function(side){
                    scope.activeIcon = side;
                };
                scope.recover = function(){
                    scope.activeIcon = 'none';
                };
            }
        }
    });