    var winston=require('winston');
    var logger= new (winston.Logger)({
        
        transports:[
            new (winston.transports.File)({name:'info-file',filename:'logs/info.log',level:'info',timestamp:function(){return new Date().toLocaleString();}}),
            new (winston.transports.File)({name:'error-file',filename:'logs/error.log',level:'error',timestamp:function(){return new Date().toLocaleString();}}),
            new (winston.transports.File)({name:'warning-file',filename:'logs/warning.log',level:'warn',timestamp:function(){return new Date().toLocaleString();}})
                   ]
    });

    module.exports=logger;
