var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:String,
    password:String,
    email:String
});
user_model = mongoose.model('users', userSchema);
function user_insert(user_info, res){
    var user = new user_model({
        username:user_info.username,
        password:user_info.password,
        email:user_info.email
    });
    var result = "";
    user.save(function(err){
        if(err){
            console.log("Error" + err);
            result = err;
        }else{
            console.log("register success log");
            result = "register success";
        }
        console.log("pre_result" + result);
        res.send(result);
    });
}
function user_login(user_info, res){
    user_model.count(user_info, function(err, doc){
        console.log("The number of record find:" + doc);
        if(doc > 0){
          console.log(user_info.username + " login success in " + new Date());
          res.send("Login Success");
        }else{
          console.log(user_info.username + " login failed " + new Date());
          res.send("Login Failed");
        }
    });
}
exports.user = {user:user_model, user_insert:user_insert, user_login:user_login};