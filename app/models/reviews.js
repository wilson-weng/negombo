var mongoose = require('mongoose');

module.exports = mongoose.model('reviews', {
    uploader: String,
    createTime: Date,
    moments: [{
        index : Number,
        keyName : String,
        url: String,
        description: String
    }]
});
