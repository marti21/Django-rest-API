function mostrarUsers(){
    let nombreUsuario = document.getElementById("usernameLogged").innerText;
    console.log("username " + nombreUsuario)

    $.ajax({
        url : '/View_no_friends/' + nombreUsuario,
        //data : { id : 123 },
        type : 'GET',
        dataType : 'json',
    
        success : function(json) {
            console.log("Ha funcionado" + json[0]["username"])
            console.log(json.length)
            console.log(json[0]);
            printarUsers(json);
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

window.onload=mostrarUsers();

function printarUsers(resultado){
    let section = document.getElementById("content");

    for(let i = 0; i < resultado.length; i ++){
        var nuevoUser = document.createElement("div");
        nuevoUser.className = "div_friends";
        var pImage = document.createElement("p");
        var ImageUser = document.createElement("img");
        ImageUser.src = resultado[i]['image'];
        
        var pNombre = document.createElement("p");
        var aNombre = document.createElement("a");
        aNombre.className = "friend_user";
        var pFullName = document.createElement("p");

        aNombre.innerText = resultado[i]['username'];
        pFullName.innerText = resultado[i]['first_name'] + " " + resultado[i]['last_name'];

        var btnSendFriendReq = document.createElement("button");
        btnSendFriendReq.innerText = "Send Friend Request";

        var pButton = document.createElement("p");

        btnSendFriendReq.addEventListener("click", function() {
            $.ajax({
                url : '/sendRequestFriend/' + resultado[i]['username'],
                type : 'POST',
                dataType : 'json',
    
                beforeSend: function(xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken);
                },
            
                // código a ejecutar sin importar si la petición falló o no
                complete : function(xhr, status) {
                    alert('SOLICITUD ENVIADA');
                }
            });
        });

        pImage.appendChild(ImageUser);
        nuevoUser.appendChild(pImage);
        pNombre.appendChild(aNombre);
        nuevoUser.appendChild(pNombre);
        nuevoUser.appendChild(pFullName);
        pButton.appendChild(btnSendFriendReq);
        nuevoUser.appendChild(pButton);
        section.appendChild(nuevoUser);
    }
}