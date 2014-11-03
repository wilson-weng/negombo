angular.module('directives.ngMoveProfile', [])
    .directive('ngMoveProfile', ['$window', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var height = 290; // height of the image
                var extent = ($window.innerHeight-290-340-80-140-30>0) ? -80 : $window.innerHeight-290-340-80-140-30;
                var shrink = -80;
                var oldPosition = 0;
                var scrollDown = true;
                var moveBlock = (document.body.scrollTop < height);
                angular.element($window).bind("scroll", function() {
                    var scrollPosition = document.body.scrollTop;
                    scrollDown = (scrollPosition - oldPosition > 0);
                    oldPosition = scrollPosition;
                    if(scrollDown) {
                        if (scrollPosition > height && moveBlock) {
                            moveBlock = !moveBlock;
                            $(element).animate(
                                {top: extent}
                            );
                        }
                    } else{
                        if (scrollPosition < height && !moveBlock) {
                            moveBlock = !moveBlock;
                            $(element).animate(
                                {top: shrink}
                            );
                        }
                    }
                });
            }
        }
    }]);