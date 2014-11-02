var negombo = angular.module('negombo', [
    'angularSoundManager',
    'directives.ngSwing',
    'directives.ngFullPage',
    'directives.ngMoveProfile'
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
    $scope.playlist = [
        {
            id: 'one',
            title: 'Rain',
            artist: 'Drake',
            url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
        }
    ]
}]);