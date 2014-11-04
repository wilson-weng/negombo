var negombo = angular.module('negombo', [
    'angularSoundManager',
    'directives.ngSwing',
    'directives.ngFullPage',
    'directives.ngMoveProfile',
    'directives.ngSongItem'
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
            angular.forEach(data, function(item){
                if($scope.tours.indexOf(item.tour_name) === -1) {
                    $scope.tours.push(item.tour_name);
                }
            });
            $scope.currentTour = $scope.tours[0];
            console.log($scope.tours);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);