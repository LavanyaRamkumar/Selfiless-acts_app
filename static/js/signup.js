
function goToIndex(){

}

$(document).ready(function() {
    $('#load').hide();

    $('#submit').click(function(event) {

    if($('#nameInput').val() == '' || $('#passwordInput').val() == ''){
        $('#errorAlert').text("username or password not entered").show();
        $('#successAlert').hide();
    }   
    else{
        $('#load').show()
        $.ajax({
            data : JSON.stringify({
                name : $('#nameInput').val(),
                password : sha1($('#passwordInput').val())
            }),
            dataType : "json",
            contentType: 'application/json',
            type : 'POST',
            url : 'http://3.94.45.77/api/v1/users',
            success : function(data){

            if (data.code == 400) {
                $('#errorAlert').text("UserName or Password missing").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if (data.code == 405) {
                $('#errorAlert').text("User Already exist").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if(data.code == 201) {
                $('#successAlert').text("Registration Successful").show();
                $('#errorAlert').hide();
                $('#nameInput').hide();
                $('#passwordInput').hide();
                $('#submit').hide();
                $('#load').hide();
                $('#home').show();
            }
            if(data.code == 600) {
                $('#errorAlert').text("sha1 encode error").show();
                $('#successAlert').hide();
                $('#load').hide();
            }


        }});
    }
        event.preventDefault();

});
});