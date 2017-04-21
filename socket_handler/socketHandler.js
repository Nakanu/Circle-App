var eventHandler = require('./eventHandler');
var sharedInstance = require('../sharedInstance').getInstance();

var socketHandler = function(mastersocket) {
	mastersocket.on('connection', function (socket) {
		sharedInstance.logger.info(socket.id +" connected");
		eventHandler(socket);
	})
}

module.exports = socketHandler;