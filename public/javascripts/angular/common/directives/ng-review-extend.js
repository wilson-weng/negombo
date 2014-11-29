angular.module('directives.ngReviewExtend', [])
    .directive('ngReviewExtend', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.openReview = function () {
                    var windowWidth = $window.innerWidth;
                    scope.extendReview = true;
                    $('.main-column').css('width', (windowWidth - 300) + 'px');
                    scope.scrollToElement('header');
                    $('body').animate(
                        {left: (295 - windowWidth * 0.8) + 'px'}
                    );
                    $('body').css('overflow-y', 'hidden');
                };
                scope.closeReview = function () {
                    $('body').css('overflow-y', 'scroll');
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