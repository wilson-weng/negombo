var negombo = angular.module('negombo', [
    'angularSoundManager',
    'directives.ngSwing',
    'directives.ngFullPage',
    'directives.ngMoveProfile',
    'directives.ngSongItem',
    'directives.ngSlide'
]);

negombo.controller('ApplicationCtrl', ['$scope', '$http', function($scope, $http){
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
            console.log($scope.tourSlides, $scope.currentTour);
            $scope.totalSlides = $scope.tourSlides[$scope.currentTour].length;

        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);