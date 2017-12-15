
$(document).ready(function(){
	console.log('Connected');//sends a message on our console to let us know it is working, for testing purposes
	$('#searchBox').on('keyup', function(input){
		console.log('character entry');//used to test that for each time the user inputs a character to the search box, it will appear on console
		console.log('input.target.value');//this will give the value of the text entered at each point
		let userLogin = input.target.value;
    		
		//Use ajax to get a request from the Github API
		$.ajax({
			url:'https://api.github.com/users/'+userLogin,
			//will only get about 50 requests per hour with out an Oauth code, provided by Github
			//These are my own details: dowlind1
			data:{
				client_id:'6199e68ea54464745137',
				client_secret:'e79ecbcec7e674422e563fa4984c6e06cb612066'
			}
		}).done(function(userDetails) {//returns details, which is the user details
			console.log(userDetails);
			//details for each API request
			//used to test the visualization on the screen in below
			$.ajax({
				url:'https://api.github.com/users/'+userLogin+'/repos',
				
				data:{
					client_id:'6199e68ea54464745137',
					client_secret:'e79ecbcec7e674422e563fa4984c6e06cb612066',
					sort: 'created: asc'
				}
			//console.log(userRepos); test it gives back the array of repos for that user
			}).done(function(userRepos){
				$.each(userRepos,function(index, repo){
					$('#userRepos').append(`
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="row">
									<ul class="list-group">
										<div class="col-md-10">
											<li class="list-group-item"><strong>${repo.name}</strong>: ${repo.description}
											<li class="list-group-item">Created: ${repo.created_at}</li>
											<li class="list-group-item">Language: ${repo.language}</li>   
											<li class="list-group-item">Size: ${repo.size}</li>
											<a class="btn btn-danger" href="${repo.html_url}"><span class="badge" >Repo Page</span></a>
											<br><br>
										</div>
									</ul>
								</div>
							</div>
						</div>

					`);
				});
			});
			$('#profile').html(`
				<div class="panel panel-default">
				  <div class="panel-heading">
					<h3 class="panel-title">${userDetails.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
					<div class="col-md-3">
						<img style="width:100%" class="thumbnail" src="${userDetails.avatar_url}">
						<a class="btn btn-primary btn-block" href="${userDetails.html_url}">View Profile</a>
					</div>
					<div class="col-md-9">
						<a class="btn btn-danger" href="https://github.com/${userDetails.login}?tab=repositories">Repositories(Public Only): <span class="badge" >${userDetails.public_repos}</span></a>
						<a class="btn btn-success" href="followers.html">Followers: <span class="badge">${userDetails.followers}</span></a>    
						<a class="btn btn-info" href="following.html">Following: <span class="badge">${userDetails.following}</span></a>
						<a class="btn btn-warning my-2 my-sm-0" href="D3CollapsingTree.html">D3 - Tree of Followers-Followers</a>
						<br><br>
						<ul class="list-group">
							<li class="list-group-item">Bio: ${userDetails.bio}</li>
							<li class="list-group-item">Location: ${userDetails.location}</li>
						</ul>
					</div>	
				   </div>
				</div>
				<h3 class="page-header">Public Repositories:</h3>
				<div id="userRepos"></div>
			`);
			var userVar = userLogin;
			localStorage.setItem("userVar",userVar):
		});
	});
});
      
      
      
