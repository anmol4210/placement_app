var inspector = require('schema-inspector');

module.exports.user_validate = user_validate;
module.exports.student_validate = student_validate;
module.exports.company_validate = company_validate;
module.exports.company_update_validate = company_update_validate;
module.exports.student_company_validate = student_company_validate;
module.exports.student_update_validate = student_update_validate
////////////Sanitizing////////
var user_schema = {
    type: 'object',
    strict: true,
    properties: {
        username: {
            type: 'string', optional: false
        },
        email: {
            type: 'string', optional: false
        },
        password: {
            type: 'string', optional: false
        },
        p_number: {
            type: 'number', optional: false
        }

    }
};

var student_schema = {
    type: 'object',
    strict: true,
    properties: {
        name: {
            type: 'string', optional: true
        },
        department: {
            type: 'string', optional: true
        },
        rollno: {
            type: 'number', optional: false, unique: true
        },
        cgpa: {
            type: 'number', optional: true
        }

    }
};

var student_update_schema = {
    type: 'object',
    strict: true,
    properties: {
        name: {
            type: 'string', optional: true
        },
        department: {
            type: 'string', optional: true
        },
        rollno: {
            type: 'number', optional: true, unique: true
        },
        cgpa: {
            type: 'number', optional: true
        }

    }
};

var company_schema = {
    type: 'object',
    strict: true,
    properties: {
        cname: {
            type: 'string', optional: false, unique: true
        },
        description: {
            type: 'string', optional: true
        },
        student: {
            type: Array,
            optional: true,
            name: { type: 'string' },
            rollno: { type: 'string' }
        }
    }
};

var company_update_schema = {
    type: 'object',
    strict: true,
    properties: {
        cname: {
            type: 'string', optional: true, unique: true
        },
        description: {
            type: 'string', optional: true
        },
        student: {
            type: Array,
            optional: true,
            name: { type: 'string' },
            rollno: { type: 'string' }
        }
    }
};


var student_company_schema = {
    type: 'object',
    strict: true,
    properties: {
        rollno: { type: 'number', optional: false },
        name: { type: 'string', optional: true },

    }
};

function user_validate(req) {
    return inspector.validate(user_schema, req.body);
}
function student_validate(req) {
    return inspector.validate(student_schema, req.body);
}
function student_update_validate(req) {
    return inspector.validate(student_update_schema, req.body);
}
function company_update_validate(req){
    return inspector.validate(company_update_schema, req.body);
}

function company_validate(req) {
    return inspector.validate(company_schema, req.body);
}
function student_company_validate(req) {
    return inspector.validate(student_company_schema, req.body);
}