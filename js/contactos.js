//Contactos

$(function(){
    $('#cListar').tap(function(){
        leerContactos();
    });
    
    $('#ncSend').tap(function(){
        nuevoContacto($('#ncNom').val(),$('#ncTel').val(),$('#ncMail').val());
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

function nuevoContacto(nom,tel,mail){
 document.addEventListener("deviceready",function(){
     datosContacto(nom,tel,mail);
 },false);
}

//Crear módulo de nuevo contacto
function datosContacto(nom,tel,mail){
    var contacto = navigator.contacts.create();
    contacto.displayName = nom;
    contacto.nickname = nom;
    var nombre = new ContactName();
    nombre.givenName = nom;
    nombre.familyName = "Prueba";
    contacto.name = nombre;
    var telefonos = [];
    telefonos[0] = new ContactField("home",tel,true);
    contacto.phoneNumbers = telefonos;
    var correos = [];
    correos[0] = new ContactField("home",mail,true);
    contacto.emails = correos;
    
    contacto.save(nuevoCorrecto,nuevoError);
}

function nuevoError(error){
    alert('Error: ' + err.code);
}

function nuevoCorrecto(){
    alert('Contacto creado satisfactoriamente');
    $('#ncNom').val('');
    $('#ncTel').val('');
    $('#ncMail').val('');
    window.history.back();
}