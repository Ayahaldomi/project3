

async function getJsonUser() {
    const response = await fetch("../JSON/oneUser.json");
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
        // serviceLink.setAttribute('href', 'https://www.example.com');
        serviceLink.style.color = 'white !important';
    } else {
        serviceLink.style.display = "none";
        document.getElementById("loginLink").style.display = "block";
        document.getElementById("registerLink").style.display = "block";
        document.getElementById("userDropdown").style.display = "none";
        document.getElementById("service").style.display = "none";
        if (document.getElementById("disabledORenable1")) {
            document.getElementById("disabledORenable1").setAttribute('href', '#');
            document.getElementById("disabledORenable2").setAttribute('href', '#');
            document.getElementById("disabledORenable3").setAttribute('href', '#');
            document.getElementById("disabledORenable4").setAttribute('href', '#');
            document.getElementById("disabledORenable5").setAttribute('href', '#');
        }
    }
}

// Update UI based on login status
updateUI();

const logOutButton = document.getElementById("logout");

if (logOutButton) {
    logOutButton.addEventListener('click', () => {
        console.log('why')
        sessionStorage.clear();
        window.location.href="../index.html"
    });
}






      
