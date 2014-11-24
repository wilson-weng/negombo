angular.module('directives.ngReviewExtend', [])
    .directive('ngReviewExtend', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.openReview = function () {
                    var windowWidth = $window.innerWidth;
                    scope.extendReview = true;
                    $('.main-column').css('width', (windowWidth - 300) + 'px');
                    $('body').animate(
                        {left: (300 - windowWidth * 0.8) + 'px'}
                    );
                };
                scope.closeReview = function () {
                    $('body').animate(
                        {left: '0px'},
                        {
                            complete: function(){
                                scope.extendReview = false;
                                scope.$apply();
                            }
                        }
                    );
                }
            }
        }
    }]);