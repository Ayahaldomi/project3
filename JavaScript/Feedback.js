const employeesInfoAPI = 'https://666f2849f1e1da2be5222215.mockapi.io/date';


async function loadData() {
    let jsonData

    const employeeData = await fetch(employeesInfoAPI); 
    console.log('test')
    jsonData = await employeeData.json();
    // console.log(jsonData)

    let localDataName = JSON.parse(localStorage.getItem('feedbacks'));


    function feedbackCards(json, local) {

        let cardsContainer = document.getElementById('cardsContainer'); 
        
        cardsContainer.innerHTML = ''; 

        console.log(json)

        for (let i = local.length - 1; i > local.length - 7; i--) {

            let localName = local[i].name.toLowerCase();
            let imageSRC;

            

            

                function imageGetSRC(json) {

                    for (let a = 0; a < json.length; a++) {
                    let jsonName = json[a].name.toLowerCase();
                    
                    if (jsonName === localName) {
                        imageSRC = json[a].Image
                        console.log('esg')
                        // console.log(imageSRC)
                        return imageSRC
                        // return allImg = imageSRC[a]
                    }
                    // else {
                    //     imageSRC = 'images/default-avatar-icon-of-social-media-user-vector.jpg'
                    //     return imageSRC
                    // }
                }
                }
                console.log(imageGetSRC(json))
                
           

            
            let row = `<div class="card">
                <div class="header">
                <div class="cornerImage">
                    <img src="${imageGetSRC(json)}"  alt="" class="feedbackImage">
                </div>
                <p class="cardTitle">${local[i].name}</p>
                </div>
                <p class="smallDesc">${local[i].message}</p>
            </div>`;
            
            
            
            cardsContainer.innerHTML += row;

        };
    }
    feedbackCards(jsonData, localDataName)

};
loadData()
