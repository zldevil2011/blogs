var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var classificationSchema = new Schema({
    name:String,
    icon:String,
    introduction:String,
});
classification_model = mongoose.model('classifications', classificationSchema);

classification_model.createClassification = function (classification_info) {
    var classification = new classification_model({
        name:classification_info.name
    });
    var result = "";
    classification.save(function(err){
        if(err){
            console.log("Save failed" + err);
            result = "error";
        }else{
            console.log("Save classification success");
            result = "succee";
        }
        res.send(result);
    });
};



exports.classifications = classification_model
