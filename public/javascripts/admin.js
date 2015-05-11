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
	location.reload();

  });


   	socket.emit('getStudents');
   	socket.on('listStudents',function(students){

   		
   		var length = students.length;
   		for(var i = 0; i<length;i++){

   			$('#listStudents').append('<div id="'+ students[i]._id + '"><li>'+students[i].firstName
   				+' '+ students[i].lastName+ '' + '<button value="'+students[i]._id+'" type="submit" class="btnDelete">delete</button>' +'</li></div>');

   				console.log(students[i]._id);

   		}





   $('#students').on('click',function(){

   		$("#showStudents").css("display","block");
   		$("#showVotes").css("display","none");
   		$("#showAddAdmin").css("display","none");
   	});

   	

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

    $(this).on('click','.btnDelete',function(){

    	 var id = $(this).val();

    	console.log("THIS IS THE SHIT!!!!!!!" + id);
    	
    	socket.emit('deleteStudent',id);

    	location.reload();

    	

    });





});