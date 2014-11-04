angular.module('directives.ngSongItem', [])
    .directive('ngSongItem', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on("mouseenter", function(){
                    if(element.hasClass('active')){
                        scope.icon = 'stop';
                    }else{
                        scope.icon = 'play';
                    }
                    element.find('p').css({'lineHeight': '15px'});
                    scope.$apply();
                });
                element.on("mouseleave", function(){
                    scope.icon = 'none';
                    element.find('p').css({'lineHeight': '65px'});
                    scope.$apply();
                });
                scope.activeItem = function(){
                    scope.icon = 'stop';
                    element.parent().children().removeClass('active');
                    element.addClass('active');
                };
                scope.recoverItem = function(){
                    scope.icon = 'play';
                    element.removeClass('active');
                };
            }
        }
    });