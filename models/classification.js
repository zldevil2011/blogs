var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var classificationSchema = new Schema({
    name:String,
    icon:String,
    introduction:String,
});
classification_model = mongoose.model('classifications', classificationSchema);

classification_model.createClassification = function (classification_info, req, res) {
    var classification = new classification_model({
        name:classification_info.name,
        icon:classification_info.icon || "",
        introduction:classification_info.introduction || "",
    });
    var result = "";
    classification.save(function(err){
        if(err){
            console.log("Save failed" + err);
            result = "error";
        }else{
            console.log("Save classification success");
            result = "success";
        }
        res.send(result);
    });
};
classification_model.all_classification = function(callback){
    classification_model.find({}, function(res, result){
        callback(null,result);
    });
};


exports.classifications = classification_model
