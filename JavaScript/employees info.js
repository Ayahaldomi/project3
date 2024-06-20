// const employeesInfoAPI = 'https://666aabcf7013419182d05f8c.mockapi.io/employees';
const employeesInfoAPI = '../JSON/employees.json';

let jsondata
// load table once page is loaded and ready
window.onload = async function loadData() {

    const employeeData = await fetch(employeesInfoAPI); // fetch data from api;
    jsondata = await employeeData.json();

    localStorage.setItem("employees", JSON.stringify(jsondata)); // set data to local storage;

    infoTable(jsondata) // fill table function with the data from api;

    
};


// table function. brings data from 
function infoTable(data) {

    let info = document.getElementById('information'); // call the section where the table will be. in this case it is (tbody);
    
    info.innerHTML = ''; // set innerHTML to blank so that each time the function is called the previous one is removed;
    // for loop to go through all data and set them in the table;
    for (let i = 0; i < data.length; i++) {


        // var to create each row in table and fill it with data;
        let row = `<tr>
                    <td>${i + 1}</td>
                    <td>${data[i].socialNumber}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].gender}</td>
                    <td>${data[i].address}</td>
                    <td>${ data[i].maritalStatus ? 'married' : 'not in a relationship'}</td>
                    <td>${data[i].DateOfEmployment}</td>
                    <td>${data[i].email}</td>
                </tr>`;
        
        info.innerHTML += row; // add rows to the blank space we set before;
    };
};

// const for each search 
const searchName = document.getElementById('searchName');
const searchID = document.getElementById('searchID');
const searchGender = document.getElementById('searchGender');


// event for search by name
searchName.addEventListener('keyup', function() {
    
    let val = this.value; // take the input value and save it in variable;
    
    const nameRegex = /^[a-zA-Z\'\-]+$/;

    if (nameRegex.test(val) !== true && val !== ''){
        errorMessage.innerHTML = "&#8618 Numbers and special charachters are not allowed. you can use \' or - only."
    }
    else{
        errorMessage.innerHTML = ' '
        var newData = search(val, jsondata); // create a variable that calls the search func and sets the input data and jsonAPI data as the func parameters. the result of the func will be the variable value;
        infoTable(newData); // fill the table func with the new data from the search;
    }
});
// event for search by id
searchID.addEventListener('keyup', function() {
    let val = this.value;
    var newData = search(val, jsondata);
    infoTable(newData);
});

searchGender.addEventListener('change', function() {
    let val = this.value;
    console.log(val)
    var newData = search(val, jsondata);
    infoTable(newData);
})


// search func
function search(value, data) {
    var filter = []; // create an empty array;

    // for loop to go through all data elements;
    for (let x = 0; x < data.length; x++) {
        var val = value.toLowerCase(); // change the value to lowercase so that the search won't be case sensitive, then save it to a variable;

        var name = data[x].name.toLowerCase(); // change the name value taken from the data to lowercase so that the search won't be case sensitive, then save it to a variable;

        var id = JSON.stringify(data[x].socialNumber); // save the id value to a variable after turning it to a string so that .includes() works;

        var gender = data[x].gender;

        // if statements to see if the name/id data includes the input data. you can search both at the same time;
        if (name.includes(val)) {
            filter.push(data[x]); // if there's a match, push it to the array;
        };
        if (id.includes(val)) {
            filter.push(data[x]);
        };
        if (gender == val) {
            filter.push(data[x]);
        }

    };
    return filter; // return the array after you go through all of the data;
};



const columnHead = document.getElementsByTagName("th");

for (let a = 1; a < columnHead.length; a++) {
    
    columnHead[a].addEventListener('click', function () {
        let sortDirection = columnHead[a].attributes.value.value
        let text;
        
        if (columnHead[a].className == 'desc') {
            jsondata = jsondata.sort((a,b) => a[sortDirection] > b[sortDirection] ? 1 : -1);;

            columnHead[a].classList.replace("desc", "asc");
            text =  '<i class="fa-solid fa-sort-up"></i>';
            // console.log(text);
        } 
        else if (columnHead[a].className == 'asc') {
            jsondata = jsondata.reverse();
            columnHead[a].classList.replace("asc", "desc");
            text = '<i class="fa-solid fa-sort-down"></i>' ;
            // console.log(text);

        };

        let icon = document.getElementsByClassName('sortIcon')[a - 1];
        icon.innerHTML = text;
        // console.log(icon);
        infoTable(jsondata);
    });
    
};







