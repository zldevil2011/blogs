var express = require('express');
var router = express.Router();
var classification = require("../models/classification").classifications

/* GET admin page. */
router.get('/', function(req, res) {
  res.render('admin', { title: 'Admin' });
});
router.post('/createClassification', function(req, res){
  var classification_info = {
    name:req.body.name
  };
  classification.createClassification(classification_info);
});
module.exports = router;
