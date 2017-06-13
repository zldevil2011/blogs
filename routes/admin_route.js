var express = require('express');
var router = express.Router();
var classification = require("../models/classification").classifications;

/* GET admin page. */
router.get('/', function(req, res) {
  classification.all_classification(function(err, result){
    if(err){
      console.log("Query failed");
    }else{
      res.render('admin', { title: 'Admin', classification_list:JSON.stringify(result) });
    }
  });

});
router.get('/create_classification', function(req, res){
  res.send("CC");
});
router.post('/create_classification', function(req, res){
  var classification_info = {
    name:req.body.name
  };
  classification.createClassification(classification_info, req, res);
});
module.exports = router;
