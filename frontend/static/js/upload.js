function dateCal(){
    var dt = new Date();
    m =dt.getMonth() 
    if(m<10){
        m = "0"+String(parseInt(m)+1)
    }
    else{
        m = String(parseInt(m)+1)
    }
    d = parseInt(dt.getDate())
    if(d<10){
        d = "0"+String(parseInt(d))
    }
    else{
        d = String(parseInt(d))
    }
    var time = d + "-" + m + "-" + dt.getFullYear() + ":" + dt.getSeconds() + "-" + dt.getMinutes() + "-" + dt.getHours();
    return time;
}


function setCat(data){
    var o = document.createElement("option");
    o.text = data;
    o.value = data
    document.getElementById("cat").add(o);
}



function getBase64(file) {
    var encoded = null;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load" , function(e){
      encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      document.getElementById("img").src = reader.result;
      document.getElementById("b64").innerHTML = reader.result;
  });
}

$(document).ready(function() {
    $.get('http://3.94.45.77/api/get/actId',function(d){
            $("#actId").val(parseInt(d)+1);
    });
    $("#inp").change(function(e){
        getBase64(e.target.files[0])
    });
    
     $.get('http://3.94.45.77/api/v1/categories',function(d){
            for(var obj in d){
                setCat(obj)
            }
    });



    $("#upload").click(function(e){
        if ($("#b64").html() =="" || $('#username').val()=="" || $('#caption').val() == "") {
            $('#errorAlert').text("empty fields").show();
            $('#successAlert').hide();   
        }
        else{
            $.ajax({
                data : JSON.stringify({
                    actId : parseInt($('#actId').val()),
                    username : $('#username').val(),
                    timestamp : dateCal(),
                    caption : $('#caption').val(),
                    categoryName : $("#cat").find(":selected").text(),
                    img : $("#b64").html()
                }), 
                dataType : "json",
                contentType: 'application/json',
                type : 'POST',
                url : 'http://3.94.45.77/api/v1/acts',
                success : function(data){

                if (data.code == 405) {
                    $('#errorAlert').text("actId repeated").show();
                    $('#successAlert').hide();
                }
                if (data.code == 406) {
                    $('#errorAlert').text("not a valid dataTime").show();
                    $('#successAlert').hide();
                }
                if(data.code == 407) {
                    $('#errorAlert').text("Username not avaliable").show();
                    $('#successAlert').hide();
                }
                if(data.code == 408) {
                    $('#errorAlert').text("Base64 error").show();
                    $('#successAlert').hide();
                }
                if(data.code == 409) {
                    $('#errorAlert').text("unexpected upvote data sent").show();
                    $('#successAlert').hide();
                }
                if(data.code == 410) {
                    $('#errorAlert').text("Category name wrong").show();
                    $('#successAlert').hide();
                }
                if(data.code == 200) {
                    $('#successAlert').text("Posted").show();
                    $('#errorAlert').hide();
                    $('#actId').hide();
                    $('#username').hide();
                    $('#caption').hide();
                    $('#cat').hide();
                    $('#inp').hide();
                    $('#img').hide();
                    $('#upload').hide();
                    $('#b64').hide();
                    $('#home').show();
                    $('#cate').show();
                }
            }});
        }
        event.preventDefault();

});
});