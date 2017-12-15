$(document).ready(function(){
	console.log('Connected');//sends a message on our console to let us know it is working, for testing purposes			
	let userLogin = someVarName;

		//Use ajax to get a request from the Github API
	$.ajax({
		url:'https://api.github.com/users/'+userLogin,
		//will only get about 50 requests per hour with out an Oauth code, provided by Github
		//These are my own details: dowlind1
		data:{
			client_id:'6199e68ea54464745137',
			client_secret:'e79ecbcec7e674422e563fa4984c6e06cb612066'
		}
	}).done(function(userDetails) {
		$.ajax({
			url:'https://api.github.com/users/'+userLogin+'/followers',

			data:{
				client_id:'6199e68ea54464745137',
				client_secret:'e79ecbcec7e674422e563fa4984c6e06cb612066',
				sort: 'created: asc'
			}
			//console.log(userRepos); test it gives back the array of repos for that user
		}).done(function(userFollowers){
			$.each(userFollowers,function(index, followers){
				$.ajax({
					url:'https://api.github.com/users/'+followers.login,

					data:{
					client_id:'6199e68ea54464745137',
					client_secret:'e79ecbcec7e674422e563fa4984c6e06cb612066',
					sort: 'created: asc'
				}
				//console.log(userRepos); test it gives back the array of repos for that user
				}).done(function(userFollower) {
					//in here will be the profile data and design
				});
			});
		});

	});
});

