var buttonList = document.getElementsByClassName("postButton")
var buttonPost = buttonList.item(0)

buttonPost.addEventListener("click", function() {
    var title = document.getElementById("postTitle").value; 
    var description = document.getElementById("postDescription").value; 
    //var file = document.forms['postAdd']['postImage'].files[0];

    console.log("title " + title);
    console.log("description " + description);
    //console.log("title " + image);

    let data = {
        "title": title,
        "description": description,
        "author" : userLogged,
    };

    $.ajax({
        type: "POST",
        url: "/add_post",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        sucess: function() { 
            alert('Se ha colgado post correctamente!');
        },
    
        error : function(xhr, status) {
            console.log("error: "  + xhr + status);
            //alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });

});