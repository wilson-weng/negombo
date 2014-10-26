var express = require('express');
var router = express.Router();
var songs = require('../app/models/songs');

/* GET home page. */
router.get('/', function(req, res) {
    console.log('start');
    res.render('index', { title: 'Negombo' });
});

router.get('/api/songs', function(req, res) {
    console.log('get request');
    songs.find(function(err, songs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        console.log('route', songs);
        if (err)
            res.send(err);
        res.json(songs); // return all todos in JSON format
    });
});

module.exports = router;
