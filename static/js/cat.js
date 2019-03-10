
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

function setCat(data){
    var o = document.createElement("option");
    o.text = data;
    o.value = data
    document.getElementById("cat").add(o);
}

function putBase64(value) {
    document.getElementById("img").src = value;
}

function addchild(data)
{   
    var div1 = document.createElement("div");
    div1.setAttribute("class","container-fluid");

    div21 = document.createElement("div");
    div21.setAttribute("class","row d-flex justify-content-between");
    div21.setAttribute("id","texts");

    div21Span1 = document.createElement("span");
    div21Span1.setAttribute("id","actid");
    div21Span1.setAttribute("class","col-lg-1");
    div21Span1.innerHTML = data.actId;

    div21Span2 = document.createElement("span");
    div21Span2.setAttribute("id","caption");
    div21Span2.setAttribute("class","col-lg-11");
    div21Span2.innerHTML = data.caption;

    div21.appendChild(div21Span1);
    div21.appendChild(div21Span2);
    div1.appendChild(div21);

    div22 = document.createElement("div");
    div22.setAttribute("class","row d-flex justify-content-center");
    div22.setAttribute("id","dele");

    div22Del = document.createElement("button");
    div22Del.setAttribute("class" , "btn btn-danger col-m-2 del");
    div22Del.innerHTML = "Delete";

    div22.appendChild(div22Del);
    div1.appendChild(div22);

    div23 = document.createElement("div");
    div23.setAttribute("class","row d-flex justify-content-center");
    div23.setAttribute("id","i");

    var img = document.createElement("img");
    img.setAttribute("height","300");
    img.setAttribute("src",data.img);
    
    div23.appendChild(img);
    div1.appendChild(div23);

    div24 = document.createElement("div");
    div24.setAttribute("class","row d-flex justify-content-center");
    div24.setAttribute("id","lidis");

    div24B1 = document.createElement("button");
    div24B1.setAttribute("class" , "btn btn-primary col-m-4 up");
    div24B1.innerHTML = "Upvote";

    pre1 = document.createElement("pre");
    pre1.setAttribute("class" , "col-m-4 large vote");
    pre1.setAttribute("style","font-size: 20px;");
    pre1.innerHTML = data.upvote;

    div24B2 = document.createElement("button");
    div24B2.setAttribute("class" , "btn btn-danger col-m-4 downup");
    div24B2.innerHTML = "Downvote";
    
    div24.appendChild(div24B1);
    div24.appendChild(pre1);
    div24.appendChild(div24B2);
    div1.appendChild(div24);

    div1.appendChild(document.createElement("br"));
    div1.appendChild(document.createElement("br"));
    document.getElementById("images").appendChild(div1);
}
function removeChlid(){
    var k = document.createElement("div");
    k.setAttribute("id","images");
    var item = document.getElementById("images");
    item.parentNode.removeChild(item);
    document.body.appendChild(k)
}

$(document).ready(function() {
    $('#load').hide();

    $.get('http://3.94.45.77/api/v1/categories',function(d){
            for(var obj in d){
                setCat(obj)
            }
    });

    $("#upload").click(function(e){
        $('#load').show();
        $.ajax({
            dataType : "json",
            contentType: 'application/json',
            type : 'GET',
            url : 'http://3.94.45.77/api/v1/categories/'+ $("#cat").find(":selected").text() +'/acts',
            success : function(data){
            if (data.code == 400) {
                $('#errorAlert').text("categories not avaliable").show();
                $('#successAlert').hide();
                $('#load').hide();
            }

            if (data.code == 405) {
                $('#errorAlert').text("actId repeated").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if (data.code == 404) {
                $('#errorAlert').text("no Acts in a category").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if(data.code == 407) {
                $('#errorAlert').text("Username not avaliable").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if(data.code == 408) {
                $('#errorAlert').text("Base64 error").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if(data.code == 409) {
                $('#errorAlert').text("unexpected upvote data sent").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            if(data.code == 410) {
                $('#errorAlert').text("Category name wrong").show();
                $('#successAlert').hide();
                $('#load').hide();
            }
            else {
                $('#load').hide();
                removeChlid()
                if(data.length == 0 ){
                    $('#errorAlert').text("Category name wrong").show();
                    $('#successAlert').hide();
                }
                var j ;
                for(j=0;j<data.length;j++){
                    addchild(data[j])
                }
            }
            }});
        event.preventDefault();});

    $('body').on('click','button.del',function(e){
        $('#load').show();
        var a = $(this).parent().siblings("#texts").children('#actid').text().split(")")[0];
        alert(a)
         $.ajax({
            dataType : "json",
            contentType: 'application/json',
            type : 'DELETE',
            url : 'http://3.94.45.77/api/v1/acts/'+a,
            success : function(data){

            if (data.code == 405) {
                $('#errorAlert').text("actId repeated").show();
                $('#successAlert').hide();
                $('#load').hide();
            }

            else {
                $('#load').hide();
                removeChlid()
                if(data.length == 0 ){
                    $('#errorAlert').text("Category name wrong").show();
                    $('#successAlert').hide();
                }
                var j ;
                for(j=0;j<data.length;j++){
                    addchild(data[j])
                }
            }}});
     });
    
    $('body').on('click','button.up',function(e){
        $('#load').show();
        var a = $(this).parent().siblings("#texts").children('#actid').text().split(")")[0];
        var k = $(this).siblings('pre')
         $.ajax({
            data : JSON.stringify({actId : parseInt($(this).parent().siblings("#texts").children('#actid').text().split(")")[0])}),
            dataType : "json",
            contentType: 'application/json',
            type : 'POST',
            url : 'http://3.94.45.77/api/v1/acts/upvote',
            success : function(data){
            if (data.code == 400) {
                $('#errorAlert').text("act does not exist").show();
                $('#successAlert').hide();
                $('#load').hide();
            }

            if(data.code == 200) {
                $('#load').hide();
                var v = k.html()
                v = parseInt(v)+1;
                k.text(v)
            }

            }});

    });

    $('body').on('click','button.downup',function(e){
            $('#load').show();
            var a = $(this).parent().siblings("#texts").children('#actid').text().split(")")[0];
            var k = $(this).siblings('pre')
             $.ajax({
                data : JSON.stringify({actId : parseInt($(this).parent().siblings("#texts").children('#actid').text().split(")")[0])}),
                dataType : "json",
                contentType: 'application/json',
                type : 'POST',
                url : 'http://3.94.45.77/api/v1/acts/downvote',
                success : function(data){
                if (data.code == 400) {
                    $('#errorAlert').text("act does not exist").show();
                    $('#successAlert').hide();
                    $('#load').hide();
                }

                if(data.code == 200) {
                    $('#load').hide();
                    var v = k.html()
                    v = parseInt(v)-1;
                    k.text(v)
                }

            }});

    });


});