"use strict";
let appidKey = {};

let loadJSON = (zipCode) => {
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

let checkZip = (userZip) => {
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
			} else {
				tempDegree = "fahrenheit";
				loadWeather(userZip, tempDegree);
			}
		
	}
};

let loadWeather = (correctZip, degreeType)=>{
	loadJSON(correctZip).then( (weatherData) => {
		console.log("weatherData", weatherData);
		$('#currentWeather').html("");
		$('#currentWeather').append(`<h1>Current Weather in ${weatherData.name}</h1>`);
		let temp = weatherData.main.temp;
		if (degreeType = "celsius"){
				console.log("temp", temp);
				let finalTemp = temp - 273.15;
				console.log("finalTemp", finalTemp);
				$('#currentWeather').append(`<div>${finalTemp}</div>`);

		} else {
				let finalTemp = ((temp - 273.15)*9/5)+32;
				$('#currentWeather').append(`<div>${finalTemp}</div>`);
		}
			

		
		$.each(weatherData, (index, weather)=>{
			$('#currentWeather').append(`<div>${weather}</div>`);
			
		});
	}).catch( (error)=>{
		console.log("error", error);
	});
};

$(document).ready(function(){
	$('#weather-input').keypress( (event)=>{
		if (event.which == 13){
			let enteredZip = $('#weather-input').val();
			checkZip(enteredZip);
		} 
	});
	$('#getWeather-button').on("click", (event)=>{
		let enteredZip = $('#weather-input').val();
		console.log("enteredZip", enteredZip.length);
			checkZip(enteredZip);
		});
});

