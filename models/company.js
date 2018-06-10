    var mongoose=require('mongoose')
    var companySchema=new mongoose.Schema({
        
        cname:String,
        description:String,
        student:[{
            name:String,
            rollno:Number
        }]
        }
    );
    var restful=require('node-restful');
    module.exports=restful.model('tblcompany',companySchema);
