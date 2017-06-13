var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var classificationSchema = new Schema({
    name:String,
    icon:String,
    introduction:String,
});
classification_model = mongoose.model('classifications', classificationSchema);
exports.classifications = {classification:classification_model};
