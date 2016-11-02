"use strict";

var Weather = ( (oldWeather)=>{
	oldWeather.loadCurrentWeather = (APPID, zipCode) => {
		return new Promise ((resolve, reject) => {
			$.ajax({
				method: 'GET',
				url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&APPID=${APPID}`
			}).then((response2) => {
				console.log("response2", response2);
				// cityID = response2.id;
				resolve(response2);
			}, (errorResponse) => {
				console.log("weather app fail", errorResponse);
			reject(errorResponse);
			});
	};
})(Weather || {});