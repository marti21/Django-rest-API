function buscarUsuario(){

    $.ajax({
        url : 'http://127.0.0.1:8000/postFriends',
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json)
            crearPosts(json);
        },
    
        error : function(xhr, status) {
            alert('Disculpe, existió un problema al buscar post de amigos');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
}

buscarUsuario();

function crearPosts(resultado){
    let section = document.getElementById("content");

    for(let i = 0; i < resultado.length; i ++){
        var nuevoArticle = document.createElement("article");
        nuevoArticle.className = "article";

        var pPost = document.createElement("div");
  
        var nuevoA = document.createElement("a");
        nuevoA.href = "http://127.0.0.1:8000/post2/" + resultado[i]["pk"];
        
        var nuevoH2 = document.createElement("h2");
        nuevoH2.className = "articlePostTitle";
        nuevoH2.innerText = resultado[i]["title"];

        nuevoA.appendChild(nuevoH2);
        pPost.appendChild(nuevoA);

        var description = document.createElement("p");
        description.innerText = resultado[i]["description"];
        pPost.appendChild(description);

        if(resultado[i]["image"] != null){
            var pImage = document.createElement("p");
            pImage.className = "imagePost";
            var imagenPost = document.createElement("img");
            imagenPost.src = resultado[i]["image"];

            pImage.appendChild(imagenPost);
            pPost.appendChild(pImage);
        }

        var createdAt = document.createElement("h4");
        createdAt.innerText = "Created At: " + resultado[i]["created_at"];

        var nuevoA2 = document.createElement("a");
        buscarAuthor(resultado[i]["author"], nuevoA2)

        createdAt.appendChild(nuevoA2)
        pPost.appendChild(createdAt);

        nuevoArticle.appendChild(pPost);

        section.appendChild(nuevoArticle);      
    }
}


function buscarAuthor(id, item){
    $.ajax({
        url : 'http://127.0.0.1:8000/userId/' + id,
        //data : { id : 123 },
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log(json.username);
            item.innerText = " Post by: " + json.username;
        },
    
        error : function(xhr, status) {
            alert('Disculpe, existió un problema al buscar el autor');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
            
        }
    });
}