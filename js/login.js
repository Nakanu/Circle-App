function signUp() {

	var userName = document.getElementById('userName').value;
	var passWord = document.getElementById('passWord').value;
	var repassowrd = document.getElementById('rePassword').value;
	if(passWord === repassowrd){
		var socket = io.connect();
		var data = {
			userName : userName,
			password : password
		}
		socket.emit('register',data);
		socket.on('register',function (data) {
			console.log(data);
			if(data.result == 'success'){
				
				document.cookie = "token=" + data.data.token;
				//TODO
				document.getElementById('sign-up').style.display='none'
			}else{
				//TODO
			}
		})
		//socket.disconnect();
	}else{
		//TODO
	}

	document.getElementById('userName').value = "";
	document.getElementById('passWord').value = "";
	document.getElementById('rePassword').value = "";
}

