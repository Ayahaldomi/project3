const dataUrl = '../JSON/employees.json';
let newRowLocalArray = JSON.parse(localStorage.getItem("leavelocal")) || [];
let jsondata = [];

//  set initial value to 0 

function startCounter (){
    if(!localStorage.getItem('leavecounter')){
        localStorage.setItem('leavecounter', 0)     }
  }
startCounter();

// Load data on window load
window.onload = async function loadData() {

        const res = await fetch(dataUrl);
        jsondata = await res.json();
        localStorage.setItem("employees", JSON.stringify(jsondata));

        for (let i = 0; i < jsondata.length; i++) {
            const option = document.createElement('option');
            option.textContent = jsondata[i].name;
            option.value = jsondata[i].id;
            itemList.appendChild(option);
        }
        // add rows from local storge
        populateTable(newRowLocalArray);

};

// Function to populate the table from local storage
function populateTable(dataArray) {
    const tableRef = document.getElementById("task-table");
    for (let i = 0; i < dataArray.length; i++) {
        let newRow = tableRef.insertRow(1);
        newRow.classList.add(i);

        let newCell1 = newRow.insertCell(0);
        let newCell2 = newRow.insertCell(1);
        let newCell3 = newRow.insertCell(2);
        let newCell4 = newRow.insertCell(3);
        let newCell5 = newRow.insertCell(4);
        let newCell6 = newRow.insertCell(5);
        let newCell7 = newRow.insertCell(6);

        newCell1.textContent = dataArray[i].name;
        newCell2.textContent = dataArray[i].email;
        newCell3.textContent = dataArray[i].leaveType;
        newCell4.textContent = dataArray[i].reasonForLeave;

        
        newCell5.textContent = dataArray[i].start;
        newCell6.textContent = dataArray[i].dueDate;
        newCell7.innerHTML = `
        <button class="delete-button" onclick="editRow(${newRowLocalArray[i].id},this)"><i class="fa-solid fa-pen-to-square" style="color: #003366;"></i></button>
        <button class="delete-button" onclick="deleteRow(${newRowLocalArray[i].id}, this)"><i class="fa-solid fa-trash" style="color: #003366;"></i></button>`;
        
        // Add scope="row" to the first cell so bootstrap work
        newCell1.setAttribute('scope', 'row'); 
        
    }
}

function enable() {
    var radio1 = document.getElementById('radio1')
    var radio2 = document.getElementById('radio2')
   if  (radio1.checked){
    dayDate1.disabled = false;
    dayDate2.disabled = false;
   }else{
    dayDate1.disabled = true;
    dayDate2.disabled = true;
   }
   if  (radio2.checked){
    hourTime1.disabled = false;
    hourTime2.disabled = false;
   }else{
    hourTime1.disabled = true;
    hourTime2.disabled = true;
   }
}
const dayDate1edit = document.getElementById("dayDate1edit");
const dayDate2edit = document.getElementById("dayDate2edit");
const hourTime1edit = document.getElementById("hourTime1edit");
const hourTime2edit = document.getElementById("hourTime2edit");
function enableedit() {
    var radio1edit = document.getElementById('radio1edit')
    var radio2edit = document.getElementById('radio2edit')
   if  (radio1edit.checked){
    dayDate1edit.disabled = false;
    dayDate2edit.disabled = false;
   }else{
    dayDate1edit.disabled = true;
    dayDate1edit.value = ''
    dayDate2edit.disabled = true;
    dayDate2edit.value = ''
   }
   if  (radio2edit.checked){
    hourTime1edit.disabled = false;
    hourTime2edit.disabled = false;
   }else{
    hourTime1edit.disabled = true;
    hourTime1edit.value = '';
    hourTime2edit.disabled = true;
    hourTime2edit.value = '';
   }
}

    
//display the form and leaveForName

const leaveForName = document.getElementById("leaveForName");

function addLeave() {

    let collection = itemList.value;
    for (let i = 0; i < jsondata.length; i++) {
        if (collection == jsondata[i].id) {
            leaveForName.textContent = jsondata[i].name;
        }
    }
    
    // blur effect
    var containerForAll = document.getElementById('containerForAll');
    containerForAll.classList.toggle('active');
    form.classList.toggle('active');
    var body = document.getElementById('body');
    body.style.overflowY = 'hidden'
    
}

// Function to hide the form
function cancel() {
    // blur effect
    var containerForAll = document.getElementById('containerForAll');
    containerForAll.classList.toggle('active');
    form.classList.toggle('active');
    body.style.overflowY = 'auto'
}
function canceledit() {
    // blur effect
    var containerForAll = document.getElementById('containerForAll');
    containerForAll.classList.toggle('active');
    formEdit.classList.toggle('active');
    body.style.overflowY = 'auto'
}
// Form elements
const itemList = document.getElementById("myselect");
const leaveType = document.getElementById("leaveType");
const reasonForLeave = document.getElementById("reasonForLeave");
const dayDate1 = document.getElementById("dayDate1");
const dayDate2 = document.getElementById("dayDate2");
const hourTime1 = document.getElementById("hourTime1");
const hourTime2 = document.getElementById("hourTime2");
var form = document.getElementById("form");


