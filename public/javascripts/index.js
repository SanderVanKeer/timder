$(document).ready(function() {
  var socket = io.connect("http://localhost:3000");

  // prevent from submitting form on ENTER
  $(window).keydown(function(e){
    if(e.keyCode == 13) {
      e.preventDefault();
      return false;
    }
  });

  $('#startSwiping').on('click', function(e) {
    var companyName = $('#companyName').val();

    if(companyName == '') {
      $('.alert').addClass('alert-danger').html("Company name is required.").show();
      console.log('Company name is required.');
      e.preventDefault();
    } else {
      socket.emit('checkCompany', {"name": companyName});

      socket.on('companyExists', function(existingCompany) {
        console.log(existingCompany);
        console.log('company "' + existingCompany.name + '" already exists.');
      });

      socket.on('companyAvailable', function(newCompany) {
        console.log(newCompany);
        console.log('company "' + newCompany.name + '" is available.');
        // $('.alert').removeClass('alert-danger').addClass('alert-success').html('Company "' + newCompany.name + '" is available.').show();
        socket.emit('addCompany', newCompany);
      });
    }
  });
});