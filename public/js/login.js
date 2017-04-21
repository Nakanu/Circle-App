function signUp() {
	var userName = document.getElementById('userName').value;
	var passWord = document.getElementById('passWord').value;
	var repassowrd = document.getElementById('rePassword').value;
	if(passWord === repassowrd){ //The identity (===) operator behaves identically to the equality (==) operator except no type conversion is done, and the types must be the same to be considered equal.
		var socket = io.connect();
		var data = {
			userName : userName,
			password : passWord
		}
		socket.emit('register',data);
		socket.on('register',function (data) {
			console.log(data);
			if(data.result == 'success'){
                document.cookie = "token=" + data.data.token;
                document.getElementById('sign-up').style.display='none';
                //TODO
			}
		});
		//socket.disconnect();
	}else{
		//TODO
	}
}



function logIn() {
    var userName = document.getElementById('loginEmail').value;
    var passWord = document.getElementById('loginPassword').value;
    if(userName.length==0 || passWord.length == 0) return;
    var socket = io.connect();
    var data = {
        userName : userName,
        password : passWord
    }
    socket.emit('login',data);
    socket.on('login',function (data) {
        console.log(data);
        if(data.result == 'success'){
            document.cookie = "token=" + data.data.token;
            window.location.replace("./mission.html");
        }else{
            alert("Wrong username or password!");
        }
	});
}

//document.getElementById('signInSubmit').onclick = logIn;
