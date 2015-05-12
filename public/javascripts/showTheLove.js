$('document').ready(function() {
  var socket = io.connect("http://localhost:3000");

  $('#createDate').on('click',function(){


  	var newMeet = {

	  	'companyName':'testCompany',
	  	'studentOne':'Mathijs Van Den Broek',
	  	'studentTwo': 'Sander Van keer',
	  	'studentThree': 'Pieter Tenret',
	  };

	  console.log(newMeet);
	  socket.emit("addMeet", newMeet);


  socket.emit('getMeets');
  socket.on('listMeets',function(meets){

  	var length = meets.length;
  	for(var i =0; i<length; i++){

  		$('#dateList').append('<li><h2>' + meets[i].companyName + '</h2><p>' + meets[i].studentOne
+ '</p><br><p>'+ meets[i].studentTwo + '</p><br><p>' + meets[i].studentThree + '</p></li>');

  	}
  });
 


  });
	  

  
});