var buttonn = document.getElementById("buttonn");
var container2 = document.getElementById ("container2");
function edit () {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    container2.classList.toggle('active');
}
var change = document.getElementById ("change");
function saveChange () {
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    container2.classList.toggle('active');
}





var yourImg = document.getElementById('yourImg');
var namePosition = document.getElementById('namePosition');
var detailsButton = document.getElementById('details');
var expanded = false;

yourImg.style.display = "none";
namePosition.style.display = "none";

function toggleSize() {
    if (!expanded) {
        yourImg.style.display = "block";
        yourImg.style.width = "20em";
        yourImg.style.height = "15.625em";
        namePosition.style.display = "block";
        namePosition.style.width = "20em";
        namePosition.style.height = "6.625em"; 
        detailsButton.classList.add('hidden'); 
    } else {
        yourImg.style.display = "none";
        yourImg.style.width = "";
        yourImg.style.height = "";
        namePosition.style.display = "none";
        namePosition.style.width = "";
        namePosition.style.height = "";
        detailsButton.classList.remove('hidden'); 
    }
}

detailsButton.addEventListener('click', toggleSize);
yourImg.addEventListener('click', toggleSize);
namePosition.addEventListener('click', toggleSize);




