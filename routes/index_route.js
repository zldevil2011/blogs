var express = require('express');
var router = express.Router();
var classification = require("../models/classification").classifications;
var blog = require("../models/blog").blogs;

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session);
  if(req.session.user){
    classification.all_classification(function(err, result){
      if(err){
        res.render('index', { title: 'Express' , user:JSON.stringify(req.session.user), classification_list:"" });
      }else{
        res.render('index', { title: 'Express' , user:JSON.stringify(req.session.user), classification_list:JSON.stringify(result) });
      }
    });

  }else{
    res.redirect('/users/login/');
  }

});
router.get('/blog/:blog_id', function(req, res) {
  blog.blog_information(req.params.blog_id, function(err, result){
    console.log(result);
    console.log(err);
    if(err){
      res.render('blog_information', { title: 'Blog' , user:JSON.stringify({}), blog:JSON.stringify({}) });
    }else{
      res.render('blog_information', { title: 'Blog' , user:JSON.stringify({}), blog:JSON.stringify(result[0]), });
    }
  })

});

module.exports = router;
