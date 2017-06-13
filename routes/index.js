var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log(req.session);
  if(req.session.user){
    res.render('index', { title: 'Express' , user:JSON.stringify(req.session.user) });
  }else{
    res.redirect('/users/login/');
  }

});

module.exports = router;
