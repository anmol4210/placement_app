var express = require('express');
var router = express.Router();

var student = require('./student.js');
var company = require('./company.js');
var user=require('./user.js');

//////////Get user////////////
router.get('/user', user.findUser);

//////////Register User/////////////////
router.post('/user', user.add);



//////////Get All or Particular registered student////////////
router.get('/student', student.findStudent);

//////////Register Student/////////////////
router.post('/student', student.add);

//////////Update Student/////////////////
router.put('/student/:rollno', student.update);

//////////Delete Student/////////////////
router.delete('/student/:rollno', student.del);


//////////Get All or Particular registered companies////////////
router.get('/company', company.findCompany);

/////////Register a company/////////////
router.post('/company', company.register);

/////////UnRegister a company///////////////
router.delete('/company/:cname', company.unregister);

//////////Update Company/////////////////
router.put('/company/:cname', company.update);

//////////Register student for a company/////////
router.post('/company/:cname/register/', company.student_register);

////////////UnRegister student for a company/////////////
router.post('/company/:cname/unregister/', company.student_unregister);

module.exports = router;
