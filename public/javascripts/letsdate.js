$(document).ready(function() {
  var socket = io.connect("http://localhost:3000");
  var likes = 0;
  var randomStudent;
  var companyName = $('#companyName').text();
  var random;
  var length;

  socket.emit('getStudents');

  socket.on('listStudents', function(students) {
    length = students.length;
    random = Math.floor((Math.random() * length));
    randomStudent = students[random];


    showNext(randomStudent);
  });

  $('#like').on('click', function(){
    socket.emit('getStudents');
    socket.on('listStudents', function(students) {
      length = students.length;
      random = Math.floor((Math.random() * length));
      randomStudent = students[random];
    });

    console.log(randomStudent);

    var meet = {
      "companyName": companyName,
      "student": randomStudent
    }

    showNext(randomStudent);

    likes++;

    socket.emit('meet', meet);

    
    if(likes == 3)
    {
      console.log('je kan niet meer stemmen');
      $('#like').css('display', 'none');
      $('#dislike').css('display', 'none');
      $('#home').css('display','block');
      $('#limit').css('display','block');
    }
  });

  $('#dislike').on('click',function(){


 socket.emit('getStudents');
    socket.on('listStudents', function(students) {
      length = students.length;
      random = Math.floor((Math.random() * length));
      randomStudent = students[random];
    });

    showNext(randomStudent);


  });

  var showNext = function(randomStudent) {
    console.log(randomStudent);

    $('#studentName').text(randomStudent.firstName + ' ' + randomStudent.lastName);
    $('#studentSkill').text('likes ' + randomStudent.skill);
    $('#work1').attr('src', randomStudent.work1);
    $('#work2').attr('src', randomStudent.work2);
    $('#work3').attr('src', randomStudent.work3);
  }
});