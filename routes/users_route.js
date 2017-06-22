var express = require('express');
var user = require('../models/user').user;
var blog = require('../models/blog').blogs;
var router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/list',function(req, res){
    res.send('user list');
});
router.get('/register',function(req, res){
    res.render('register', {title:'Regiter'});
});
router.post('/register', function(req,res){

    var user_info = {
        username:req.body.username,
        password:req.body.password,
        email:req.body.email
    };
    try{
        user.user_register(user_info, res);
    }catch(e){
        console.log(e.message);
        console.log(e.description);
        console.log(e.number);
        console.log(e.name);
        res.send("Not success");
    }
});
router.get('/login',function(req, res){
    res.render('login', {title:'Login'});
});
router.post('/login', function(req,res){

    var user_info = {
        username:req.body.username,
        password:req.body.password,
    };
    try{
        user.user_login(user_info, req, res);
    }catch(e){
        console.log(e.message);
        console.log(e.description);
        console.log(e.number);
        console.log(e.name);
        res.send("Not success");
    }
});
router.get('/logout',function(req, res){
    user.user_logout(req, res);
});
router.get('/index',function(req, res){
    if(req.session.user){
        console.log(req.session.user._id);
        blog.my_blog_list(req.session.user._id, function(err, result){
            // console.log(result);
            result = result.slice(0,20);
            if(err){
                res.render('personal_index', {title:'个人主页',user:JSON.stringify(req.session.user), "blog_list":""});
            }else{
                res.render('personal_index', {title:'个人主页',user:JSON.stringify(req.session.user), "blog_list":JSON.stringify(result)});
            }
        });
    }else{
        res.redirect('/users/login/');
    }

});
router.get('/personal_add_blog',function(req, res){
    if(req.session.user){
        res.render('personal_add_blog', {title:'新建Blog',user:JSON.stringify(req.session.user)});
    }else{
        res.redirect('/users/login/');
    }

});
router.post('/personal_add_blog',function(req, res){
    if(req.session.user){
        var blog_info = {
            title:req.body.title,
            content:req.body.content,
            author:req.session.user.username,
            author_id:req.session.user._id,
        };
        blog.createBlog(blog_info, req, res);
    }else{
        res.send("error");
    }
});
router.get('/edit_blog/:blog_id', function(req, res) {
    if(req.session.user) {
        blog.blog_information(req.params.blog_id, function(err, result){
            if(err){
                res.render('personal_edit_blog', { title: 'Edit Blog' , user:JSON.stringify(req.session.user), blog:JSON.stringify({}) });
            }else{
                res.render('personal_edit_blog', { title: 'Edit Blog' , user:JSON.stringify(req.session.user), blog:JSON.stringify(result[0]) });
            }
        })
    }else{
        res.redirect('/users/login/');
    }
});
router.post('/edit_blog/:blog_id', function(req, res) {
    if(req.session.user) {
        var blog_info = {
            title:req.body.title,
            content:req.body.content,
        };
        blog.update_blog(req.params.blog_id, blog_info, function(err){
            if(err){
                res.send("error");
            }else{
                res.send("success");
            }
        })
    }else{
        res.send("error");
    }
});
module.exports = router;
