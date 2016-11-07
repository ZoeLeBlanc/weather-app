"use strict";

var Weather = ( (oldFirebase)=>{

	oldFirebase.getUser = (apiKeys, uid)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'GET',
				url:`${apiKeys.databaseURL}/users.json?orderBy="uid"&equalTo="${uid}"`
			}).then( (response)=>{
				let users = [];
				Object.keys(response).forEach( (key)=> {
					response[key].id = key;
					users.push(response[key]);
				});
				resolve(users[0]);
			},(error)=>{
				reject(error);
			});
		});
	};
	oldFirebase.addUser = (apiKeys, newUser)=>{
		return new Promise( (resolve, reject)=> {
			$.ajax({
				method:'POST',
				url:`${apiKeys.databaseURL}/users.json`,
				data: JSON.stringify(newUser),
				dataType: 'json'
			}).then( (response)=>{
				console.log("response", response);
				resolve(response);
			},(error)=>{
				reject(error);
			});
		});
	};

	return oldFirebase;
})(Weather || {});