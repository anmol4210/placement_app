var logger = require('../logging');
module.exports.sendSuccessResponse = sendSuccessResponse;
module.exports.sendFailureResponse = sendFailureResponse;

function sendSuccessResponse(message, data, res) {
    var responseObject = {
        status: 200,
        message: message || "Success",
        data: data || {}
    };
    logger.log('info', {
        RESPONSE: responseObject
    });
    res.send(responseObject);
}

function sendFailureResponse(statusCode, message, res) {
    var responseObject = {
        status: statusCode,
        message: message || "Failure"
    };
    logger.log('error', {
        RESPONSE: responseObject,
        STATUS: statusCode
    });
    res.send(responseObject);
}