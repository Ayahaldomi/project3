

let firstNameDataEdit = document.getElementById("firstNameEdit");
let lastNameDataEdit = document.getElementById("lastNameEdit");
let emailDataEdit = document.getElementById("emailEdit");
let genderDataEdit = document.getElementById("genderEdit");
let mobileDataEdit = document.getElementById("phoneEdit")
let dateOfJoiningEdit = document.getElementById("dateOfJoiningEdit")
let imageEdit = document.getElementById("imageEdit")

let saveButton = document.getElementById("change");

// Ensure all required elements exist
if (firstNameData && lastNameData && emailData && genderData && saveButton) {
    // Parse the users from localStorage safely
    let localStorageUsers = JSON.parse(localStorage.getItem('users')) || [];
    let sessionCurrentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    // Ensure sessionCurrentUser is not null and has an email property
    if (sessionCurrentUser && sessionCurrentUser.email) {
        for (let i = 0; i < localStorageUsers.length; i++) {
            if (sessionCurrentUser.email === localStorageUsers[i].email) {
                saveButton.addEventListener('click', function () {
                    localStorageUsers[i].firstName = firstNameDataEdit.value || localStorageUsers[i].firstName;
                    localStorageUsers[i].lastName = lastNameDataEdit.value || localStorageUsers[i].lastName;
                    localStorageUsers[i].email = emailDataEdit.value || localStorageUsers[i].email;
                    localStorageUsers[i].gender = genderDataEdit.value || localStorageUsers[i].gender;
                    localStorageUsers[i].phoneNumber = mobileDataEdit.value || localStorageUsers[i].phoneNumber;
                    localStorageUsers[i].dateOfJoining = dateOfJoiningEdit.value || localStorageUsers[i].dateOfJoining
                    localStorageUsers[i].imageSrc = imageEdit.value || localStorageUsers[i].imageSrc

                    // Save the updated users array back to localStorage
                    localStorage.setItem('users', JSON.stringify(localStorageUsers));
                    sessionStorage.setItem('loggedInUser', JSON.stringify(localStorageUsers[i]))
                });
                break; // Exit the loop once the user is found
            }
        }
    } else {
        console.error("No logged in user found in sessionStorage.");
    }
} else {
    console.error("One or more required elements are missing from the DOM.");
}
