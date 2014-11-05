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

                angular.element(document.querySelector('.slide-icon-left')).on('mouseenter', function(){
                    angular.element(this).addClass('slide-icon-active');
                });
                angular.element(document.querySelector('.slide-icon-left')).on('mouseleave', function(){
                    angular.element(this).removeClass('slide-icon-active');
                });
                angular.element(document.querySelector('.slide-icon-right')).on('mouseenter', function(){
                    angular.element(this).addClass('slide-icon-active');
                });
                angular.element(document.querySelector('.slide-icon-right')).on('mouseleave', function(){
                    angular.element(this).removeClass('slide-icon-active');
                });
            }
        }
    });