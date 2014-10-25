var negombo = angular.module('negombo', [
    'angularSoundManager',
    'directives.ngSwing',
    'directives.ngFullPage'
]);

negombo.controller('ApplicationCtrl', ['$scope', function($scope){
    $scope.songs = [
        {
            id: 1,
            title: 'Api Beach',
            artist: 'Api Sindu Kiemu',
            url: 'https://s3-ap-southeast-1.amazonaws.com/negombo/music/shitaima+-+api+sindu+kiemu+-+01+api+beach.mp3'
        },
        {
            id: 2,
            title: 'mal',
            artist: 'Api Sindu Kiemu',
            url: 'https://s3-ap-southeast-1.amazonaws.com/negombo/music/shitaima+-+api+sindu+kiemu+-+02+mal1.mp3'
        },
        {
            id: 3,
            title: 'Michael Congo',
            artist: 'Api Sindu Kiemu',
            url: 'https://s3-ap-southeast-1.amazonaws.com/negombo/music/shitaima+-+api+sindu+kiemu+-+03+michael+congo.mp3'
        },
        {
            id: 4,
            title: 'Ahagena Flamingos',
            artist: 'Api Sindu Kiemu',
            url: 'https://s3-ap-southeast-1.amazonaws.com/negombo/music/shitaima+-+api+sindu+kiemu+-+04+ahagena+flamingos.mp3'
        },
        {
            id: 5,
            title: 'Api Con Samith',
            artist: 'Api Sindu Kiemu',
            url: 'https://s3-ap-southeast-1.amazonaws.com/negombo/music/shitaima+-+api+sindu+kiemu+-+05+api+con+samith.mp3'
        }
    ];
    $scope.playlist = [
        {
            id: 'one',
            title: 'Rain',
            artist: 'Drake',
            url: 'http://www.schillmania.com/projects/soundmanager2/demo/_mp3/rain.mp3'
        }
    ]
}]);