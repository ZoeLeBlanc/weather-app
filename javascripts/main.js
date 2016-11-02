"use strict";
// const weater = ('./weather');
let appid; 
let cityID;
let zipcodeID;
let degreeID;

//Weather JSON
let loadCurrentWeather = (zipCode) => {
	return new Promise ((resolve, reject) => {
		$.ajax({
			url: 'apiKeys.json',
			method: 'GET'
		}).then((response)=> {
			console.log("response", response);
			appidKey = response;
			let APPID = appidKey.APPID;
			$.ajax({
				method: 'GET',
				url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${APPID}`
			}).then((response2) => {
				console.log("response2", response2);
				// cityID = response2.id;
				resolve(response2);
			}, (errorResponse2)=> {
				console.log("weather app fail", errorResponse2);
			});
		}, (errorResponse) => {
		console.log("weather app fail", errorResponse);
		reject(errorResponse);
		});
	});
};

let forecastDayWeather = (cityId, numbDay) => {
	return new Promise ((resolve, reject) => {
		$.ajax({
			url: 'apiKeys.json',
			method: 'GET'
		}).then((response)=> {
			console.log("response", response);
			appidKey = response;
			let APPID = appidKey.APPID;
			$.ajax({
				method: 'GET',
				url: `http://api.openweathermap.org/data/2.5/forecast/daily?id=${cityId}&cnt=${numbDay}&APPID=${APPID}`
			}).then((response2) => {
				console.log("response2", response2);
				resolve(response2);
			}, (errorResponse2)=> {
				console.log("weather app forecast fail", errorResponse2);
			});
		}, (errorResponse) => {
		console.log("weather app forecast fail", errorResponse);
		reject(errorResponse);
		});
	});
};
//Initial View of Current Weather
let checkZip = (userZip) => {
	zipcodeID = "";
	degreeID = "";
	cityID = "";
	let tempDegree;
	if(userZip === "" || !$.isNumeric(userZip) || userZip.length != 5){
		alert("Please enter a correct zipcode");
		$("#weather-input").focus();
	} else {
		$("#weather-input").val("");
		if ($("#celsius").is(':checked')){
			console.log("hi");
				tempDegree = "celsius";
				loadWeather(userZip, tempDegree);
				zipcodeID = userZip;
				degreeID = tempDegree;
			} else {
				tempDegree = "fahrenheit";
				loadWeather(userZip, tempDegree);
				zipcodeID = userZip;
				degreeID = tempDegree;
			}
		
	}
};

let loadWeather = (correctZip, degreeType)=>{
	//Load Current Weather
	loadCurrentWeather(correctZip).then( (weatherData) => {
		console.log("weatherData", weatherData);
		cityID = weatherData.id;
		$('#currentWeather').html("");
		$('#currentWeather').append(`<h1>Current Weather in ${weatherData.name}</h1>`);
		//calculate type of temp selected
		let temp = weatherData.main.temp;
		if (degreeType === "celsius"){
				console.log("temp", temp);
				let finalTemp = temp - 273.15;
				console.log("finalTemp", finalTemp);
				$('#currentWeather').append(`<div>${finalTemp.toFixed(0)}</div>`);

		} else {
				let finalTemp = ((temp - 273.15)*9/5)+32;
				$('#currentWeather').append(`<div>${finalTemp.toFixed(0)}</div>`);
		}
		//Print temp features to DOM
		$('#currentWeather').append(`<div>${weatherData.main.humidity}</div>`);
		$('#currentWeather').append(`<div>${weatherData.main.pressure}</div>`);
		$.each(weatherData.weather, (index, weather)=>{
			$('#currentWeather').append(`<div>${weather.description}</div>`);	
		});
	}).catch( (error)=>{
		console.log("error", error);
	});
};

let loadForecast = (cityNum, degreeType, daysOfWeek)=>{
	//Load Current Weather
	forecastDayWeather(cityNum, daysOfWeek).then( (weatherData) => {
		console.log("weatherData", weatherData);
		$('#currentWeather').html("");
		$('#currentWeather').append(`<h1>Current Weather in ${weatherData.name}</h1>`);
		//calculate type of temp selected
		let temp = weatherData.main.temp;
		if (degreeType === "celsius"){
				console.log("temp", temp);
				let finalTemp = temp - 273.15;
				console.log("finalTemp", finalTemp);
				$('#currentWeather').append(`<div>${finalTemp.toFixed(0)}</div>`);

		} else {
				let finalTemp = ((temp - 273.15)*9/5)+32;
				$('#currentWeather').append(`<div>${finalTemp.toFixed(0)}</div>`);
		}
		//Print temp features to DOM
		$('#currentWeather').append(`<div>${weatherData.main.humidity}</div>`);
		$('#currentWeather').append(`<div>${weatherData.main.pressure}</div>`);
		$.each(weatherData.weather, (index, weather)=>{
			$('#currentWeather').append(`<div>${weather.description}</div>`);	
		});
	}).catch( (error)=>{
		console.log("error", error);
	});
};
//DOM Functions
$(document).ready(function(){
	
	//get zipcode
	$('#weather-input').keypress( (event)=>{
		if (event.which == 13){
			let enteredZip = $('#weather-input').val();
			checkZip(enteredZip);
		} 
	});
	//get current weather
	$('#getWeather-button').on("click", (event)=>{
		let enteredZip = $('#weather-input').val();
		console.log("enteredZip", enteredZip.length);
			checkZip(enteredZip);
	});
	//get 
	$(".nav").on("click", (event)=>{
		console.log("link click", event);
	});
});

