$(document).ready(function() {


  var socket = io.connect("http://localhost:3000");

   $('#btnAdmin').on('click', function() {
    var newAdmin = {
    	"email": $('#email').val(),
    	"password": $('#password').val()
    };

    console.log(newAdmin);
	socket.emit("addAdmin", newAdmin);

  });

   $('#btnStudent').on('click', function() {
    var newStudent = {
    	"email": 'test@student.be',
    	"password": 'test',
    	'firstName': 'Sander',
    	'lastName': 'Van keer',
    };

    console.log(newStudent);
	socket.emit("addStudent", newStudent);

  });





   $('#students').on('click',function(){

   	socket.emit('getStudents');
   	socket.on('listStudents',function(students){

   		
   		var length = students.length;
   		for(var i = 0; i<length;i++){

   			$('#listStudents').append('<li>'+students[i].firstName
   				+' '+ students[i].lastName+ '             ' + '<button>delete</button>' +'</li>');

   		}


   	});

   	$("#showStudents").css("display","block");
   	$("#showVotes").css("display","none");
   	$("#showAddAdmin").css("display","none");


   });

   $('#votes').on('click',function(){

   	$("#showStudents").css("display","none");
   	$("#showVotes").css("display","block");
   	$("#showAddAdmin").css("display","none");


   });

    $('#addAdmin').on('click',function(){

   	$("#showStudents").css("display","none");
   	$("#showVotes").css("display","none");
   	$("#showAddAdmin").css("display","block");


   });






});