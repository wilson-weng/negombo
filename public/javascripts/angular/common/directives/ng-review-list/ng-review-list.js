angular.module('directives.ngReviewList', [])
    .directive('ngReviewList', ['$http', '$filter', function ($http, $filter) {
        return {
            restrict: 'E',
            scope: {type: '@reviewType', reviewList: '='},
            templateUrl: '/javascripts/angular/common/directives/ng-review-list/reviews.tpl.html',
            link: function (scope, element, attrs) {
                scope.months = [];
                scope.forParent = scope.reviewList || {};
                scope.refreshList = function(){
                    $http.get('/api/reviews')
                        .success(function(data) {
                            scope.months = [];
                            scope.moments = data;
                            scope.moments = $filter('orderBy')(scope.moments, '-createTime');
                            for(var i=0; i<scope.moments.length;i++){
                                var time = $filter('date')(scope.moments[i].createTime, 'MMM. yyyy');
                                if(scope.months.indexOf(time)<0){
                                    scope.months.push(time);
                                    scope.moments[i].showDate = true;
                                    console.log(scope.moments[i]);
                                }else{
                                    scope.moments[i].showDate = false;
                                }
                            };
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                };
                scope.refreshList();
                scope.forParent.refresh = scope.refreshList();
                scope.forParent.reviewList = scope.moments;
                scope.isShowDate = function(moment){
                    return moment.showDate;
                }
            }
        }
    }]);

