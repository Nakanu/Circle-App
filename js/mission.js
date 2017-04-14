// Get the modal
var modal = document.getElementById("add-request");

// When user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	}
}

// Get Sign-up button and when user click on it, display sign-up form
document.getElementById("new-request-btn").onclick = function() { showSignUpForm() };

function showSignUpForm() {
	document.getElementById("add-request").style.display = "block";
}

