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
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);