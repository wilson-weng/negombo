angular.module('directives.ngSwing', [])
    .directive('ngSwing', ['$animate', function($animate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var natureWidth = 0;
                var parentWidth = 0;
                element.bind("load", function(e){
                    natureWidth = this.naturalWidth;
                    parentWidth = element.parent()[0].clientWidth;
                });
                element.on("mouseenter", function(){
                    $animate.addClass(element, 'move');
                });
                element.on("mouseleave", function(){
                    $animate.removeClass(element, 'move');
                })
            }
        }
    }]);