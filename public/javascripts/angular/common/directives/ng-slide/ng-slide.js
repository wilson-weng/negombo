angular.module('directives.ngSlide', [])
    .directive('ngSlide', ['$window', function($window) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/javascripts/angular/common/directives/ng-slide/slide.tpl.html',
            link: function (scope, element, attrs) {
                var container = angular.element(element.children()[0]);
                var slideWidth = -601;
                var hiddenWidth = 0;
                scope.showSlideRightIcon = true;
                scope.slideLeft = function(){
                    scope.slideIndex -= 1;
                    var left = slideWidth * scope.slideIndex;
                    container.animate({
                        left: left+'px'
                    })
                    scope.showSlideRightIcon = true;
                };
                scope.slideRight = function(){
                    scope.slideIndex += 1;
                    var left = slideWidth * scope.slideIndex;
                    if(left < hiddenWidth){
                        left = hiddenWidth-20;
                        scope.showSlideRightIcon = false;
                        scope.slideIndex -= 1;
                    }
                    container.animate({
                        left: left+'px'
                    })
                };
                scope.$watch('totalSlides', function(){
                    hiddenWidth = -601*scope.totalSlides + $window.innerWidth-20;
                });
                scope.active = function(side){
                    scope.activeIcon = side;
                };
                scope.recover = function(){
                    scope.activeIcon = 'none';
                };
            }
        }
    }]);