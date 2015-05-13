$(document).ready(function() {
  var socket = io.connect("http://localhost:3000");

  socket.emit('getStudents');
  socket.on('listStudents',function(students) {
    var length = students.length;
    if(length == 0)
    {
      $("#showStudents").text('No students registered.');
    }
    else
    {
      for(var i = 0; i<length;i++){
        $('#listStudents').append('<li id="'+ students[i]._id + '" style="height: 50px;">'+students[i].firstName
        + ' ' + students[i].lastName + ' ' + '<button value="'+students[i]._id+'" type="submit" class="btnDeleteStudent btn btn-danger" style="float:right;">remove</button>' +'</li>');
      }
    }
  });

  socket.emit('getMeets');
  socket.on('listMeets', function(meets) {
    var length = meets.length;
    if(length == 0)
    {
      $("#showMeets").text('No meets available.');
    }
    else
    {
      for(var i = 0; i<length;i++){
        $('#listMeets').append('<li id="'+ meets[i]._id + '" style="height: 50px;">'+ meets[i].companyName
        + ' ' + meets[i].student.firstName + ' ' + '<button value="'+meets[i]._id+'" type="submit" class="btnDeleteMeet btn btn-danger" style="float:right;">remove</button>' +'</li>');
      }
    }
  })

  $('#btnAdmin').on('click', function(e) {
    e.preventDefault();

    var newAdmin = {
    	"username": $('#username').val(),
    	"password": $('#password').val()
    };

    console.log(newAdmin);
	  socket.emit("addAdmin", newAdmin);
  });

  $('#students').on('click',function(){
    $(this).addClass('active');
    $('#meets').removeClass('active');
    $('#addAdmin').removeClass('active');

    $("#showStudents").css("display","block");
    $("#showMeets").css("display","none");
    $("#showAddAdmin").css("display","none");
  });


  $('#meets').on('click',function(){
    $('#students').removeClass('active');
    $(this).addClass('active');
    $('#addAdmin').removeClass('active');

   	$("#showStudents").css("display","none");
   	$("#showMeets").css("display","block");
   	$("#showAddAdmin").css("display","none");
  });

  $('#addAdmin').on('click',function(){
    $('#students').removeClass('active');
    $('#meets').removeClass('active');
    $(this).addClass('active');

   	$("#showStudents").css("display","none");
   	$("#showMeets").css("display","none");
   	$("#showAddAdmin").css("display","block");
  });

  $(this).on('click','.btnDeleteStudent',function(){
    var id = $(this).val();

    console.log("student deleted:" + id);
    
    socket.emit('deleteStudent',id);


  });

  $(this).on('click','.btnDeleteMeet',function(){
    var id = $(this).val();

    console.log("meet deleted:" + id);
    
    socket.emit('deleteMeet',id);


  });
});