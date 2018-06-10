    var mongoose=require('mongoose')
    var studentSchema=new mongoose.Schema({
        
        name:String,
        department:String ,
        cgpa:Number,
        rollno:Number
        
        }
    );


    var restful=require('node-restful'); 
    module.exports=restful.model('tblstudent',studentSchema);
