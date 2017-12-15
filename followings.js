var someVarName = localStorage.getItem("someVarName");

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
		}).done(function(userFollowings){
			$.each(userFollowings,function(index, following){
				$.ajax({
					url:'https://api.github.com/users/'+following.login,

					data:{
						client_id:'6199e68ea54464745137',
						client_secret:'e79ecbcec7e674422e563fa4984c6e06cb612066',
						sort: 'created: asc'
					}
				//console.log(userRepos); test it gives back the array of repos for that user
				}).done(function(userFollowing) {
					$('#userFollowings').append(`
						<div class="panel panel-default">
							<div class="panel-heading">
								<h3 class="panel-title">${userFollowing.name} - ${userFollowing.login}</h3>
							</div>
							<div class="panel-body">
								<div class="row">
									<div class="col-md-3">
										<img style="width:100%" class="thumbnail" src="${userFollowing.avatar_url}">
										<a class="btn btn-primary btn-block" href="${userFollowing.html_url}">View Profile</a>
									</div>
									<div class="col-md-9">
										<a class="btn btn-danger" href="https://github.com/${userFollowing.login}?tab=repositories">Repositories(Public Only): <span class="badge" >${userFollowing.public_repos}</span></a>
										<a class="btn btn-success" href="https://github.com/${userFollowing.login}?tab=followers">Followers: <span class="badge">${userFollowing.followers}</span></a>    
										<a class="btn btn-info" href="https://github.com/${userFollowing.login}?tab=following">Following: <span class="badge">${userFollowing.following}</span></a>
										<br><br>
										<ul class="list-group">
											<li class="list-group-item">Bio: ${userFollowing.bio}</li>
											<li class="list-group-item">Location: ${userFollowing.location}</li>
										</ul>
									</div>
								</div>	
							</div>
						</div>					
					`);
				});
			});
		});
		$('#profile').html(`
			<h3 class="page-header">Followings:</h3>
			<div id="userFollowings"></div>
		`);
	});
});

