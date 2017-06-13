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
    res.render('personal_index', {title:'个人主页',user:JSON.stringify(req.session.user)});
});
router.get('/personal_add_blog',function(req, res){
    res.render('personal_add_blog', {title:'新建Blog',user:JSON.stringify(req.session.user)});
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
module.exports = router;
