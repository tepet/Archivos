//Contactos

$(function(){
    $('#cListar').tap(function(){
        leerContactos();
    });
});


// Wait for device API libraries to load
function leerContactos(){
    document.addEventListener("deviceready", contactos, false);
}

// device APIs are available

function contactos() {
    // find all contacts with 'Bob' in any name field
    var options = new ContactFindOptions();
    options.filter = "Yo";
    var fields = ["phoneNumbers","name"];
    navigator.contacts.find(fields, leidos, onError1, options);
}

// onSuccess: Get a snapshot of the current contacts

function leidos(contacts) {
    if (contacts.length > 0)
        $('#cMostrar').html('');
    else
        $('#cMostrar').html('<li>Sin leer contactos</li>');
        for (var i = 0; i < contacts.length; i++) {
            var tel = contacts[i].phoneNumbers[0].value;
            var nombre = contacts[i].name.formatted;
            $('#cMostrar').append('<li><a href="tel: ' + tel + '">'+ nombre  +'</a></li><li>'+tel+'</li>');
    }
}

// onError: Failed to get the contacts

function onError1(contactError) {
    alert('onError!');
}
