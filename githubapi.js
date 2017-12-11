
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

		}
	}
}
      
      
      
