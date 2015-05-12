$(document).ready(function() {
  var socket = io.connect("http://localhost:3000");

  socket.emit('getStudents');

  socket.on('listStudents', function(students) {
    var length = students.length;
    var random = Math.floor((Math.random() * length));
    var randomStudent = students[random];

    console.log(randomStudent);

    $('#studentName').text(randomStudent.firstName + ' ' + randomStudent.lastName);
    $('#studentSkill').text('likes ' + randomStudent.skill);
    $('#work1').attr('src', randomStudent.work1);
    $('#work2').attr('src', randomStudent.work2);
    $('#work3').attr('src', randomStudent.work3);

  });
});