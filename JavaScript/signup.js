// window.onload = function () {
//     let adminEmail = prompt ("plz enter the admin email")

//     if (adminEmail == "mfawareh1@gmail.com" ) {
//       let adminPassword = prompt ("Plz enter the admin password")
//       if (adminPassword == "2016975037") {
//         alert ("You can register")
//       }

//       else {

//         alert ("You can't register")
//         window.location.href = "../index.html"
//       }
//     }
//     else {
//          alert ("You can't register")
//         window.location.href = "../index.html"
//     }
// }


var regName = /^[a-zA-Z]+$/; 
var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

var firstNameField = document.getElementById("firstNameInput");
var lastNameField = document.getElementById ("lastNameInput")
var emailField = document.getElementById("emailInput");
var passwordField = document.getElementById("passInput");
var repeatPassField = document.getElementById("repeatPassInput");

var firstNameError = document.getElementById('firstNameError');
var lastNameError = document.getElementById('lastNameError');
var emailError = document.getElementById("emailError");
var passError = document.getElementById("passError");

var repeatPassError = document.getElementById("repeatpassdError");

// Name validation
firstNameField.addEventListener('keyup', function () {
    var firstNameInput = firstNameField.value.trim();
    if (regName.test(firstNameInput) == false && firstNameInput !== '') {
        firstNameError.innerHTML = 'Numbers are not allowed';
    } else {
        firstNameError.innerHTML = '';
    }
});

lastNameField.addEventListener('keyup', function () {
    var lastNameInput = lastNameField.value.trim();
    if (regName.test(lastNameInput) == false && lastNameInput !== '') {
        lastNameError.innerHTML = 'Numbers are not allowed';
    } else {
        lastNameError.innerHTML = '';
    }
});

// Email validation
emailField.addEventListener('change', function () {
    var emailInput = emailField.value.trim();
    if (regEmail.test(emailInput) == false && emailInput !== '') {
        emailError.innerHTML = 'Invalid Email';
    } else {
        emailError.innerHTML = '';
    }
});

emailField.addEventListener('input', function () {
    emailError.innerHTML = '';
});

// Password Length Validation
passwordField.addEventListener ('input', function () {
    const passInput = passwordField.value.trim();
    if  (passInput.length > 20) {
        passError.innerHTML = "Password Should be less than 20 chars"
    }

  
    else {
        passError.innerHTML = ""
    }
})




// Password match validation
repeatPassField.addEventListener ('change', function () {
    var passInput = passwordField.value.trim();
    var repeatPassInput = repeatPassField.value.trim();
    if (passInput !== repeatPassInput && repeatPassInput !== '') {
        repeatPassError.innerHTML = "Passwords don't match";
    } else {
        repeatPassError.innerHTML = "";
    }
});

repeatPassField.addEventListener('input', function () {
    repeatPassError.innerHTML = '';
});

// Register button click event
var registerButton = document.getElementById("registerButton");
registerButton.addEventListener('click', function () {
    var firstNameInput = firstNameField.value.trim();
    var lastNameInput = lastNameField.value.trim();
    var emailInput = emailField.value.trim();
    var passInput = passwordField.value.trim();
    var repeatPassInput = repeatPassField.value.trim();

    var valid = true;

    if (regName.test(firstNameInput) == false || firstNameInput === '') {
        firstNameError.innerHTML = 'Please enter a valid name';
        valid = false;
    }

    if (regName.test(lastNameInput) == false || lastNameInput === '') {
        lastNameError.innerHTML = 'Please enter a valid name';
        valid = false;
    }

    if (regEmail.test(emailInput) == false || emailInput === '') {
        emailError.innerHTML = 'Please enter a valid email';
        valid = false;
    }

    if (passInput === '') {
        passError.innerHTML = 'Please enter a password';
        valid = false;
    } else if (passInput !== repeatPassInput) {
        repeatPassError.innerHTML = "Passwords don't match";
        valid = false;
    }

    else if (passInput.length > 20) {
        passError.innerHTML = "Enter a password less than 20 chars";
        valid = false;
    }

    if (repeatPassInput === '') {
        repeatPassError.innerHTML = 'Please repeat your password';
        valid = false;
    }

    if (valid) {

        // Store user data in local storage
        
        var usersRegistered = JSON.parse(localStorage.getItem('users')) || [];

         // Check if email already exists

         var emailExists = false;
         for (i=0; i<usersRegistered.length; i++) {
            if (usersRegistered[i].email === emailInput) {
                emailExists = true;
                break;
            }
         }

         if (emailExists) {
            emailError.innerHTML = 'Email already exists';
         }

         else {
        var user = {
            firstName: firstNameInput,
            lastName: lastNameInput,
            email: emailInput,
            password: passInput,
            gender: '',
            hrID : '',
            isLoggedIn: true,
            phoneNumber : '',
            dateOfJoining : '',
            imageSrc : ''
        };
        usersRegistered.push(user);
        localStorage.setItem('users', JSON.stringify(usersRegistered));
          // Save the logged-in status and first name
            // localStorage.setItem('isLoggedIn', 'true');
            // localStorage.setItem('currentUserFirstName', firstNameInput);

     
        
        window.location.href = "../HTML/login.html" ;
    } }
});
