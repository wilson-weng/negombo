angular.module('directives.ngReviewList', [])
    .directive('ngReviewList', ['$http', '$filter', '$window', function ($http, $filter, $window) {
        return {
            restrict: 'E',
            scope: {type: '@reviewType', reviewList: '='},
            templateUrl: '/javascripts/angular/common/directives/ng-review-list/reviews.tpl.html',
            link: function (scope, element, attrs) {
                scope.months = [];
                scope.moments=[];
                scope.forParent = scope.reviewList || {};
                scope.page = 1;
                scope.loadLock = false;
                function processMoments(){
                    scope.months = [];
                    scope.moments = $filter('orderBy')(scope.moments, '-createTime');
                    scope.forParent.reviewList = scope.moments;
                    for(var i=0; i<scope.moments.length;i++){
                        var time = $filter('date')(scope.moments[i].createTime, 'MMM. yyyy');
                        if(scope.months.indexOf(time)<0){
                            scope.months.push(time);
                            scope.moments[i].showDate = true;
                        }else{
                            scope.moments[i].showDate = false;
                        }
                    };
                }
                scope.refreshList = function(page){
                    $http.get('/api/reviews',  {params: {page: page}})
                        .success(function(data) {
                            angular.forEach(data, function(moment){
                                if(scope.moments.indexOf(moment)<0){
                                    scope.moments.push(moment);
                                }
                            });
                            processMoments();
                            scope.loadLock = false;
                        })
                        .error(function(data) {
                            console.log('Error: ' + data);
                        });
                };

                scope.refreshList(1);
                scope.forParent.refresh = scope.refreshList;
                scope.isShowDate = function(moment){
                    return moment.showDate;
                }

                angular.element('.review-container-extend').bind("scroll", function() {
                    var scrollPosition = angular.element('.review-container-extend').scrollTop();
                    var elementHeight = angular.element('.review-container-extend')[0].scrollHeight;
                    if((scrollPosition>(elementHeight - $window.innerHeight*1.2)&&(!scope.loadLock))){
                        scope.page+=1;
                        scope.loadLock = true;
                        scope.refreshList(scope.page);
                    }
                });
            }
        }
    }]);

