

var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function getJsonUser() {
    const response = await fetch("../JSON/oneUser.json");
    const jsonUser = await response.json();
    return jsonUser;
}

var loginEmailField = document.getElementById("loginEmailInput");
var loginPasswordField = document.getElementById("loginPassInput");

var loginEmailError = document.getElementById("loginEmailError");
var loginPassError = document.getElementById("loginPassError");

// Login button click event
var loginButton = document.getElementById("loginButton");
loginButton.addEventListener('click', async function () {
    var emailInput = loginEmailField.value.trim();
    var passInput = loginPasswordField.value.trim();

    var valid = true;

    if (regEmail.test(emailInput) == false || emailInput === '') {
        loginEmailError.innerHTML = 'Please enter a valid email';
        valid = false;
    } else {
        loginEmailError.innerHTML = '';
    }

    if (passInput === '') {
        loginPassError.innerHTML = 'Please enter a password';
        valid = false;
    } else {
        loginPassError.innerHTML = '';
    }

    if (valid) {
        var users = JSON.parse(localStorage.getItem('users')) || [];
        var found = false;
        var loggedInUser = null;

        // Check local storage users
        for (var i = 0; i < users.length; i++) {
            var user = users[i];
            if (user.email === emailInput && user.password === passInput) {
                found = true;
                loggedInUser = user;
                break;
            }
        }


        // Check the JSON user
        if (!found) {
            var jsonUser = await getJsonUser();
            if (jsonUser.email === emailInput && jsonUser.password === passInput) {
                found = true;
                loggedInUser = jsonUser;
            }
        }

        

        if (found) {
            // localStorage.setItem('isLoggedIn', 'true');
            // localStorage.setItem('currentUserFirstName', loggedInUser.firstName);

            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))


            window.location.href = "../index.html";

            
            
        } else {
            alert('Invalid email or password');
        }
    }
});
