$(document).ready(function(){
	var socket = io.connect("http://localhost:3000");

	$("#submitInfo").on('click',function(event)
	{
		var email 		= $('#email').val();
		var password	= $('#password').val();
		var firstName = $('#firstName').val();
		var lastName 	= $('#lastName').val();
		var userId		= $('#userId').val();

		if(email != '') {
			var changeEmail = {
				"id": userId,
				"email": email
			};

			socket.emit("changeEmail",changeEmail);
		}

		if(password != '') {
			var changePassword = {
				"id": userId,
				"password": password
			};

			socket.emit("changePassword", changePassword);
		}

		if(firstName != '') {
			var changeFirstName = {
				"id": userId,
				"firstName": firstName
			};

			socket.emit("changeFirstName",changeFirstName);
		}

		if(lastName != '') {
			var changeLastName = {
				"id": userId,
				"lastName": lastName
			};

			socket.emit("changeLastName",changeLastName);
		}

		event.preventDefault();
	});
});