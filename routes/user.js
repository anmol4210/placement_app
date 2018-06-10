var user_model = require('../models/user');
var validator = require('../validator');
///Data validation library//
var logger = require('../logging');
var response = require('./response');

module.exports.add = add;
module.exports.findUser = findUser;

function findUser(req, res, next) {
  //  console.log(req.query.username);
    //console.log(req.query.password);
    if (req.query.username&&req.query.password) {
        user_model.findOne({ "username": req.query.username,"password":req.query.password }, function (err, result) {
            if (err) {
                var er = new Error(err);
                er.stack='';
                next(err);
            }
            else if (!result) {
                response.sendFailureResponse(404, 'Incorrect username or password!', res);

            }
            else {
                response.sendSuccessResponse("User Found", result, res);
            }
        });
    }
    else{
        response.sendFailureResponse(404, 'username or password missing!', res);
    }
}

function add(req,res,next){

    var result = validator.user_validate(req);
    //console.log("add");
    if (result.valid) {
        user_model.findOne({ username: req.body.username }, function (error, result) {

            if (error) {
                var e = new Error(error);
                e.stack='';
                next(e);

            }
            else if(result){
                logger.log('warn', {
                    EVENT: "Failed To register user",
                    REQUEST: req.body
                });
                response.sendFailureResponse(406, 'User already registered', res);
            }
            else{

                user_model.create(req.body, function (err, user) {
                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);
        
                    }
                    else {
                        logger.log('info', {
                            EVENT: "Creating student in database",
                            USER: user
                        });
                        response.sendSuccessResponse("User Registered", {}, res);                
                    }
                });
            }

        });
        
    } else {
        logger.log('error', {
            EVENT: "Failed to validate request body",
            REQUEST: req.body
            // req.body
        });

        response.sendFailureResponse(422, 'Invalid data!', res);
     
    }

}