var Url = window.location.pathname;

id = Url.replace("/edit_post/","")
console.log(id)

let buttonList = document.getElementsByClassName("postButton");
let buttonSave = buttonList.item(0);

function cargarPost(id){
    $.ajax({
        url : 'http://127.0.0.1:8000/post/' + id,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json["title"])
            printarResultado(json);
        },
    
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
}

cargarPost(id);

function printarResultado(resultado){
    let title = document.getElementById("postTitle");
    let description = document.getElementById("postDescription");
    let image = document.getElementById("postImage");
    console.log(resultado['title']);
    title.value = resultado['title'];
    description.value = resultado['description'];
    //image.value = resultado['image'];
}

buttonSave.addEventListener("click", function(){
    let title = document.getElementById("postTitle").value;
    let description = document.getElementById("postDescription").value;
    //let image = document.getElementById("postImage");
    console.log(title);
    console.log(description);

    data = {
        "title" : title,
        "description" : description
    };

    $.ajax({
        type: "PUT",
        url: "http://127.0.0.1:8000/post/" + id,
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
    
        success : function(json) {
            alert('Guardado correctamente');
        },
    
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
});