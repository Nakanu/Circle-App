// Get the modal
var modal = document.getElementById('add-request');

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

const showSignUpForm = () => {
	document.getElementById('add-request').style.display = 'block';
}

const hideSignUpForm = () => {
	document.getElementById('add-request').style.display = 'none';
}

const postRequest = () => {

	// get value from form
	const summary = document.getElementById('summary').value;
	const detail = document.getElementById('request-info').value;
	const requester = document.getElementById('userName').value;

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

