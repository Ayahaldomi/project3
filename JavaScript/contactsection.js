
function saveFeedback(event) {
    event.preventDefault();
  
    // Validate name
    var nameInput = document.getElementById('name');
    var nameError = document.getElementById('nameError');
    var nameRegex = /^[a-zA-Z ]{8,20}$/;
    if (!nameRegex.test(nameInput.value)) {
        nameError.textContent = "Name must be between 8 to 20 characters long and contain only letters and spaces";
        return;
    } else {
        nameError.textContent = "";
    }
  
    // Validate email
    var emailInput = document.getElementById('email');
    var emailError = document.getElementById('emailError');
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        return;
    } else {
        emailError.textContent = "";
    }
  
    // Get message
    var message = document.getElementById('message').value;
  
    // Construct feedback object
    var feedback = {
        name: nameInput.value,
        email: emailInput.value,
        feedback: document.querySelector('input[name="feedback"]:checked').value,
        message: message
    };
  
    // Check if local storage is available
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing feedbacks or initialize empty array
        var feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
        
        // Add new feedback
        feedbacks.push(feedback);
        
        // Save to local storage
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
  
        // Clear the form fields after submission
        nameInput.value = '';
        emailInput.value = '';
        document.getElementById('message').value = '';
  
        // Notify the user (you can customize this part)
        alert('Thank you for your feedback!');
  
    } else {
        // Local storage not supported
        alert('Local storage is not supported on this browser. Feedback cannot be saved.');
    }
  }
  