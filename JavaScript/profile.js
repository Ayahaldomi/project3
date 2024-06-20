var buttonn = document.getElementById("buttonn");
var container2 = document.getElementById ("container2");
function edit () {
    container2.style.display = "inline";
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
}
var change = document.getElementById ("change");
function saveChange () {
    container2.style.display = "none";
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
}