require('dotenv').config();
var express = require('express');
var app = express();
var router = require('./router/router');
var http = require('http');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var io = require('socket.io');
var socketHandler = require('./socket_handler/socketHandler');
var mongodb = require('mongodb');
var Promise = require("bluebird");
var logger = require("./logger");
var cookieParser = require("cookie-parser");
var sharedInstance = require('./sharedInstance').getInstance();

var MongoClient = mongodb.MongoClient;
Promise.promisifyAll(MongoClient);
Promise.promisifyAll(mongodb.Collection.prototype);

var url = process.env._DBURL;

app.use(morgan('dev',{ "stream": logger.stream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('public'));

var dbconnection = MongoClient.connectAsync(url);
var server = http.createServer(app);

dbconnection.then(function (db) {
	sharedInstance.db = db;
	sharedInstance.logger = logger;
	router(app);
	socketHandler(io(server));
	server.listen(0, function() {
  		logger.info('Sever is listening on ' + server.address().port);
	});
}).catch(function (err) {
	logger.error(err);
	process.exit(1);
});


