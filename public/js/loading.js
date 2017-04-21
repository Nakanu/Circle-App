// Get the modal
var modal = document.getElementById("sign-up");

// When user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if(event.target == modal) {
		modal.style.display = "none";
	}
}

// Get Sign-up button and when user click on it, display sign-up form
document.getElementById("sign-up-btn").onclick = function() { showSignUpForm() };

function showSignUpForm() {
	document.getElementById("sign-up").style.display = "block";
}