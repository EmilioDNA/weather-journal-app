// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');


// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log('Server running');
    console.log(`running on localhost: ${port}`)
}

function makeData(request) {
    let newData = request;
    let newEntry = {
        temperature: newData.temperature,
        date: newData.date,
        feelings: newData.feelings 
    }
    projectData = newEntry;
}


app.get('/all', (request, response) => {
    response.send(projectData);
});

app.post('/add', (request, response) => {
    let data = request.body;
    console.log(data);
    makeData(data);
    console.log(projectData);
    response.send(projectData);
});

