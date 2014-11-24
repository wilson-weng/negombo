var mongoose = require('mongoose');

module.exports = mongoose.model('setting', {
    key : String,
    value : String
});
