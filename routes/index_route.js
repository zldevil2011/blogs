var express = require('express');
var eventproxy = require('eventproxy');
var router = express.Router();
var classification = require("../models/classification").classifications;
var blog = require("../models/blog").blogs;
var user = require("../models/user").user;

/* GET home page. */
router.get('/', function(req, res) {
  // console.log(req.session);
  if(req.session.user){
    classification.all_classification(function(err, result){
      if(err){
        res.render('index', { title: 'Express' , user_inf_tag:1,user:JSON.stringify(req.session.user), classification_list:"", blog_list:""});
      }else{
        blog.all_blog(function(err, blog_list_result){
          if(err){
            res.render('index', { title: 'Express' , user_inf_tag:1,user:JSON.stringify(req.session.user), classification_list:JSON.stringify(result),blog_list:"" });
          }else{
            var ep = new eventproxy();
            ep.after('author_portrait', blog_list_result.length, function(portraits){
              var new_blog_list_result = [];
              for(var i = 0; i < blog_list_result.length; ++i) {
                var c = blog_list_result[i];
                var t = {
                  "_id":c._id,
                  "title":c.title,
                  "content":c.content,
                  "author":c.author,
                  "date":c.date,
                  "read_count":c.read_count,
                  "author_id":c.author_id,
                  "test":"test",
                  "author_portrait":portraits[i],
                };
                new_blog_list_result.push(t);
              }
              blog_list_result = new_blog_list_result;
              console.log(blog_list_result);
              res.render('index', { title: 'Express' , user_inf_tag:1,user:JSON.stringify(req.session.user), classification_list:JSON.stringify(result),blog_list:JSON.stringify(blog_list_result) });
            });
            var portrait = [];
            for(var i = 0; i < blog_list_result.length; ++i){
                var c = blog_list_result[i];
                user.user_information(c.author_id, function(err, user_info){
                  if(err){
                    ep.emit("author_portrait", "");
                  }else{
                    ep.emit("author_portrait", user_info[0].portrait);
                  }
                });
            }
          }
        });
      }
    });

  }else{
    // res.redirect('/users/login/');
    classification.all_classification(function(err, result){
      if(err){
        res.render('index', { title: 'Express' , user_inf_tag:0,user:JSON.stringify({}), classification_list:"", blog_list:""});
      }else{
        blog.all_blog(function(err, blog_list_result){
          if(err){
            res.render('index', { title: 'Express' , user_inf_tag:0, user:JSON.stringify({}), classification_list:JSON.stringify(result),blog_list:"" });
          }else{
            var ep = new eventproxy();
            ep.after('author_portrait', blog_list_result.length, function(portraits){
              var new_blog_list_result = [];
              for(var i = 0; i < blog_list_result.length; ++i) {
                var c = blog_list_result[i];
                var t = {
                  "_id":c._id,
                  "title":c.title,
                  "content":c.content,
                  "author":c.author,
                  "date":c.date,
                  "read_count":c.read_count,
                  "author_id":c.author_id,
                  "test":"test",
                  "author_portrait":portraits[i],
                };
                new_blog_list_result.push(t);
              }
              blog_list_result = new_blog_list_result;
              console.log(blog_list_result);
              res.render('index', { title: 'Express' ,user_inf_tag:0, user:JSON.stringify({}), classification_list:JSON.stringify(result),blog_list:JSON.stringify(blog_list_result) });
            });
            var portrait = [];
            for(var i = 0; i < blog_list_result.length; ++i){
                var c = blog_list_result[i];
                user.user_information(c.author_id, function(err, user_info){
                  if(err){
                    ep.emit("author_portrait", "");
                  }else{
                    ep.emit("author_portrait", user_info[0].portrait);
                  }
                });
            }
          }
        });
      }
    });
  }

});
router.get('/blog/:blog_id', function(req, res) {
  blog.blog_information(req.params.blog_id, function(err, result){
    console.log(result);
    console.log(err);
    if(err){
      res.render('blog_information', { title: 'Blog' , user_inf_tag:0,user:JSON.stringify({}), blog:JSON.stringify({}) });
    }else{
      res.render('blog_information', { title: 'Blog' , user_inf_tag:0,user:JSON.stringify({}), blog:JSON.stringify(result[0]), });
    }
  })

});

module.exports = router;
