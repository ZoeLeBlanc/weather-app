"use strict";

var Weather = ( (oldWeather)=>{
	oldWeather.loadCurrentWeather = (APPID, zipCode) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'GET',
				url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${APPID}`
			}).then((response2) => {
				console.log("response2", response2);
				resolve(response2);
			}, (errorResponse) => {
				console.log("weather app fail", errorResponse);
			reject(errorResponse);
			});
		});
	};
	oldWeather.forecastDayWeather = (APPID, cityId, unitType, numbDay) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'GET',
				url: `http://api.openweathermap.org/data/2.5/forecast/daily?id=${cityId}&units=${unitType}&cnt=${numbDay}&APPID=${APPID}`
			}).then((response) => {
				console.log("response", response);
				resolve(response);
			}, (errorResponse)=> {
				console.log("weather app forecast fail", errorResponse);
			});
		
		});
	};
	return oldWeather;
})(Weather || {});