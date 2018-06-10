var mongoose=require('mongoose');
var userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
    p_number:Number
});

var restful=require('node-restful');
module.exports=restful.model('tbluser',userSchema);