var student_model = require('../models/student');
var validator = require('../validator');
///Data validation library//
var logger = require('../logging');
var response = require('./response');

module.exports.add = add;
module.exports.update = update;
module.exports.del = del;
module.exports.findStudent = findStudent;

function findStudent(req, res, next) {
    if (req.query.rollno) {
        student_model.findOne({ "rollno": req.query.rollno }, function (err, result) {
            if (err) {
                var er = new Error(err);
                er.stack='';
                next(err);
            }
            else if (!result) {
                response.sendFailureResponse(404, 'Student does not exists!', res);

            }
            else {
                response.sendSuccessResponse("Student Found", result, res);
            }
        });
    }
    else {
        student_model.find(function (err, result) {
            if (err) {
                var er = new Error(err);
                er.stack='';
                next(er);
            }
            else if (!result) {
                response.sendFailureResponse(404, 'Student does not exists!', res);

            }
            else {
                response.sendSuccessResponse("Student Found", result, res);
              
            }
        });
    }
}




function add(req, res, next) {

    var result = validator.student_validate(req);

    if (result.valid) {
        student_model.findOne({ rollno: req.body.rollno }, function (error, result) {

            if (error) {
                var e = new Error(error);
                e.stack='';
                next(e);

            }
            else if(result){
                logger.log('warn', {
                    EVENT: "Failed To register student",
                    REQUEST: req.body
                });
                response.sendFailureResponse(406, 'Student already registered', res);
            }
            else{

                student_model.create(req.body, function (err, student) {
                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);
        
                    }
                    else {
                        logger.log('info', {
                            EVENT: "Creating student in database",
                            STUDENT: student
                        });
                        response.sendSuccessResponse("Student Added", {}, res);                
                    }
                });
            }

        });
        
    } else {
        logger.log('error', {
            EVENT: "Failed to validate request body",
            REQUEST: req.body
        });
        response.sendFailureResponse(422, 'Invalid data!', res);
     
    }

}



function update(req, res, next) {
    var result = validator.student_update_validate(req);
    if (result.valid) {
                student_model.findOneAndUpdate({ rollno: req.params.rollno }, req.body, { new: true }, function (err, student) {
                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);

                    }
                    else {
                        logger.log('info', {
                            EVENT: "Updating student data in database",
                            STUDENT: student
                        });

                        response.sendSuccessResponse("Student Updated", {}, res);
               
                    }
                });
            }
    else {
        logger.log('error', {
            EVENT: "Failed to validate request body",
            REQUEST: req.body
        });
        response.sendFailureResponse(422, 'INVALID DATA!', res);
     
    }
}

function del(req, res, next) {
                           student_model.deleteOne({ rollno: req.params.rollno }, function (error, obj) {
                    if (error) {
                        var er = new Error(error);
                        er.stack='';
                        next(er);
                    }
                    else {
                        logger.log('info', {
                            EVENT: "Student deleted from database",
                            STUDENT: req.body
                        });
                        response.sendSuccessResponse("Student deleted", {}, res);
                        //res.status(200).send('Student deleted');
                    }
                });
            }
