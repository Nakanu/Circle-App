// Get the modal
var modal = document.getElementById('add-request');
var socket = io.connect();
socket.on('new_post_quest', function(data){
	console.log(data);
	const el = document.getElementById('searchResult');
	const elChild = document.createElement('li');

	elChild.innerHTML = '<a href="#">' + 
							data.questName + 
							'<p>' + data.questDetail.detail + '</p>' + 
							'<span>Post by:</span>' + 
							'<span class="requester">' + data.userName + '</span>' + 
							'</a>';
	el.appendChild(elChild);
});
// When user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = 'none';
	}
}

// Get Sign-up button and when user click on it, display sign-up form
document.getElementById('new-request-btn').onclick = function() { showSignUpForm() };

// Add request to page when  user click 'Post request'
document.getElementById('post-request').onclick = function() { postRequest() };

document.getElementById('log-out-btn').onclick = function(){logOut()};

const showSignUpForm = () => {
	document.getElementById('add-request').style.display = 'block';
}

const hideSignUpForm = () => {
	document.getElementById('add-request').style.display = 'none';
}

function logOut (){

}




const postRequest = () => {
	var elements = document.cookie.split('=');
	var i = 0;
    for(; i<elements.length;i++){
        if(elements[i]=='token'){
        	break;
		}
	} ;
	i++;

	// get value from form
	const summary = document.getElementById('summary').value;
	const detail = document.getElementById('request-info').value;
	const requester = document.getElementById('userName').innerHTML;
	//const startDate = document.getElementById('').value;
	
    var data = {
        token: elements[i],
        questName:summary,
        questDetail:{
            detail: detail
        }
    }
	socket.emit("post_quest",data);

    socket.on('post_quest',function (data) {
        console.log(data);
        if(data.result == 'success'){

            //TODO
        }else{
            //TODO
        }
    })


	const el = document.getElementById('searchResult');
	const elChild = document.createElement('li');

	elChild.innerHTML = '<a href="#">' + 
							summary + 
							'<p>' + detail + '</p>' + 
							'<span>Post by:</span>' + 
							'<span class="requester">' + requester + '</span>' + 
							'</a>';
	el.appendChild(elChild);

	document.getElementById('summary').value = "";
	document.getElementById('request-info').value = "";

	hideSignUpForm();
}

$(function() {
	var elements = document.cookie.split('=');
	var i = 0;
    for(; i<elements.length;i++){
        if(elements[i]=='token'){
        	break;
		}
	} ;
	i++;
	$.getJSON("/api/user/"+ elements[i], function(data) {
		console.log(data);
		document.getElementById('userName').innerHTML = data.userName;
	});

	$.getJSON("/api/quest/", function(data) {
		console.log(data);

		const el = document.getElementById('searchResult');
		for(let i = 0; i < data.data.length; i++) {
			let elChild = document.createElement('li');
			elChild.innerHTML = '<a href="#">' + 
							data.data[i].questName + 
							'<p>' + data.data[i].questDetail.detail + '</p>' + 
							'<span>Post by:</span>' + 
							'<span class="requester">' + data.data[i].userName + '</span>' + 
							'</a>';
			el.appendChild(elChild);
		}
	});

});

