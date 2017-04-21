var express = require('express');
var sharedInstance = require('../sharedInstance').getInstance();
var token = require('../lib/token');
var ObjectId = require('mongodb').ObjectId; 

var api = express.Router();

api.get('/user',function (req,res) {
	res.sendStatus(501);
})

api.get('/user/:token',function (req,res) {
	var userToken = req.params.token;
	console.log(token.checkToken(userToken));
	var decode = token.checkToken(userToken);
	if(decode === null){
		res.sendStatus(401);
		return;
	}
	var collection = sharedInstance.db.collection('user');
	collection.findOneAsync({'userName' : decode.userName})
	.then(function (data) {
		data.password = undefined;
		res.send(data);
	})
	.catch(function (err) {
		sharedInstance.logger.warn("err :" + err);
		res.sendStatus(503);
	});
	//res.sendStatus(200);
})


api.get('/quest',function (req,res) {

	var collection = sharedInstance.db.collection('quest');
	//console.log(db.collection('quest'));
	collection.find({})
	.toArray(function(error, documents) {
		if(error){
			sharedInstance.logger.warn("err :" + error);
			res.sendStatus(503);
			return;
		}		
    	res.send({data : documents});
	});
})

api.get('/quest/:questid',function (req,res) {
	var collection = sharedInstance.db.collection('quest');
	//console.log(req.params.questid);
	collection.findOneAsync({'_id' : new ObjectId(req.params.questid)})
	.then(function (data) {
		if(data){
			res.send(data);
		}else{
			res.sendStatus(404);
		}
	})
	.catch(function (err) {
		sharedInstance.logger.warn("err :" + err);
		res.sendStatus(503);
	});
})

module.exports = api;