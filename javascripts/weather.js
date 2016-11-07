"use strict";

var Weather = ( ()=> {

	return {
		weatherCredentials: ()=>{
			return new Promise( (resolve, reject)=> {
				$.ajax({
					method: 'GET',
					url: `../apiKeysWeather.json`
				}).then( (response)=> {
					console.log("response", response);
					resolve(response);
				}, (error)=>{
					reject(error);
				});
			});
		},
		firebaseCredentials: ()=>{
			return new Promise((resolve, reject)=> {
				$.ajax({
					method: 'GET',
					url: `apiKeysFirebase.json`
				}).then((response)=>{
					resolve(response);
				},(error)=>{
					reject(error);
				});
			});
		}
	};
})();