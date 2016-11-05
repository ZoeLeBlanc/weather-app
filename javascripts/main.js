"use strict";
let appidKey = {};
let APPID; 
let cityID;
let zipcodeID;
let degreeID;
let tempDegree;

//Initial View of Current Weather
let checkZip = (userZip) => {
	zipcodeID = "";
	degreeID = "";
	cityID = "";
	tempDegree = "";
	if(userZip === "" || !$.isNumeric(userZip) || userZip.length != 5){
		alert("Please enter a correct zipcode");
		$("#weather-input").focus();
	} else {
		$("#weather-input").val("");
		if ($("#celsius").is(':checked')){
			console.log("hi");
				tempDegree = "metric";
				loadWeather(userZip, tempDegree);
				zipcodeID = userZip;
				degreeID = tempDegree;
			} else {
				tempDegree = "imperial";
				loadWeather(userZip, tempDegree);
				zipcodeID = userZip;
				degreeID = tempDegree;
			}
		
	}
};

let loadWeather = (correctZip, degreeType)=>{
	//Load Current Weather
	Weather.loadCurrentWeather(APPID, correctZip).then( (weatherData) => {
		console.log("weatherData", weatherData);
		cityID = weatherData.id;
		let day = 1;
		loadForecast(cityID, degreeType, day);
	}).catch( (error)=>{
		console.log("error", error);
	});
};

let loadForecast = (cityNum, degreeType, daysOfWeek)=>{
	let DOMarea = $("#weatherArea");
	//Load Forecast Weather
	Weather.forecastDayWeather(APPID, cityNum, degreeType, daysOfWeek).then( (weatherData) => {
		console.log("weatherData", weatherData);
		//Check how many days of week requested
		// if (daysOfWeek === 3){
		// 	DOMarea = $("#threeDayWeather");
		// } else if (daysOfWeek === 7){
		// 	DOMarea = $("#sevenDayWeather");
		// } else {
		// 	DOMarea = $("#currentWeather");
		// }
		DOMarea.html("");
		let weatherOutput = "";
		DOMarea.append(`<h1>Forecast for ${weatherData.city.name}</h1>`);
		$.each(weatherData.list, (index, weather)=>{
			if (index % 3 === 0){
				weatherOutput += `<div class="row">`;
			}
				weatherOutput += `<div class="col-md-4">`;
				weatherOutput += `<div class="card" id="${index}>"`;
					weatherOutput += `<div class="card-block" id="dayTime">`;
						weatherOutput += `<h4> Day Temperature: ${weather.temp.day}</h4>`;
					weatherOutput += `</div>`;
					weatherOutput += `<div class="card-block" id="nightTime">`;
						weatherOutput += `<h4> Night Temperature: ${weather.temp.night}</h4>`;
					weatherOutput += `</div>`;
					weatherOutput += `<li class="list-group-item">Humidity: ${weather.humidity}</li>`;
					weatherOutput += `<li class="list-group-item">Pressure: ${weather.pressure}</li>`;	
			let description = weather.weather;
			$.each(description, (index, desc)=>{
				weatherOutput += `<div class="card-block" id="description">`;
				weatherOutput += `<p>${desc.description}</p>`;
				weatherOutput += `</div>`;
				console.log("description", desc.description);
			});
			weatherOutput += `</div>`;
			weatherOutput += `</div>`;
			if ((index-2)%3 === 0){
				weatherOutput += `</div>`;
			}
		});
		DOMarea.append(weatherOutput);
	}).catch( (error)=>{
		console.log("error", error);
	});
};
//DOM Functions
$(document).ready(function(){
	Weather.weatherCredentials().then( (response)=>{
		appidKey = response;
		APPID = appidKey.APPID;
	});
	
	//get zipcode
	$('#weather-input').keypress( (event)=>{
		if (event.which == 13){
			if (!$("input[name='degree']:checked").val("")) {
   				alert('Pick degree!');
			}
			else {
 				degreeID = $("input[name='degree']:checked").val();
 				let enteredZip = $('#weather-input').val();
				checkZip(enteredZip, degreeID);
			}
			
		} 
	});
	//get current weather
	$('#getWeather-button').on("click", (event)=>{
		if (!$("input:checked").val()) {
   				alert('Pick degree!');
			}
			else {
 				degreeID = $("input:checked").val();
 				console.log("degreeID", degreeID);
 				let enteredZip = $('#weather-input').val();
				checkZip(enteredZip, degreeID);
			}
	});
	//get nav clicks
	$("#weather--curent").on("click", function(event){
		console.log("current");
		let day = 1;
		loadForecast(cityID, tempDegree, day);
		// if ($("#weather--curent").hasClass("hide")){
			
			$("#weather--curent").removeClass("hide");
			$("#weather--curent").addClass("show");
			console.log("hide");
		// }
		
	});
	$("#weather--three").on("click", function(event){
		console.log("three", tempDegree);
		let day = 3;
		loadForecast(cityID, tempDegree, day);
	});	
	$("#weather--seven").on("click", function(event){
		console.log("seven", tempDegree);
		let day = 7;

		loadForecast(cityID, tempDegree, day);
	});
});

