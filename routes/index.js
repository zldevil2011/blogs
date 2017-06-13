var express = require('express');
var router = express.Router();
var classification = require("../models/classification").classifications

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

module.exports = router;
