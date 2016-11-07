"use strict";

var Weather = ( (oldFirebase)=>{

	oldFirebase.getSearches = (apiKeys, uid)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'GET',
				url:`${apiKeys.databaseURL}/searches.json?orderBy="uid"&equalTo="${uid}"`
			}).then( (response)=>{
				let searches = [];
				Object.keys(response).forEach( (key)=> {
					response[key].id = key;
					searches.push(response[key]);
				});
				resolve(response);
			},(error)=>{
				reject(error);
			});
		});
	};
	oldFirebase.addSearch = (apiKeys, newSearch)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'POST',
				url:`${apiKeys.databaseURL}/searches.json`,
				data: JSON.stringify(newSearch),
				dataType: 'json'
			}).then( (response)=>{
				console.log("response", response);
				resolve(response);
			},(error)=>{
				reject(error);
			});
		});
	};
	oldFirebase.deleteSearch = (apiKeys , searchID)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'DELETE',
				url:`${apiKeys.databaseURL}/searches/${searchID}.json`
			}).then( (response)=>{
				console.log("response from delete", response);
				resolve(response);
			},(error)=>{
				console.log("error from delete", error);
				reject(error);
			});
		});
	};
	return oldFirebase;

})(Weather || {});