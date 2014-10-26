var mongoose = require('mongoose');

module.exports = mongoose.model('song', {
    title : String,
    artist : String,
    url: String
});