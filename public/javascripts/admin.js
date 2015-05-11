$('document').ready(function() {
  var socket = io.connect("http://localhost:3000");

   $('#btnAdmin').on('click', function() {
    var adminEmail = $('#email').val();

    console.log(adminEmail);
  });


});