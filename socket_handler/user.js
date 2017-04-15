var bcrypt   = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
var sharedInstance = require('../sharedInstance').getInstance();

function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

function validPassword (password,oldpassword) {
    return bcrypt.compareSync(password, oldpassword);
}
var generateResponse = require('../lib/response').generateResponse;

function logInfo(logger,id,eventName,message) {
	logger.info(id + ' eventName:'+ eventName + ' message:'+ message);
}
module.exports = {
	register : function (socket,data,userCollection,logger) {
		var eventName = 'register'
		if(data.userName === undefined || data.password === undefined ){
			socket.emit(eventName,
				generateResponse('failed','unknown datatype',""));
			logInfo(logger,socket.id,eventName,"failed with a unknown datatype");
			return;
		}
		var myUser = userCollection.findOneAsync({userName : data.userName});
		myUser.then(function (userData) {
			if(userData){
				socket.emit(eventName,
					generateResponse('failed','user exist',""));
				logInfo(logger,socket.id,eventName,"failed with user exist");
				return;
			}else{
				userCollection.insertAsync({
					userName : data.userName,
					password : generateHash(data.password)
				})
				.then(function (data) {
					var token = jwt.sign({'userName' : data.userName,
											exp: Math.floor(Date.now() / 1000) + (60 * 60)},
											process.env._key,
											{algorithm : 'HS256'});
					socket.emit(eventName,
						generateResponse('success','success',{'token' : token}));
					logInfo(logger,socket.id,eventName,"new user add to the database");
					return;
				})
				.catch(function (err) {
					socket.emit(eventName,
						generateResponse('failed','database error',""));
					logInfo(logger,socket.id,eventName,"failed with database error");
					logger.warn("err: " + err);
					return;
				});

			}
		}).catch(function (err) {
			socket.emit(eventName,
				generateResponse('failed','database error',""));
			logInfo(logger,socket.id,eventName,"failed with database error");
			logger.warn("err: " + err);
			return;
		});
	},

	login	: function (socket,data,userCollection,logger) {
		var eventName = 'login';
		if(data.userName === undefined || data.password === undefined){
			socket.emit(eventName,
				generateResponse('failed','unknown datatype',""));
			logInfo(logger,socket.id,eventName,"failed with database error");
			return;
		}
		var myUser = userCollection.findOneAsync({userName : data.userName});
		myUser
		.then(function (userData) {
			if(userData){
				if(validPassword(data.password,userData.password)){
					var token = jwt.sign({'userName' : userData.userName,
											exp: Math.floor(Date.now() / 1000) + (60 * 60)},
											process.env._key,
											{algorithm : 'HS256'});
					socket.emit(eventName,
						generateResponse('success','success',{'token' : token}));
					logInfo(logger,socket.id,eventName,"login success");
				}else{
					socket.emit(eventName,
						generateResponse('failed','wrong password or username',""));
					logInfo(logger,socket.id,eventName,"failed with wrong password or username");
				}
			}else{
				socket.emit(eventName,
					generateResponse('failed','wrong password or username',""));
				logInfo(logger,socket.id,eventName,"failed with wrong password or username");
			}
		})
		.catch(function (err) {
			socket.emit(eventName,
				generateResponse('failed','database error', ""));
			logInfo(logger,socket.id,eventName,"failed with database error");
			logger.warn("err: " + err);
			return;
		});
	}
}