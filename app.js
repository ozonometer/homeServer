let restify = require('restify');
let server = restify.createServer();
let setupController = require('./controllers/setupController.js');
let homeController = require('./controllers/homeControllers.js');
let restifyValidator = require('restify-validator');
//var mongoose = require('mongoose');
//var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
//var sensor = require('ds18x20');

//mongoose.connect('mongodb://localhost:27017/mydb');
setupController(server, restify, restifyValidator);
homeController(server);

server.listen(8081, function() {
    console.log('%s listening at %s', server.name, server.url);
});