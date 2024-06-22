// const employeesInfoAPI = 'https://666f2849f1e1da2be5222215.mockapi.io/date';
const employeesInfoAPI = '../JSON/employees.json';


let jsondata;
let copyOriginalData = [];

// load table once page is loaded and ready
window.onload = async function loadData() {
    const employeeData = await fetch(employeesInfoAPI); // fetch data from api
    jsondata = await employeeData.json();

    copyOriginalData = [...jsondata]; // make a deep copy of data that won't change

    infoTable(jsondata); // fill table function with the data from api
};

// table function. brings data from api
function infoTable(data) {
    let info = document.getElementById('information'); // declare the section where the table will be (tbody)
    info.innerHTML = ''; // set innerHTML to blank so that each time the function is called the previous one is removed
    
    // for loop to go through all data and set them in the table
    for (let i = 0; i < data.length; i++) {
        // var to create each row in table and fill it with data
        let row = `<tr>
                    <td>${i + 1}</td>
                    <td>${data[i].socialNumber}</td>
                    <td>${data[i].name}</td>
                    <td>${data[i].gender}</td>
                    <td>${data[i].address}</td>
                    <td>${data[i].maritalStatus ? 'married' : 'single'}</td>
                    <td>${data[i].DateOfEmployment}</td>
                    <td>${data[i].email}</td>
                </tr>`;
        
        info.innerHTML += row; // add rows to the blank space we set before
    }
}

// const for each search inputs
const searchName = document.getElementById('searchName');
const searchID = document.getElementById('searchID');
const searchGender = document.getElementById('searchGender');

let nameSearchVal = '';
let idSearchVal = '';
let genderSearchVal = '';

// event for the search by name
searchName.addEventListener('keyup', function() {
    nameSearchVal = this.value.toLowerCase();
    const nameRegex = /^[a-zA-Z\'\-]+$/;

    if (nameRegex.test(nameSearchVal) !== true && nameSearchVal !== ''){
        errorMessage.innerHTML = "&#8618 Numbers and special charachters are not allowed. you can use \' or - only."
    }
    else{
        errorMessage.innerHTML = ' '

    }
    searchData();
});

// event for search by id
searchID.addEventListener('keyup', function() {
    idSearchVal = this.value;
    searchData();
});

// event for search by gender
searchGender.addEventListener('change', function() {
    genderSearchVal = this.value.toLowerCase();
    console.log(genderSearchVal)
    searchData();
});

// function to filter data according to different search criteria and update table
function searchData() {
    
    let filteredData = jsondata.filter(function(emp) {
        let nameMatch = true;
        let idMatch = true;
        let genderMatch = true;

        // Check name. if the input is not empty, check if name in employees data includes input value
        if (nameSearchVal !== '') {
            nameMatch = emp.name.toLowerCase().includes(nameSearchVal);
        }

        // Check ID
        if (idSearchVal !== '') {
            idMatch = emp.socialNumber.toString().includes(idSearchVal); // Convert socialNumber to string to use .includes
        }

        // Check gender
        if ((genderSearchVal !== '') && (genderSearchVal !== 'none')) {
            genderMatch = emp.gender.toLowerCase() === genderSearchVal;
        }

        return nameMatch && idMatch && genderMatch;
    });

    // fill table with filtered data
    infoTable(filteredData);
}

// constant for ALL table header cells
const columnHead = document.getElementsByTagName("th");
let sortDirection;

function sorting(index) {
    // copy data
    let copyData = jsondata;
    
    // var fo the icon later on
    let text;

    // the value for each header is the key for each column in the json data. this is for the sort method to work and know wich column/data value to work on
    sortDirection = columnHead[index].attributes.value.value;

    // ifelseif statments to sort table according to class name and change/itterate between class names so it works. also change the text var value to that of a matching icon
    if (columnHead[index].className == 'normal') {
        copyData = copyData.sort((a,b) => a[sortDirection] > b[sortDirection] ? 1 : -1);;
        columnHead[index].classList.replace("normal", "asc");
        text =  '<i class="fa-solid fa-sort-up"></i>';
    } 
    else if (columnHead[index].className == 'asc') {
        copyData = copyData.reverse();
        columnHead[index].classList.replace("asc", "desc");
        text = '<i class="fa-solid fa-sort-down"></i>' ;
        // console.log(copyData)
        // console.log(copyOriginalData)
    }
    else if (columnHead[index].className == 'desc') {
        // use the spread syntax method to call the copyOriginalData a.k.a return table/array to original
        copyData = [...copyOriginalData];
        columnHead[index].classList.replace("desc", "normal");
        text = '<i class="fa-solid fa-sort"></i>' ;

    };
    // call the icon span. the index was set to (-1) so that it changes the one we click on not the one next to it. then change the innerHTML according to the if statment
    let icon = document.getElementsByClassName('sortIcon')[index - 1];
    icon.innerHTML = text;

    // fill table with new data
    infoTable(copyData);
    
    // return jsondata to original
    jsondata = [...copyOriginalData];
}

// eventlistener for each column
columnHead[1].addEventListener('click', function () {
    sorting(1);
});
columnHead[2].addEventListener('click', function () {
    sorting(2);
});
columnHead[3].addEventListener('click', function () {
    sorting(3);
});
columnHead[4].addEventListener('click', function () {
    sorting(4);
});
columnHead[5].addEventListener('click', function () {
    sorting(5);
});
columnHead[6].addEventListener('click', function () {
    sorting(6);
});
columnHead[7].addEventListener('click', function () {
    sorting(7);
});
