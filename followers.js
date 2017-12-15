var userVar = localStorage.getItem("userVar");
$(document).ready(function(){
	console.log('Connected');//sends a message on our console to let us know it is working, for testing purposes			
	let userLogin = userVar;

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
					$('#userFollowers').append(`
						  <div class="panel panel-default">
						  <div class="panel-heading">
						  	<h3 class="panel-title">${userFollower.name} - ${userFollower.login}</h3>
						  </div>
						  <div class="panel-body">
						  <div class="row">
						    	<div class="col-md-3">
						    		<img style="width:100%" class="thumbnail" src="${userFollower.avatar_url}">
						  			<a class="btn btn-primary btn-block" href="${userFollower.html_url}">View Profile</a>
						  		</div>
						  		<div class="col-md-9">
							  		<a class="btn btn-danger" href="https://github.com/${userFollower.login}?tab=repositories">Repositories(Public Only): <span class="badge" >${userFollower.public_repos}</span></a>
									<a class="btn btn-success" href="https://github.com/${userFollower.login}?tab=followers">Followers: <span class="badge">${userFollower.followers}</span></a>    
									<a class="btn btn-info" href="https://github.com/${userFollower.login}?tab=following">Following: <span class="badge">${userFollower.following}</span></a>
							  		<br><br>
							  		<ul class="list-group">
							  			<li class="list-group-item">Bio: ${userFollower.bio}</li>
							  			<li class="list-group-item">Location: ${userFollower.location}</li>
							  		</ul>
						  		</div>	
						 	</div>
						</div>					
					`);

				});
			});
		});
		$('#profile').html(`
			<h3 class="page-header">Followers:</h3>
			<div id="userFollowers"></div>
		`);
	});
});

