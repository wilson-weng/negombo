angular.module('directives.ngSongItem', [])
    .directive('ngSongItem', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.isPlaying = false;
                console.log(scope);
                element.on("mouseenter", function(){
                    if(scope.isPlaying){
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
                    scope.isPlaying = true;
                    element.parent().children().removeClass('active');
                    element.addClass('active');
                };
                scope.recoverItem = function(){
                    scope.icon = 'play';
                    scope.isPlaying = false;
                    element.removeClass('active');
                };
            }
        }
    });