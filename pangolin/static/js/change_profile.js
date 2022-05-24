let buttonList = document.getElementsByClassName("signUpButton");
let buttonSave = buttonList.item(0);

buttonSave.addEventListener("click", function() {
    console.log(userLogged)
    let username = document.getElementById("usernameText").value;
    let email = document.getElementById("emailAddressText").value;
    let firstName = document.getElementById("firstNameText").value;
    let lastName = document.getElementById("lastNameText").value;

    data = {
        "username" : username,
        "email" : email,
        "first_name" : firstName,
        "last_name" : lastName
    }

    $.ajax({
        type: "PUT",
        url: "/user/" + userLogged,
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
            //alert('Disculpe, existió un problema');
        },
    
        // código a ejecutar sin importar si la petición falló o no
        complete : function(xhr, status) {
            //alert('Petición realizada');
        }
    });
});