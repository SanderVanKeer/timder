$(document).ready(function(){

	$('#skill').on('change', function() {

		var value = $('#skill').val();

	console.log("was dees:  " + value);


		if(value== "design")
		{

			$("#designCheck").css("display",'block');
			$("#devCheck").css("display",'none');
			$("#choice").text("Design");

		}
		else if(value== "dev"){

			$("#designCheck").css("display",'none');
			$("#devCheck").css("display",'block');
			$("#choice").text("Development");
		}
		else{

			$("#designCheck").css("display",'none');
			$("#devCheck").css("display",'none');
			$("#choice").text("");
		}

	})

});