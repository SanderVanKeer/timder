$('document').ready(function() {
  var socket = io.connect("http://localhost:3000");

  socket.emit('getMeets');
  socket.on('listMeets', function(meets) {
  	var length = meets.length;
  	for(var i =0; i<length; i++) {

      $('#dateList').append('<li><h3>' + meets[i].companyName + '</h3><p>'+ meets[i].student.firstName +'</p></li>');
  	}
  });
});