//get form value and send it to local storage
function addRow() {

    let collection = itemList.value;
    let leaveTypeValue = leaveType.value;
    let reasonForLeaveValue = reasonForLeave.value;
    let dayDate1Value = dayDate1.value;
    let dayDate2Value = dayDate2.value;
    let hourTime1Value = hourTime1.value;
    let hourTime2Value = hourTime2.value;

    

    for (let i = 0; i < jsondata.length; i++) {
        if (collection == jsondata[i].id) {
            // calls counter
            let currentCount = parseInt(localStorage.getItem('leavecounter'));
            
            newRowInfo = {
                "name": jsondata[i].name,
                "email": jsondata[i].email,
                "leaveType": leaveTypeValue,
                "reasonForLeave": reasonForLeaveValue,
                "start": dayDate1Value + hourTime1Value,
                "dueDate": dayDate2Value + hourTime2Value,
                "id": currentCount++,
            };

            // push new row and send new row to local storage
            newRowLocalArray.push(newRowInfo);
            localStorage.setItem("leavelocal", JSON.stringify(newRowLocalArray));
            localStorage.setItem('leavecounter', currentCount);

            // calls populateTable function to display old and new rows 
            populateTable(newRowLocalArray);
            window.location.reload()

            // Hidding the form


            // blur effect
            var containerForAll = document.getElementById('containerForAll');
            containerForAll.classList.toggle('active');
            form.classList.toggle('active');
            body.style.overflowY = 'auto'
            
        }
    }
}


function deleteRow(id, button) {
    let confirm = document.getElementById('confirm');
    let rowCancel = document.getElementById('rowCancel');
    let rowOk = document.getElementById('rowOk');
    confirm.classList.toggle('active');
    var containerForAll = document.getElementById('containerForAll');
            containerForAll.classList.toggle('active');

    
    rowOk.addEventListener('click', function() {
        // find the button parent
        var row = button.parentNode.parentNode;
        // Remove the row from the table
        row.parentNode.removeChild(row);

        let storedData = JSON.parse(localStorage.getItem('leavelocal'));
                storedData = storedData.filter(dataArray => dataArray.id !== id);
                localStorage.setItem('leavelocal', JSON.stringify(storedData));
        
        window.location.reload()
    })


    rowCancel.addEventListener('click', function() {
        confirm.classList.toggle('active');
        var containerForAll = document.getElementById('containerForAll');
            containerForAll.classList.toggle('active');
        

    });
           
}

function editRow(id, button) {
    var containerForAll = document.getElementById('containerForAll');
    containerForAll.classList.toggle('active');
    formEdit.classList.toggle('active');
    body.style.overflowY = 'hidden';

    let row = button.parentNode.parentNode;
    // let idedit = row.dataset.id;
    let cells = row.getElementsByTagName('td');


    let name = cells[0].textContent;
    let leaveType = cells[2].textContent;
    let reasonForLeave = cells[3].textContent;
    let startDateTime = cells[4].textContent.split('T');
    let dueDateTime = cells[5].textContent.split('T');

    let start = startDateTime; 
    let hourTime1 = startDateTime;
    let dueDate = dueDateTime; 
    let hourTime2 = dueDateTime ; 

   
    document.getElementById('leaveForNameedit').textContent = name;
    document.getElementById('leaveTypeedit').value = leaveType;
    document.getElementById('reasonForLeaveedit').value = reasonForLeave;
    document.getElementById('dayDate1edit').value = start;
    document.getElementById('hourTime1edit').value = hourTime1;
    document.getElementById('dayDate2edit').value = dueDate;
    document.getElementById('hourTime2edit').value = hourTime2;
   

    let saveBtn = document.getElementById('saveBtn');
    saveBtn.addEventListener('click', function(){
    let leaveTypeValue = document.getElementById('leaveTypeedit').value;
    let reasonForLeaveValue = document.getElementById('reasonForLeaveedit').value;
    let dayDate1Value = document.getElementById('dayDate1edit').value;
    let hourTime1Value = document.getElementById('hourTime1edit').value || '';
    let dayDate2Value = document.getElementById('dayDate2edit').value;
    let hourTime2Value = document.getElementById('hourTime2edit').value || ''; 

    let currentData = JSON.parse(localStorage.getItem('leavelocal')) || [];
        leaveupdate = false;
    for (let i = 0; i < currentData.length; i++) {
        if (currentData[i].id == id) {
            currentData[i].leaveType = leaveTypeValue;
            currentData[i].reasonForLeave = reasonForLeaveValue;
            currentData[i].start = dayDate1Value + (hourTime1Value ? 'T' + hourTime1Value : '');
            currentData[i].dueDate = dayDate2Value + (hourTime2Value ? 'T' + hourTime2Value : '');
            leaveupdate = true;
            break;
        }
    }

        if (leaveupdate) {
            localStorage.setItem('leavelocal', JSON.stringify(currentData));
            populateTable(newRowLocalArray);
            window.location.reload()
            console.log('leavelocal updated successfully:', currentData);
        } else {
            console.error('Task with id ' + id + ' not found.');
        }


    })

    
}

