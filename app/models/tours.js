var mongoose = require('mongoose');

module.exports = mongoose.model('tour', {
    tour_name : String,
    page : Number,
    image: String,
    description: String,
    description_position: String
});