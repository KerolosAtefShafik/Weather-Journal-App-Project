// Creation an object
projectData = {};
//installing express packages to make local server 
const express = require('express');
const app = express();
// installing body-barser package
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
// installing cors package
const cors = require('cors');
app.use(cors());
// Running local server
app.use(express.static('website'))
const port = 4000;
const server = app.listen(port, listening);

function listening() {
	console.log(`server is running`);
	console.log(`Running localhost:${port}`);
}
//routes
// first step :send data to the server 
const postData = (req, res) => {
	projectData = req.body;
	res.send(projectData);
};
app.post('/add', postData)
// second step: get data from the server
const getData = (req, res) => {
	res.send(projectData);
};
app.get('/all', getData)
