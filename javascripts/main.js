"use strict";
let apiKeys = {};
let uid = "";
let appidKey = {};
let APPID; 
let cityID;
let zipcodeID;
let degreeID;
let DOMarea = $("#weatherArea");
//Initial View of Current Weather
let checkZip = (userZip) => {
	zipcodeID = "";
	degreeID = "";
	if(userZip === "" || !$.isNumeric(userZip) || userZip.length != 5){
		alert("Please enter a correct zipcode");
		$("#weather-input").focus();
	} else {
		$("#weather-input").val("");
		if ($("#celsius").is(':checked')){
			console.log("hi");
				degreeID = "metric";
				loadWeather(userZip, degreeID);
				zipcodeID = userZip;
			} else {
				degreeID = "imperial";
				loadWeather(userZip, degreeID);
				zipcodeID = userZip;
			}
		
	}
};
//Send zipcode to API and get City ID
let loadWeather = (correctZip, degreeType)=>{
	cityID = "";
	//Load Current Weather
	Weather.loadCurrentWeather(APPID, correctZip).then( (weatherData) => {
		console.log("weatherData", weatherData);
		cityID = weatherData.id;
		let day = 1;
		$("#weather--curent").addClass("active");
		loadForecast(cityID, degreeType, day);
	}).catch( (error)=>{
		console.log("error", error);
	});
};
//City ID to get Forecast 
let loadForecast = (cityNum, degreeType, daysOfWeek)=>{
	
	//Load Forecast Weather
	Weather.forecastDayWeather(APPID, cityNum, degreeType, daysOfWeek).then( (weatherData) => {
		console.log("weatherData", weatherData);
		//Append to DOM
		DOMarea.html("");
		let weatherOutput = "";
		DOMarea.append(`<h1>Forecast for ${weatherData.city.name}</h1>`);
		$.each(weatherData.list, (index, weather)=>{
			if (index % 4 === 0){
				weatherOutput += `<div class="row">`;
				console.log("row");
			}
			let description = weather.weather;
			$.each(description, (index, desc)=>{
				weatherOutput += `<div class="card col s3" id="${index}>"`;
					weatherOutput += `<div class="card-content" id="description">`;
					weatherOutput += `<span class="card-title"> Weather ${desc.description}</span>`;
			});
				weatherOutput += `<div class="card-action">`;
				weatherOutput += `<h5>Day Temperature: ${weather.temp.day}</h5>`;
				weatherOutput += `<h6>Night Temperature: ${weather.temp.night}</h6>`;
				weatherOutput += `</div>`;
				weatherOutput += `<div class="card-action">`;
				weatherOutput += `<p>Day Humidity: ${weather.humidity}</p>`;
				weatherOutput += `<p>Day Pressure: ${weather.pressure}</p>`;
				weatherOutput += `</div>`;	
			
			weatherOutput += `</div>`;
			if ((index-3)%4 === 0){
				weatherOutput += `</div>`;
				console.log("end of row");
			}
		});
		DOMarea.append(weatherOutput);
	}).catch( (error)=>{
		console.log("error", error);
	});
};
//Create Logout Button
function createLogoutButton(){
	Weather.getUser(apiKeys, uid).then( (userResponse)=>{
		$("#logout-container").html("");
		console.log("userResponse", userResponse);
		let currentUsername = userResponse.username;
		let logoutButton = `<button class="btn waves-effect waves-light col s4" id="logoutButton">Logout ${currentUsername}</button>`;
		$("#logout-container").append(logoutButton);
	});
}
function getSearches(){
	Weather.getUser(apiKeys, uid).then( (userResponse)=>{
		$("#userSearches").html("");
		console.log("userResponse", userResponse);
		let currentUsername = userResponse.username;
		let userWelcome = `<ul class="collection with-header"><li class="collection-header" id="collectionHeader"><h5>${currentUsername}'s Saved Searches</h5></li></ul>`;
		$("#userSearches").append(userWelcome);
	});
	Weather.getSearches(apiKeys, uid).then((searches)=> {
				console.log("items from firebase", searches);
		$.each(searches, (index, search)=>{
			let oldSearch = `<a href="#!" class="collection-item" type="${search.degree}">${search.zipcode}</a>`;
			$('#collectionHeader').append(oldSearch);	
		});
	});
	
	
}
//DOM Functions
$(document).ready(function(){
	//Get credentials
	Weather.weatherCredentials().then( (response)=>{
		appidKey = response;
		APPID = appidKey.APPID;
	});
	Weather.firebaseCredentials().then( (keys)=>{
		apiKeys = keys;
		console.log("keys", keys);
		firebase.initializeApp(keys);
	});
	//Clear page on reload
	
	//Register Button
	$("#registerButton").on("click", function(){
		let email = $("#inputEmail").val();
		let password = $("#inputPassword").val();
		let username = $("#inputUsername").val();
		let user = {
			"email": email,
			"password": password
		};
		Weather.registerUser(user).then( (registerResponse)=>{
			console.log("response from register", registerResponse);
			let newUser = {
				"username": username,
				"uid": registerResponse.uid
			};
			return Weather.addUser(apiKeys, newUser);
		}).then( (userResponse)=>{
			console.log("userResponse", userResponse);
			return Weather.loginUser(user);
		}).then( (loginResponse)=>{
			console.log("response from login/register", loginResponse);
			uid = loginResponse.uid;
			createLogoutButton();
			getSearches();
			$("#login-container").addClass("hide");
			$("#weather-container").removeClass("hide");

		});
	});
	//Login Button
	$("#loginButton").on("click", function(){
		let user = {
			"email": $("#inputEmail").val(),
			"password": $("#inputPassword").val()
		};
		Weather.loginUser(user).then( (response)=>{
			console.log("login response", response);
			uid = response.uid;
			createLogoutButton();
			getSearches();
			$("#login-container").addClass("hide");
			$("#weather-container").removeClass("hide");
		});	
	});
	//Logout Button
	$("#logout-container").on("click", "#logoutButton", function(event){
		console.log("logout", event);
		Weather.logoutUser();
		uid = "";
		$("#inputEmail").val("");
		$("#inputPassword").val("");
		$("#inputUsername").val("");
		DOMarea = "";
		$("#login-container").removeClass("hide");
		$("#weather-container").addClass("hide");
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
 				console.log("active");
				checkZip(enteredZip, degreeID);

			}
	});
	//get nav clicks
	$("#weather--curent").on("click", function(event){
		console.log("current");
		let day = 1;
		loadForecast(cityID, tempDegree, day);
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
	//Load Saved Searches
	$("#userSearches").on("click", ".collection-item", function(event){	
		let savedZipcode = event.target.innerHTML;
		let saveDegree = event.target.type;
		checkZip(savedZipcode, saveDegree);
	});
	//Save search
	$("#saveSearch-button").on("click", function(event){
		console.log("weather", $("#weather-input").val());
		console.log("input", $("input:checked").val());
		let newSearch = {
			"zipcode": $("#weather-input").val(),
			"degree": $("input:checked").val(),
			"uid": uid
		};
		Weather.addSearch(apiKeys, newSearch).then( ()=>{
			getSearches();
		});
	});
});

