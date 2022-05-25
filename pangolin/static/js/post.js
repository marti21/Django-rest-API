var Url = window.location.pathname;

id2 = Url.replace("post2/","")
console.log(id2)

id = Url.replace("post2", "posts");
id = id.replace("/posts", "");
console.log("id: " + id);

let buttonLista = document.getElementsByClassName("postButton2");
let buttonComentar = buttonLista.item(0)

function buscarPost(id){
    $.ajax({
        url : '/post' + id,
        //data : { id : 123 },
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json["title"])
            printarPost(json);
            
        },
    
        error : function(xhr, status) {
            //alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
    
    $.ajax({
        url : '/comentarios' + id2,
        //data : { id : 123 },
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json["title"])
            printarComentarios(json);
        },
    
        error : function(xhr, status) {
            //alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
}

buscarPost(id);

function printarPost(resultado){
    let titlePost = document.getElementsByClassName("postTitle");
    let descriptionPost = document.getElementsByClassName("scrollDiv");
    let created_at = document.getElementById("created_id");
    var authorPost = document.getElementsByClassName("autorPost");
    let imageList = document.getElementsByClassName("imagenPost");

    imagen = imageList.item(0);
    titlePost.item(0).innerText = resultado["title"];
    descriptionPost.item(0).innerText = resultado["description"];
    created_at.innerText = resultado["created_at"];
    imagen.src = resultado["image"];

    ///usernameAuthor = buscarAuthor(resultado["author"]);
    //authorPost.item(0).innerText = usernameAuthor;

    buscarAuthorPost(resultado["author"], authorPost.item(0))
}

function printarComentarios(resultado){
    let titleComments = document.getElementById("AquilosComentarios");

    for(let i = 0; i < resultado.length; i ++){
        var nuevoArticle = document.createElement("article");
        nuevoArticle.className = "article";
        
        var nuevoH4 = document.createElement("h4");
        buscarAuthor(resultado[i]["author"], nuevoH4);
        nuevoArticle.appendChild(nuevoH4);
                
        var nuevoP = document.createElement("p");
        nuevoP.innerText = resultado[i]["text"];
        nuevoArticle.appendChild(nuevoP);

        var nuevoP2 = document.createElement("p");
        nuevoP2.innerText = resultado[i]["created_at"];
        nuevoArticle.appendChild(nuevoP2);
                
        titleComments.appendChild(nuevoArticle);
        titleComments.parentNode.insertBefore(nuevoArticle, titleComments);        
    }

    console.log(resultado.length)
    if(resultado.length == 0){
        console.log("No hay comments")
        var nuevoP = document.createElement("p");
        nuevoP.innerText = "No comments";
        titleComments.appendChild(nuevoP);
        titleComments.parentNode.insertBefore(nuevoP, titleComments);  
    }
}

function buscarAuthor(id, item, bool){
    $.ajax({
        url : '/userId/' + id,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Buscar Author" + json.username);
            item.innerText = json.username;
        },
    
        error : function(xhr, status) {
            //alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
             
        }
    });
}
function buscarAuthorPost(id, item){
    $.ajax({
        url : '/userId/' + id,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Buscar Author" + json.username);
            item.innerText = json.username;
            printarBotones(json.username);
        },
    
        error : function(xhr, status) {
            //alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
             
        }
    });
}

function printarBotones(username, bool){
    console.log("Printar botones 1")
    if(username === userLogged){
        console.log("Printar Botones 2");
        let divButton = document.getElementById("aquiVanLosBotones");

        let button1 = document.createElement("button");
        button1.className = "postButton2";
        button1.innerText = "Edit";
        button1.href = "edit_post.html"
        let button2 = document.createElement("button");
        button2.className = "postButton2";
        button2.innerText = "Delete";

        divButton.appendChild(button1);
        divButton.appendChild(button2);

        button1.addEventListener("click", function() {
            document.location.href = "/edit_post" + id
        });
        button2.addEventListener("click", function() {
            borrarPost(id);
        });
        bool = false;
    }
}

function borrarPost(id){
    $.ajax({
        url : '/post' + id,
        type : 'DELETE',
        dataType : 'json',

        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            alert('Post Borrado correctamente');
            document.location.href = "/home"
        }
    });
}

buttonComentar.addEventListener("click", function() {
    let listaButton = document.getElementsByClassName("comentarioPost");
    let textComentario = listaButton.item(0).value;

    console.log(textComentario);
    idPost = id.replace("/", "")
    console.log(idPost)

    data = {
        "text" : textComentario,
        "post" : idPost,
        "author" : userLoggedId
    }

    $.ajax({
        type: "POST",
        url: "/add_comment",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        beforeSend: function(xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        },
        sucess: function() { 
            alert('Se ha commentado correctamente!');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
});