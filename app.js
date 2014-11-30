var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer  = require('multer');

var routes = require('./routes/index');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');

var database = require('./config/database'); // load the database config

// configuration
mongoose.connect(database.url);

var reviews = require('./app/models/reviews');
var settings = require('./app/models/settings');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var s3 = require('s3');
var client;
var accessKey = '';
var secretKey = '';
settings.findOne({key: 'aws-s3-access-key'}, function(err, data){
    accessKey = data.value;
    settings.findOne({key: 'aws-s3-secret-key'}, function(err, data) {
        secretKey = data.value;
        client = s3.createClient({
            maxAsyncS3: 20,     // this is the default
            s3RetryCount: 3,    // this is the default
            s3RetryDelay: 1000, // this is the default
            multipartUploadThreshold: 20971520, // this is the default (20 MB)
            multipartUploadSize: 15728640, // this is the default (15 MB)
            s3Options: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey
            }
        });
    });
});


app.use('/', routes);
app.use(multer(
    { dest: './temp/',
        rename: function (fieldname, filename) {
            return filename;
        }
    }
));
var bucket = "negombo";
app.post('/api/upload/init',function(req,res){
    var uploader = req.body.uploader;
    var createTime = req.body.createTime;
    console.log('this is save', uploader, createTime);
    reviews.count({uploader: uploader, createTime: createTime}, function(error, count) {
        if (count == 0) {
            var review = new reviews({
                uploader: uploader,
                createTime: createTime,
                moments: []
            });
            review.save(function (err, review) {
                if (err) return console.error(err);
                console.log('save', review);
                res.json(review);
            });
        }else{
            res.send('error');
        }
    });
});
app.post('/api/upload',function(req,res){
    var file = req.files.file;
    var moments = JSON.parse(req.body.moments);
    var momentId = req.body.momentId;
    console.log('this is update', momentId);
    var params = {
        localFile: file.path,
        s3Params: {
            Bucket: bucket,
            Key: "review/"+file.name
        }
    };
    var s3Uploader = client.uploadFile(params);
    s3Uploader.on('error', function(err) {
        console.error("unable to upload:", err.stack);
    });
    s3Uploader.on('end', function() {
        fs.unlink(file.path, function (err) {
            if (err) throw err;
        });
        var index = 0;
        var description = '';
        for(var i=0; i<moments.length; i++){
            if(moments[i].keyName == file.name){
                index = moments[i].index;
                description = moments[i].description;
            }
        }
        var url = s3.getPublicUrlHttp(bucket, "review/"+file.name);
        reviews.update({_id: momentId},
            {$push: {"moments": {index: index,
                url: url,
                keyName: file.name,
                description: description
            }}},function(err, review){
                if (err) return console.error(err);
                console.log('this is update', review);
                res.json(review);
            }
        )
    });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
