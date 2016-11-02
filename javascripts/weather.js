"use strict";

var Weather = ( ()=> {
let appidKey = {};
let APPID;
	return {
		weatherCredentials: ()=>{
			return new Promise( (resolve, reject)=> {
				$.ajax({
					url: 'apiKeys.json',
					method: 'GET'
				}).then((response)=> {
					console.log("response", response);
					appidKey = response;
					APPID = appidKey.APPID;
					resole(response);
				}, (error)=>{
					reject(error);
				});
			})
		}
	};
})();