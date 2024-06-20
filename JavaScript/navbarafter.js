

async function getJsonUser() {
    const response = await fetch("../oneUser.json");
    const jsonUser = await response.json();
    return jsonUser;
}

var usersRegistered = JSON.parse(localStorage.getItem('users')) || [];

var currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
var loggedIn = currentUser && currentUser.isLoggedIn;

async function updateUI() {
    let jsonUser = null;
    if (loggedIn && (!currentUser || !currentUser.firstName)) {
        jsonUser = await getJsonUser();
        currentUser = jsonUser.firstName;
    }

    const serviceLink = document.getElementById('service');

    if (loggedIn || (currentUser && currentUser.firstName)) {
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("registerLink").style.display = "none";
        document.getElementById("userDropdown").style.display = "block";
        document.getElementById("userName").textContent = currentUser.firstName;

        serviceLink.classList.add('white');
        serviceLink.removeAttribute('tabindex');
        serviceLink.removeAttribute('aria-disabled');
        serviceLink.setAttribute('href', 'https://www.example.com');
        serviceLink.style.color = 'white !important';
    } else {
        serviceLink.style.display = "none";
        document.getElementById("loginLink").style.display = "block";
        document.getElementById("registerLink").style.display = "block";
        document.getElementById("userDropdown").style.display = "none";
        document.getElementById("service").style.display = "none";
    }
}

// Update UI based on login status
updateUI();

const logOutButton = document.getElementById("logout");

if (logOutButton) {
    logOutButton.addEventListener('click', () => {
        sessionStorage.clear();
        location.reload();
    });
}






      
