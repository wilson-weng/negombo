var express = require('express');
var router = express.Router();
var songs = require('../app/models/songs');
var tours = require('../app/models/tours');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Negombo' });
});

router.get('/api/songs', function(req, res) {
    songs.find(function(err, songs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(songs); // return all todos in JSON format
    });
});

router.get('/api/tours', function(req, res) {
    tours.find(function(err, songs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err);
        res.json(songs); // return all todos in JSON format
    });
});

module.exports = router;
