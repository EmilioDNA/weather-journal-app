/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?'
const apiKey = '5005b90699ba5d9ad6340212068c0177';
// http://api.openweathermap.org/data/2.5/weather?zip=94040&appid=5005b90699ba5d9ad6340212068c0177


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


// DOM variables
const generator = document.getElementById('generate');


// Helper methods
const handleClick = (e) => {
    const zipCode = document.getElementById('zip').value;
    
    getOpenWeather(baseURL, zipCode, apiKey)
    .then((data) => {
        const feelings = document.getElementById('feelings').value;
        postData('/add', {temperature: data.main.temp, date: newDate, feelings})
    })
    .then(
        updateUI()
    )
}

// Async functions 
const getOpenWeather = async (baseURL, zipCode, key) => {
    const urlRequest = baseURL + `zip=${zipCode},us&appid=${key}`;
    console.log(urlRequest);
    const res = await fetch(urlRequest)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

const postData = async (url = '', data = {}) => {
    
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }

}

const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${allData.temperature}`;
        document.getElementById('content').innerHTML = `Feeling: ${allData.feelings}`; 
    } catch(error) {
        console.log("error", error);
    }
}


// Event listeners
generator.addEventListener('click', handleClick);