var negombo = angular.module('negombo', [
    'flow',
    'angularSoundManager',
    'directives.ngSwing',
    'directives.ngFullPage',
    'directives.ngMoveProfile',
    'directives.ngSongItem',
    'directives.ngSlide',
    'directives.ngReviewExtend',
    'directives.ngReviewEditor',
    'directives.ngReviewList'
]);

negombo.controller('ApplicationCtrl', ['$scope', '$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll){
    $scope.extendReview = false;
//    setTimeout(function() {
//        $scope.openReview();
//    }, 1200);
    $http.get('/api/songs')
        .success(function(data) {
            angular.forEach(data, function(song){
                song['id'] = song._id;
            });
            $scope.songs = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.totalSlides = 0;
    $http.get('/api/tours')
        .success(function(data) {
            $scope.tours =[];
            $scope.tourSlides = {};
            angular.forEach(data, function(item){
                if($scope.tours.indexOf(item.tour_name) === -1) {
                    $scope.tours.push(item.tour_name);
                }
                if(!(item.tour_name in $scope.tourSlides)){
                    $scope.tourSlides[item.tour_name] = [];
                }
                $scope.tourSlides[item.tour_name].push(item);
            });
            $scope.currentTour = $scope.tours[0];
            $scope.slideIndex = 0;
            $scope.totalSlides = $scope.tourSlides[$scope.currentTour].length;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.scrollToElement = function(hash) {
        // set the location.hash to the id of
        // the element you wish to scroll to.
        $location.hash(hash);

        // call $anchorScroll()
        $anchorScroll();
    };
}]);