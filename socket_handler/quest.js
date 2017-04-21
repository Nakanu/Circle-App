var token = require('../lib/token');
var generateResponse = require('../lib/response').generateResponse;
function logInfo(logger,id,eventName,message) {
	logger.info(id + ' eventName:'+ eventName + ' message:'+ message);
}
module.exports = {
	postQuest : function (socket,data,questCollection,logger) {
		var eventName = 'post_quest';
		var userName = token.checkToken(data.token);
		if(userName === null){
			socket.emit(eventName,generateResponse('failed','unath user',''));
			logInfo(logger,socket.id,eventName,'failed with unath user');
			return;
		}
		var newQuest = {userName : userName.userName,
			questName : data.questName,
			questDetail : data.questDetail}
		questCollection.insertAsync(newQuest)
		.catch(function (err) {
			logInfo(logger,socket.id,eventName,'database error');
			logger.warn("err :" +  err);
		});
		socket.emit(eventName,generateResponse('success','success',''));
		logInfo(logger,socket.id,eventName,'new questPosted');
		socket.broadcast.emit('new_post_quest',newQuest);
	}
}