let countryList = document.getElementsByClassName("countryList")[0];
let listHoliday = document.getElementsByClassName("listHoliday")[0];
let currentCountryCode = '';

function fetchHolidays(countryCode) {
    fetch(`https://date.nager.at/api/v3/publicholidays/2024/${countryCode}`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(data => {
        listHoliday.innerHTML = ''; // Clear previous holidays
        data.forEach(event => {
            let listEvent = document.createElement("div");
            listEvent.classList.add("listEvent");
            let countryEvent = document.createElement("div");
            countryEvent.classList.add("countryEvent");
            countryEvent.innerHTML = event.date;
            let eventName = document.createElement("div");
            eventName.classList.add("eventName");
            eventName.innerHTML = event.name;
            listEvent.append(countryEvent, eventName);
            listHoliday.append(listEvent);
        });
    })
    .catch(error => console.error('Error fetching holidays:', error));
}

function setActiveCountry(element) {
    document.querySelectorAll('.listOfcountry').forEach(el => el.classList.remove('active'));
    element.classList.add('active');
}

fetch("https://restcountries.com/v3.1/all", {
    method: "GET"
})
.then(response => response.json())
.then(data => {
    let initialCountryCode = 'CH'; // Set Switzerland as the default country code
    data.forEach(element => {
        let listOfcountry = document.createElement("div");
        listOfcountry.classList.add("listOfcountry");
        listOfcountry.dataset.code = element.cca2; // Add country code as a data attribute
        let countryImgBlock = document.createElement("div");
        countryImgBlock.classList.add("countryImgBlock");
        let countryImg = document.createElement("img");
        countryImg.classList.add("countryImg");
        countryImg.src = element.flags.png;
        let countryName = document.createElement("div");
        countryName.classList.add("countryName");
        countryName.innerHTML = element.name.common;
        countryImgBlock.appendChild(countryImg);
        listOfcountry.append(countryImgBlock, countryName);
        countryList.append(listOfcountry);
        
        // Check if the current country is Switzerland
        if (element.cca2 === initialCountryCode) {
            currentCountryCode = initialCountryCode;
            setActiveCountry(listOfcountry);
            fetchHolidays(currentCountryCode);
        }
    });

    // Add event listeners to country items
    document.querySelectorAll('.listOfcountry').forEach(item => {
        item.addEventListener('click', () => {
            currentCountryCode = item.dataset.code;
            setActiveCountry(item);
            fetchHolidays(currentCountryCode);
        });
    });
})
.catch(error => console.error('Error fetching countries:', error));
