angular.module('directives.ngReviewThumbnail', [])
    .directive('ngReviewThumbnail', ['$http', '$filter', function ($http, $filter) {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: '/javascripts/angular/common/directives/ng-review-thumbnail/thumbnails.tpl.html',
            link: function (scope, element, attrs) {
                scope.months = [];
                $http.get('/api/reviews')
                    .success(function(data) {
                        scope.moments = data;
                        console.log(data);
                    })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });
                scope.isTimeExist = function(moment){
                    if('showDate' in moment){
                        return moment.showDate;
                    }
                    var time = $filter('date')(moment.createTime, 'MMM. yyyy');
                    if(scope.months.indexOf(time)==-1){
                        scope.months.push(time);
                        moment.showDate = false;
                        return false;
                    }else{
                        moment.showDate = true;
                        return true;
                    }
                }
            }
        }
    }]);

