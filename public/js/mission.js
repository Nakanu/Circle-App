// Get the modal
var modal = document.getElementById('add-request');
var socket = io.connect();

// TODO:
// line 12 add 'startDate' and 'endDate'
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

// Get current date
const getCurrentDate = () => {
	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth()+1; 
	let yyyy = today.getFullYear();

	if(dd<10) { dd ='0'+dd; } 

	if(mm<10) { mm ='0'+mm; } 

	date = yyyy+'-'+mm+'-'+dd;
	return date;
}

const showSignUpForm = () => {
	document.getElementById('add-request').style.display = 'block';
}

const hideSignUpForm = () => {
	document.getElementById('add-request').style.display = 'none';
}

const postRequest = () => {
	var elements = document.cookie.split('=');
	var i = 0;
    for(; i<elements.length;i++){
        if(elements[i]=='token'){
        	break;
		}
	}
	i++;

	// get value from form
	const summary = document.getElementById('summary').value;
	const detail = document.getElementById('request-info').value;
	const requester = document.getElementById('userName').innerHTML;
	let startDate = document.getElementById('startDate').value
	let endDate = document.getElementById('endDate').value

	if(startDate === '') {
		console.log('startDate is empty');
		startDate = getCurrentDate();
		console.log('newStartDate' + startDate);
	}
	if(endDate === '') {
		console.log('endDate is empty');
		endDate = getCurrentDate();
		console.log('newEndDate' + endDate);
	}
	
	// testing
	
	// end testing
	
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
							'<span>Start Date: ' + startDate + '</span><br>' + 
							'<span>End Date: ' + endDate + '</span><br>' +
							'<span>Post by: </span>' + 
							'<span class="requester">' + requester + '</span>' + 
							'</a><br>' + 
							'<ul class="commentList"></ul>' + 
							'<textarea class="comment"></textarea>';
	el.appendChild(elChild);

	document.getElementById('summary').value = "";
	document.getElementById('request-info').value = "";

	hideSignUpForm();
}

const addComment = () => {
	const requester = document.getElementById('userName').innerHTML;
	

	// get textarea value
	text = document.getElementsByClassName('comment');

	// Add comment to comment list
	for(let i = 0; i < text.length; i += 1){
		commentList = text[i].previousSibling;
		const li = document.createElement('li');
		const p = document.createElement('p');
		const span = document.createElement('span');
		const br = document.createElement('br');
		span.textContent = ' --comment by: ' + requester;
		if(text[i].value !== ''){
			p.innerHTML = text[i].value;
			p.innerHTML = p.innerHTML.replace(/\n\r?/g, '<br>')
			p.appendChild(br);
			p.appendChild(span);
			li.appendChild(p);
			commentList.appendChild(li);
		}
	}
}

document.getElementById('addCommentBtn').onclick = function() { addComment() };



// Dynamically add new request
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

