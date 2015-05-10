<<<<<<< HEAD
$('document').ready(function() {
  var socket = io.connect("http://localhost:3000");

  $('#startSwiping').on('click', function() {
    var company = $('#companyName').val();

    console.log(company);
  });
=======
$( document ).ready(function() {
	// connect to socket.io
	var socket = io.connect('http://localhost:3000');

    $('#startSwiping').on('click', function(e) {
    	e.preventDefault();
    	console.log('geklikt');

    	var company = $('#companyName').val();

    	console.log(company);

    	socket.emit('test', company);
    });
>>>>>>> views
});