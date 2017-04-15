var socket = require('socket.io-client')('http://localhost:63533');
socket.emit('login',{userName : 'langwang',
	password : '12345678'});
socket.on('login',function (argument) {
	console.log(argument);
	socket.emit('post_quest',{ 
		token: argument.data.token,
		questName : 'find my dog and cat',
		questDetail : 'i cannot find my toy cat and toy dog',
		key : 'fdf'});
})
socket.on('new_post_quest',function (data) {
	console.log(data);
})

