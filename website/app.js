// Creation the Global Variables
let Button = document.getElementById('generate');
const apiKey = '931eed2381738566398412aae43174c2&units=imperial';

// make a new date instance dynamically with java script
let d = new Date();
let newDate = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear();


// After the button is clicked
const start = () => {
	const zipCode = document.getElementById("zip").value;
	const feelingsText = document.getElementById("feelings").value;
	const apiCall = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},&appid=`;
	const fetchApi = collectMyData(apiCall);
	fetchApi.then((data) => {
		const groupData = {
			TheDate: newDate,
			TheFeeling: feelingsText,
			TheTemperature: data.main.temp
		}
		sendData('/add', groupData);
	}).then(() => retrieveData())
};
// Function To get Data from Open Weather Map website
const collectMyData = async (apiCall) => {
	const link = apiCall + apiKey;
	const response = await fetch(link);
	try {
		const data = await response.json();
		return data;
	} catch (error) {
		console.log("error")
	};
};

// Function To send data to local server 
const sendData = async (addRoute, groupData) => {
	const response = await fetch(addRoute, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(groupData)
	});
	try {
		const TheData = await response.json();
	} catch (error) {
		console.log("error");
	}
}
// Function To get data from local server 
const retrieveData = async () => {
	const request = await fetch('/all');
	try {
		// Transform into JSON
		const allData = await request.json()
		// Write updated data to DOM elements
		document.getElementById('temp').innerHTML = Math.round(allData.TheTemperature) + 'degrees';
		document.getElementById('content').innerHTML = allData.TheFeeling;
		document.getElementById("date").innerHTML = allData.TheDate;
	} catch (error) {
		console.log("error", error);
		// appropriately handle the error
	}
}
// The button event 
Button.addEventListener('click', start);
