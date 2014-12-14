angular.module('directives.ngReviewExtend', [])
    .directive('ngReviewExtend', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.openReview = function () {
                    var windowWidth = $window.innerWidth;
                    scope.extendReview = true;
                    $('.main-column').css({
                        'width': (windowWidth - 300) + 'px',
                        'float': 'left'
                    });
                    $('.review-container-extend').css({
                        'width': windowWidth*0.8 + 'px',
                        'height': $window.innerHeight
                    });
                    scope.scrollToElement('header');
                    $('body').animate(
                        {left: (295 - windowWidth * 0.8) + 'px'}
                    );
                    $('body').css({
                        'overflow-y': 'hidden',
                        'display': 'block',
                        'width': (windowWidth*1.8 - 300)+'px'
                    });
                };
                scope.closeReview = function () {
                    $('body').css('overflow-y', 'scroll');
                    $('body').animate(
                        {left: '0px'},
                        {
                            complete: function(){
                                scope.extendReview = false;
                                scope.reviews.refresh();
                                console.log('digest!');
                            }
                        }
                    );
                }
            }
        }
    }]);