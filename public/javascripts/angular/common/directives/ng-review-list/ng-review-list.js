angular.module('directives.ngReviewList', [])
    .directive('ngReviewList', ['$http', '$filter', function ($http, $filter) {
        return {
            restrict: 'E',
            scope: {type: '@reviewType'},
            templateUrl: '/javascripts/angular/common/directives/ng-review-list/reviews.tpl.html',
            link: function (scope, element, attrs) {
                scope.months = [];
                $http.get('/api/reviews')
                    .success(function(data) {
                        scope.moments = data;
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

