var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    title:String,
    content:String,
    author:String,
    date:Date,
    read_count:Number,
    author_id:String,
});
blog_model = mongoose.model('blogs', blogSchema);
blog_model.createBlog = function(blog_info, req, res){
    var blog = new blog_model({
        title:blog_info.title || "",
        content:blog_info.content || "",
        author:blog_info.author || "",
        date:new Date(),
        read_count:0,
        author_id:blog_info.author_id || "",
    });
    blog.save(function(err){
        if(err){
            res.send("error");
        }else{
            res.send("success");
        }
    });
};
blog_model.my_classification = function(author_id, callback){
    var user_info = {
       author_id: author_id,
    };
    blog_model.find(user_info, function(res, result){
        callback(null,result);
    });
};
exports.blogs = blog_model;
