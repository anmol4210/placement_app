
var express = require('express');
var logger = require('./logging');
var errorhandler = require('errorhandler');
///connect to express app
var app = express();
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
// Website you wish to allow to connect
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

// Request methods you wish to allow
res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

// Request headers you wish to allow
res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

// Set to true if you need the website to include cookies in the requests sent
// to the API (e.g. in case you use sessions)
res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//Middleware- piece of code that runs between request and reponse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//log all the requests//
app.use(function (req, res, next) {
    var temp = JSON.stringify(req.body)
    temp = temp.toLowerCase();
    temp = JSON.parse(temp);
    req.body = temp;
    logger.log('info', {
        REQUEST: req.body,
        URL: req.url
    });
    //console.log(req.body);
    next();
});

///initialize routes
app.use('/api', require('./routes/api'));


app.use(function (req, res) {
    res.status(404).send("Route Not Found");
}
);

/////Error Handling/////////   
app.use(errorhandler({ log: errorNotification }));

function errorNotification(err, str, req, res) {
    console.log('error: '+err.message);
    logger.log('error', err.message);
    //console.log(err);
}
//listen to requests
app.listen(1000,'https://thawing-dawn-11214.herokuapp.com/');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var url = 'mongodb://anmol42:abcd12345@ds247439.mlab.com:47439/mydb';
//var url='mongodb://localhost/mydb';
mongoose.connect('' + url, function (err, db) {
    if (err) {
        logger.log('error', err);
        console.log(err);
        //return process.exit(1);
    }
else{
    console.log("successfully connected");
}
});






