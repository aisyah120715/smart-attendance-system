const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signup');

// Function to show/hide forms
function showForm(form) {
    if (form === 'signup') {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    } else {
        signInForm.style.display = "block";
        signUpForm.style.display = "none";
    }
}

// Check if URL has a hash and navigate to correct form
window.onload = function () {
    if (window.location.hash === "#signup") {
        showForm('signup');
    } else {
        showForm('signIn');
    }
};

// Toggle buttons
signUpButton.addEventListener('click', function () {
    showForm('signup');
});

signInButton.addEventListener('click', function () {
    showForm('signIn');
});


