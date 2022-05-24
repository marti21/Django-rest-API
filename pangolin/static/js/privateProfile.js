function buscarUsuario(nombreUsuario){

    $.ajax({
        url : '/user/' + nombreUsuario,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json)
            rellenarCampos(json);
            //console.log("Ha funcionado" + json["username"])
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
        url : '/posts/' + nombreUsuario,
        //data : { id : 123 },
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            //console.log("Ha funcionado" + json[0]["title"])
            console.log(json.length)
            printarPosts(json);
    
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

function buscarFriendRequests(nombreUsuario){
    $.ajax({
        url : '/friendRequests/' + nombreUsuario,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("FRIEND REQUEST" + json.length);
            //alert('Encontrada');
            printarFriendRequests(json);
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
        url : '/see_friends',
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log(json.length)
            //alert('AMIGOS ENCONTRADOS');
            printarAmigos(json);
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

buscarUsuario(userLogged);

buscarFriendRequests(userLogged);

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
        nuevoA.href = "/post2/" + resultado[i]["pk"];
        
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

function crearUserFriendRequest(idUser, idSolicitud){
    $.ajax({
        url : '/userId/' + idUser,
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            //alert('Encontrada');
            printarUserFriendRequests(json, idSolicitud)
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

function printarFriendRequests(resultado){

    for(let i = 0; i < resultado.length; i ++){
        fromUser = resultado[i]['from_user'];
        id = resultado[i]['pk'];
        crearUserFriendRequest(fromUser, id);
    }
}

function printarUserFriendRequests(resultado, id){
    let divFriendsRequests = document.getElementById("aquiVanlosRequestFriends");

    let firstP = document.createElement("p");
    firstP.id = "articleImage";
    let imagenUser = document.createElement("img");
    imagenUser.src = resultado['image'];
    firstP.appendChild(imagenUser);

    divFriendsRequests.appendChild(firstP);

    let secondP = document.createElement("p");

    let firstH2 = document.createElement("h2");
    let firstA = document.createElement("a");
    firstA.innerText = resultado['username'];
    firstH2.appendChild(firstA);
    secondP.appendChild(firstH2);
    divFriendsRequests.appendChild(secondP);

    let nameH2 = document.createElement("h2");
    nameH2.innerText = "Name: " + resultado['first_name'] + " " + resultado['last_name'];
    divFriendsRequests.appendChild(nameH2);

    let buttonP1 = document.createElement("p");
    let buttonP1A = document.createElement("button");
    buttonP1A.innerText = "Accept friend request";
    buttonP1A.addEventListener("click", function() {
        $.ajax({
            url : '/acceptRequestFriend/' + id,
            type : 'DELETE',
            dataType : 'json',

            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
        
            // código a ejecutar sin importar si la petición falló o no
            complete : function(xhr, status) {
                alert('SOLICITUD ACEPTADA');
                document.location.href = "/profile/" + userLogged
            }
        });
    });
    buttonP1.appendChild(buttonP1A);
    divFriendsRequests.appendChild(buttonP1);

    let buttonP2 = document.createElement("p");
    buttonP2.id = "lastp";
    let buttonP2A = document.createElement("button");
    buttonP2A.innerText = "Reject friend request";
    buttonP2A.addEventListener("click", function() {
        $.ajax({
            url : '/rejectRequestFriend/' + id,
            type : 'DELETE',
            dataType : 'json',

            beforeSend: function(xhr, settings) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            },
        
            // código a ejecutar sin importar si la petición falló o no
            complete : function(xhr, status) {
                alert('SOLICITUD DENEGADA');
                document.location.href = "/profile/" + userLogged
            }
        });
    });
    buttonP2.appendChild(buttonP2A);
    divFriendsRequests.appendChild(buttonP2);
}

function printarAmigos(resultado){
    let divFriends = document.getElementById("AquiVanLosAmigos");

    for(let i = 0; i < resultado.length; i ++){
        let firstP = document.createElement("p");
        firstP.id = "articleImage";
        let imagenUser = document.createElement("img");
        imagenUser.src = resultado[i]['image'];
        firstP.appendChild(imagenUser);
        divFriends.appendChild(firstP);

        let secondP = document.createElement("p");
        let firstH2 = document.createElement("h2");
        let firstA = document.createElement("a");
        firstA.innerText = resultado[i]['username'];
        firstH2.appendChild(firstA);
        secondP.appendChild(firstH2);
        divFriends.appendChild(secondP);

        let buttonP2 = document.createElement("p");
        buttonP2.id = "lastp";
        let buttonP2A = document.createElement("button");
        buttonP2A.innerText = "Delete friend";
        buttonP2A.addEventListener("click", function() {
            $.ajax({
                url : '/delete_friend/' + resultado[i]['username'],
                type : 'DELETE',
                dataType : 'json',

                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                },
            
                // código a ejecutar sin importar si la petición falló o no
                complete : function(xhr, status) {
                    alert('Amigo eliminado');
                    document.location.href = "/profile/" + userLogged
                }
            });
        });
        buttonP2.appendChild(buttonP2A);
        divFriends.appendChild(buttonP2);
    }
}