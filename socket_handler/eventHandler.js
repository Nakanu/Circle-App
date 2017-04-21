var user = require('./user');
var quest = require('./quest');
var sharedInstance = require('../sharedInstance').getInstance();

var eventHandler = function(socket) {
	db = sharedInstance.db;
	logger = sharedInstance.logger;
	socket.on('register',function handleRegister(data) {
		user.register(socket,data,db.collection('user'),logger);
	});
	socket.on('login',function handleLogin(data) {
		user.login(socket,data,db.collection('user'),logger);
	});
	socket.on('post_quest',function handlePostQuest(data) {
		quest.postQuest(socket,data,db.collection('quest'),logger);
	});
}

module.exports = eventHandler;