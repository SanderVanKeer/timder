$('document').ready(function() {
  var socket = io.connect("http://localhost:3000");

  $('#startSwiping').on('click', function() {
    var company = $('#companyName').val();

    console.log(company);
  });
});