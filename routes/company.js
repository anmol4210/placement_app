var company_model = require('../models/company');
var student_model = require('../models/student');
var response = require('./response');
var validate = require('../validator');
var logger = require('../logging');
module.exports.findCompany = findCompany;
module.exports.register = register;
module.exports.unregister = unregister;
module.exports.student_register = student_register;
module.exports.student_unregister = student_unregister;
module.exports.update = update;


function findCompany(req, res, next) {
    if (req.query.cname) {
        req.query.cname = req.query.cname.toLowerCase();
        company_model.findOne({ "cname": req.query.cname }, function (err, result) {
            if (err) {
                var er = new Error(err);
                er.stack='';
                next(er);
            }
            else if (!result) {

                response.sendFailureResponse(404, 'Company does not exists!', res);

            }
            else {
                response.sendSuccessResponse("Company found", result, res);
             
            }
        });
    }
    else {
        company_model.find(function (err, result) {
            if (err) {
                var er = new Error(err);
                er.stack='';
                next(er);
            }
            else if (!result) {

                response.sendFailureResponse(404, 'Company does not exists', res);
            }
            else {
                response.sendSuccessResponse("Company found", result, res);
            }
        });
    }
}

function register(req, res, next) {
    var result = validate.company_validate(req);;
    if (result.valid) {

        company_model.findOne({ cname: req.body.cname }, function (err, result) {
            if (err) {
                var er = new Error(err);
                er.stack='';
                next(er);
            }
            if (result) {
                logger.log('warn', {
                    EVENT: "Failed To register company",
                    REQUEST: req.body
                });
                response.sendFailureResponse(406, 'Company already registered', res);
            } else {
                company_model.create(req.body, function (err, company) {
                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);
                    }
                    else {
                        logger.log('info', {
                            EVENT: "Company registered in database",
                            COMPANY: company
                        });
                        response.sendSuccessResponse("Company Registered", {}, res);
                    }
                });
            }
        });
    }
    else {
        logger.log('error', {
            EVENT: "Failed to validate company",
            REQUEST: req.body
        });
        response.sendFailureResponse(422, 'Invalid Data!', res);
    }
}

function unregister(req, res, next) {

                company_model.deleteOne({ cname: req.params.cname }, function (error, obj) {
                    if (error) {
                        var er = new Error(error);
                        er.stack='';
                        next(er);
                    }
                    else {
                        logger.log('info', {
                            EVENT: "Company Deleted from database",
                            REQUEST: req.body
                        });
                        response.sendSuccessResponse("Company UnRegistered", {}, res);
                    }
                });
            
        
    
}


function update(req, res, next) {
    var result = validate.company_update_validate(req);
    if (result.valid) {
                company_model.findOneAndUpdate({ cname: req.params.cname }, req.body, { new: true }, function (err, company) {
                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);

                    }
                    else {
                        logger.log('info', {
                            EVENT: "Updating Company data in database",
                            COMPANY: company
                        });

                        response.sendSuccessResponse("Company Updated", {}, res);
               
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

function student_register(req, res, next) {
    req.params.cname = req.params.cname.toLowerCase();
    
            var rs = validate.student_company_validate(req);
            if (rs.valid) {
                company_model.findOne({ "cname": req.params.cname, "student": { $elemMatch: { rollno: req.body.rollno } } }, function (err, result) {
                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);
                    }
                    else if (result) {
                        logger.log('warn', {
                            EVENT: "Failed to register student for a company",
                            REQUEST: req.body
                        });
                        response.sendFailureResponse(406, 'Student already registered', res);
                    }
                    else {
                        student_model.findOne({ "rollno": req.body.rollno }, function (err, result) {
                            if (err) {
                                var er = new Error(err);
                                er.stack='';
                                next(er);
                            }
                            else if (!result) {
                                logger.log('warn', {
                                    EVENT: "Unable to delete  student",
                                    REQUEST: req.body

                                });
                                response. sendFailureResponse(404, 'Student does not exists', res);
                            }
                            else {

                                company_model.updateOne({ "cname": req.params.cname}, { $push: { "student": req.body } }, function (err, result) {
                                    if (err) {
                                        logger.log('error', {
                                            EVENT: "Failed to register student for a company",
                                            REQUEST: req.body
                                        });

                                        var er = new Error(err);
                                        er.status = 420;
                                        er.stack='';
                                        next(er);
                                    }
                                    else {
                                        logger.log('warn', {
                                            EVENT: "Student registered for a company",
                                            REQUEST: req.body
                                        });
                                        response.sendSuccessResponse("Student Registered", {}, res);
                                    }
                                });
                            }
                        });
                    }
                });
            }
            else {
                logger.log('error', {
                    EVENT: "Failed to validate data",
                    REQUEST: req.body
                });
                response.sendFailureResponse(422, 'Invalid data', res);
            }
        
}


function student_unregister(req, res, next) {

    req.params.cname = req.params.cname.toLowerCase();

             var rv = validate.student_company_validate(req);
            if (rv.valid) {
                company_model.findOne({ "cname": req.params.cname, "student": { $elemMatch: req.body } }, function (err, result) {

                    if (err) {
                        var er = new Error(err);
                        er.stack='';
                        next(er);
                    }
                    if (!result) {
                        logger.log('warn', {
                            EVENT: "Failed to unregister student for a company",
                            REQUEST: req.body
                        });
                        response.sendFailureResponse(404, 'Student does not exists', res);
                    }
                    else {
                        company_model.updateOne(result, { $pull: { "student": req.body } }, function (err, rs) {
                            if (err) {
                                var er = new Error(err);
                                er.stack='';
                                next(er);
                            }
                            else {
                                logger.log('info', {
                                    EVENT: "Student unregistered for a company",
                                    REQUEST: req.body
                                });
                                response.sendSuccessResponse("Student UnRegistered", {}, res);
                            }
                        });
                    }
                });
            }
            else {
                logger.log('error', {
                    EVENT: "Failed to validate student data for a company",
                    REQUEST: req.body
                });
                response.sendFailureResponse(422, 'Invalid Data', res);
            }
        

}
