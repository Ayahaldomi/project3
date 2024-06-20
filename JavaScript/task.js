const dataUrl = '../JSON/employees.json';
let count = 0;
let newRowLocalArray = JSON.parse(localStorage.getItem("taskLocal")) || [];
let jsondata = [];

function startCounter (){
    if(!localStorage.getItem('taskcounter')){
        localStorage.setItem('taskcounter', 0)     }
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
        // add rows frof local storge
        populateTable(newRowLocalArray);

};

// Function to populate the table from local storage
function populateTable(dataArray) {
    const taskTable = document.getElementById("task-table");
    for (let i = 0; i < dataArray.length; i++) {
        let newRow = taskTable.insertRow(1);
        newRow.classList.add(i);

        let newCell1 = newRow.insertCell(0);
        let newCell2 = newRow.insertCell(1);
        let newCell3 = newRow.insertCell(2);
        let newCell4 = newRow.insertCell(3);
        let newCell5 = newRow.insertCell(4);
        let newCell6 = newRow.insertCell(5);
        let newCell7 = newRow.insertCell(6);
        let newCell8 = newRow.insertCell(7);
        let newCell9 = newRow.insertCell(8);

        newCell1.textContent = dataArray[i].name;
        newCell2.textContent = dataArray[i].email;
        newCell3.textContent = dataArray[i].task;

        
        newCell6.textContent = dataArray[i].start;
        newCell7.textContent = dataArray[i].dueDate;
        newCell8.textContent = dataArray[i].description;
        newCell9.innerHTML = `<button class="delete-button" onclick="deleteRow(${newRowLocalArray[i].id}, this)"><i class="fa-solid fa-eraser" width="100" style="color: #002142;"></i></button>`;
        
        // Add scope="row" to the first cell so bootstrap work
        newCell1.setAttribute('scope', 'row'); 

        // add class to css style the value
        if (dataArray[i].priority === "Low") {
            newCell5.innerHTML = `<span class="lowP">${dataArray[i].priority}</span>`;
        }
        else if (dataArray[i].priority === "Medium") {
            newCell5.innerHTML = `<span class="mediumP">${dataArray[i].priority}</span>`;
        }
        else if (dataArray[i].priority === "High") {
            newCell5.innerHTML = `<span class="highP">${dataArray[i].priority}</span>`;
        }

        // add class to css style the value
        if (dataArray[i].status === "To-do") {
            newCell4.innerHTML = `<span class="TodoS">${dataArray[i].status}</span>`;
        } 
        else if (dataArray[i].status === "In Progress") {
            newCell4.innerHTML = `<span class="inProgressS">${dataArray[i].status}</span>`;
        } 
        else if (dataArray[i].status === "Done") {
            newCell4.innerHTML = `<span class="doneS">${dataArray[i].status}</span>`;
        }
        
    }
}


    
//display the form and TaskForName

const TaskForName = document.getElementById("TaskForName");

function addtask() {
    // form.style.display = 'inline';
    let collection = itemList.value;
    for (let i = 0; i < jsondata.length; i++) {
        if (collection == jsondata[i].id) {
            TaskForName.textContent = jsondata[i].name;
        }
    }
    
    // blur effect
    var blur = document.getElementById('blur');
    blur.classList.toggle('active');
    form.classList.toggle('active');

    var body = document.getElementById('body');
    body.style.overflowY = 'hidden'
    
}

// Function to hide the form
function cancel() {
    // form.style.display = 'none';
    // blur effect
    var blur = document.getElementById('blur');
    blur.classList.toggle('active')
    form.classList.toggle('active');
    body.style.overflowY = 'auto'
}
// Form elements
const itemList = document.getElementById("myselect");
const taskTitle = document.getElementById("taskTitle");
const Status = document.getElementById("status");
const priority = document.getElementById("priority");
const startDate = document.getElementById("startDate");
const dueDate = document.getElementById("dueDate");
const description = document.getElementById("description");
var form = document.getElementById("form");


//add a new row to the table and local storage
function addRow() {
    // for required field
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    let collection = itemList.value;
    let taskTitleValue = taskTitle.value;
    let statusValue = Status.value;
    let priorityValue = priority.value;
    let startDateValue = startDate.value;
    let dueDateValue = dueDate.value;
    let descriptionValue = description.value;

    

    for (let i = 0; i < jsondata.length; i++) {
        if (collection == jsondata[i].id) {
            // calls counter
            let currentCount = parseInt(localStorage.getItem('taskcounter'));

            const newRowInfo = {
                "name": jsondata[i].name,
                "email": jsondata[i].email,
                "task": taskTitleValue,
                "status": statusValue,
                "priority": priorityValue,
                "start": startDateValue,
                "dueDate": dueDateValue,
                "description": descriptionValue,
                "id": currentCount++,
            };

            // push new row and send new row to local storage
            newRowLocalArray.push(newRowInfo);
            localStorage.setItem("taskLocal", JSON.stringify(newRowLocalArray));
            localStorage.setItem('taskcounter', currentCount);
            console.log(localStorage.getItem("taskLocal"));

            // calls populateTable function to display old and new rows 
            populateTable(newRowLocalArray);
            window.location.reload()
        

            
            // Hidding the form
            // form.style.display = 'none';

            // blur effect
            var blur = document.getElementById('blur');
            blur.classList.toggle('active');
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
    rowOk.addEventListener('click', function() {
    
        var row = button.parentNode.parentNode;
        // find the button parent
        row.parentNode.removeChild(row);

        let storedData = JSON.parse(localStorage.getItem('taskLocal'));
                storedData = storedData.filter(dataArray => dataArray.id !== id);
                localStorage.setItem('taskLocal', JSON.stringify(storedData));
        
        window.location.reload()
    });
    
    rowCancel.addEventListener('click', function() {
        confirm.classList.toggle('active');
        

    });
            
}

// localStorage.clear()



