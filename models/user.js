var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var userSchema = new Schema({
    username:String,
    password:String,
    email:String,
    portrait:String,
    introduction:String,
});
user_model = mongoose.model('users', userSchema);
function user_register(user_info, res){
    var user = new user_model({
        username:user_info.username,
        password:user_info.password,
        email:user_info.email
    });
    user_info = {
        username:user_info.username,
    };
    user_model.find(user_info, function(err, result){
        if(result.length > 0){
            res.send("error");
        }else{
            var register_result = "";
            user.save(function(err){
                if(err){
                    console.log("Error" + err);
                    register_result = "error";
                }else{
                    console.log("register success log");
                    register_result = "success";
                }
                console.log("pre_result" + result);
                res.send(register_result);
            });
        }
    });
}
function user_login(user_info, req, res){
    console.log(req.session);
    user_model.find(user_info, function(err, result){
        if(result.length > 0){
            if(req.session.user){
                console.log("We have session");
            }else{
                req.session.user = result[0];
                console.log("Session User: " + req.session.user);
            }
            console.log(user_info.username + " login success in " + new Date());
            res.send("success");
        }else{
          console.log(user_info.username + " login failed " + new Date());
          res.send("error");
        }
    });
}
function user_logout(req, res){
    try{
        delete req.session.user;
        res.redirect('/users/login/');
    }catch (e){
        res.send("delete failed");
        res.send(e);
    }
}
exports.user = {
    user:user_model,
    user_register:user_register,
    user_login:user_login,
    user_logout:user_logout,
};
