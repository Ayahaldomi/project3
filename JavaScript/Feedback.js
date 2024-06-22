const employeesInfoAPI = '../JSON/employees.json';
let currentPage = 1;
const cardsPerPage = 6;
let localDataName

async function loadData() {
    localDataName = JSON.parse(localStorage.getItem('feedbacks'));
    let jsonData;
    const employeeData = await fetch(employeesInfoAPI); 
    jsonData = await employeeData.json();


    localDataName.reverse();

    function feedbackCards(json, local, page) {
        let cardsContainer = document.getElementById('cardsContainer'); 
        cardsContainer.innerHTML = ''; 

        let startIndex = (page - 1) * cardsPerPage;
        let endIndex = Math.min(startIndex + cardsPerPage, local.length);

        for (let i = startIndex; i < endIndex; i++) {
            let localName = local[i].name.toLowerCase();
            let imageSRC = getImageSrc(json, localName);

            let row = `<div class="card">
                <div class="header">
                <div class="cornerImage">
                    <img src="${imageSRC}" alt="" class="feedbackImage">
                </div>
                <p class="cardTitle">${local[i].name}</p>
                </div>
                <p class="smallDesc">${local[i].message}</p>
            </div>`;
            
            cardsContainer.innerHTML += row;
        }

        updatePagination(local.length, page);
    }

    function getImageSrc(json, localName) {
        for (let a = 0; a < json.length; a++) {
            let jsonName = json[a].name.toLowerCase();
            if (jsonName === localName) {
                return json[a].Image;
            }
        }

    }

    function updatePagination(totalItems, page) {
        let totalPages = Math.ceil(totalItems / cardsPerPage);
        document.getElementById('pageInfo').innerText = `Page ${page} of ${totalPages}`;
        document.getElementById('prevPage').disabled = page === 1;
        document.getElementById('nextPage').disabled = page === totalPages;
    }

    feedbackCards(jsonData, localDataName, currentPage);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadData();
    }
}

function nextPage() {
    localDataName = JSON.parse(localStorage.getItem('feedbacks'));
    if (currentPage < Math.ceil(localDataName.length / cardsPerPage)) {
        currentPage++;
        loadData();
    }
}

loadData()
