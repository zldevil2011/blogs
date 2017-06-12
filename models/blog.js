var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title:String,
    author:String,
    date:Date,
    time:String,
    read_count:Integer
});

exports.blogs = mongoose.model('blogs', blogSchema);
