var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blogs');
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
blog_model.insertBlog = function(blog_info){
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
            console.log("Insert blog failed" + new Date());
        }else{
            console.log("Insert blog success" + new Date());
        }
    });
};
blog_model.my_blog_list = function(author_id, callback){
    var user_info = {
       author_id: author_id,
    };
    blog_model.find(user_info, function(res, result){
        callback(null,result);
    });
};
blog_model.blog_information = function(blog_id, callback){
    var blog_info = {
       _id: blog_id,
    };
    blog_model.find(blog_info, function(res, result){
        callback(null,result);
    });
};
blog_model.update_blog = function(blog_id, blog_info, callback){
    var conditions = {
       _id: blog_id,
    };
    var update = {
        $set : {
            title:blog_info.title || "",
            content:blog_info.content || "",
            date:new Date(),
        }
    };
    blog_model.update(conditions, update, function(err){
        callback(err);
    });
};
blog_model.all_blog = function(callback){
    blog_model.find({}, function(err, result){
        callback(err,result);
    });
};
exports.blogs = blog_model;
