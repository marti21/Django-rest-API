var Url = window.location.pathname;
nombreUsuario = Url.replace("/profile/", "");
console.log("username: " + nombreUsuario);

function buscarUsuario(nombreUsuario){

    $.ajax({
        url : 'http://127.0.0.1:8000/user/' + nombreUsuario,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json)
            rellenarCampos(json);
            //console.log("Ha funcionado" + json["username"])
        },
    
        error : function(xhr, status) {
            alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });

    $.ajax({
        url : 'http://127.0.0.1:8000/posts/' + nombreUsuario,
        //data : { id : 123 },
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            //console.log("Ha funcionado" + json[0]["title"])
            console.log(json.length)
            printarPosts(json);
    
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

buscarUsuario(nombreUsuario);

function rellenarCampos(resultado){
    console.log("Function" + resultado["username"]);
    console.log("SrcImagen " + resultado["image"]);

    let firstName = document.getElementById("firstName");
    firstName.innerText = "Name: " + resultado["first_name"]

    let date = document.getElementById("date");
    date.innerText = "Date: " + resultado["my_date_field"]

    let email = document.getElementById("email");
    email.innerText = "Email: " + resultado["email"]

    let date_joined = document.getElementById("date_joined");
    date_joined.innerText = "Joined: " + resultado["date_joined"]

    let div2 = document.getElementById("divUser");

    var ImageUser = document.getElementById("imageUser");
    ImageUser.src = resultado['image'];
    ImageUser.className = "imageUser";
}

function printarPosts(resultado){
    let titlePost = document.getElementById("aquiVanLosPosts");
    for(let i = 0; i < resultado.length; i ++){
        var nuevoArticle = document.createElement("article");
        nuevoArticle.className = "article";
        var nuevoA = document.createElement("a");
        nuevoA.href = "http://127.0.0.1:8000/post2/" + resultado[i]["pk"];
        
        var nuevoH2 = document.createElement("h2");
        nuevoH2.className = "articlePostTitle";
        nuevoH2.innerText = resultado[i]["title"];
        nuevoA.appendChild(nuevoH2);
        nuevoArticle.appendChild(nuevoA);

        var description = document.createElement("p");
        description.innerText = resultado[i]["description"];
        nuevoArticle.appendChild(description);

        var pImage = document.createElement("p");
        pImage.id = "articleImage";
        var imagen = document.createElement("img");
        imagen.src = resultado[i]["image"];
        pImage.appendChild(imagen);
        nuevoArticle.appendChild(pImage);

        var createdAt = document.createElement("h4");
        createdAt.innerText = resultado[i]["created_at"];
        nuevoArticle.appendChild(createdAt);

        titlePost.appendChild(nuevoArticle);      
    }
}