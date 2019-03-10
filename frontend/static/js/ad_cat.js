$(document).ready(function() {
    $('#load').hide();


$("#upload").click(function(e){
        $('#load').show();
	var a = $("#cat").val();
	var myarray = [];
	myarray.push(a);
        $.ajax({
                type: 'POST',
                url:"http://3.94.45.77/api/v1/categories", 
				data: JSON.stringify(myarray),
				contentType:"application/json",		
				dataType:"json",
				 
				crossDomain: true,                
             
            success : function(data){
            if (data.code == 400) {
                $('#errorAlert').text("Empty Category").show();
                $('#successAlert').hide();
                $('#load').hide();
            }

            else if (data.code == 404) {
                $('#errorAlert').text("Category already exists").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            
            else {
                $('#load').hide();
		$('#errorAlert').hide();
		//alert("done");
		    $('#successAlert').show();
                
            }
            }
});
        event.preventDefault();});
});

  

  
