"use strict";

var Weather = ( ()=> {

	return {
		weatherCredentials: ()=>{
			return new Promise( (resolve, reject)=> {
				$.ajax({
					method: 'GET',
					url: `../apiKeys.json`
				}).then( (response)=> {
					console.log("response", response);
					resolve(response);
				}, (error)=>{
					reject(error);
				});
			});
		}
	};
})();