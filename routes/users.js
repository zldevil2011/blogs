var express = require('express');
var user = require('../models/user').user;
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
        user.user_login(user_info, res);
    }catch(e){
        console.log(e.message);
        console.log(e.description);
        console.log(e.number);
        console.log(e.name);
        res.send("Not success");
    }
});
module.exports = router;
