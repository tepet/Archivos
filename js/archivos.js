//Archivos
var jQT = new $.jQTouch({
	themeSelectionSelector: '#jqt'
});


$(function(){
    $('#aEscribir').tap(function(){
        if ($('#aSend').val() != ''){
            Escribir();
        }
    });
    
    $('#aLeer').tap(function(){
        Leer();
    });
});


// Wait for device API libraries to load
//
function Escribir(){
    document.addEventListener("deviceready", escribirListo(), false);
}

// device APIs are available
//
function escribirListo() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, accesoFS, error1);
}

function accesoFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", {create: true, exclusive: false}, accesoFile, error1);
}

function accesoFile(fileEntry) {
    fileEntry.createWriter(gotFileWriter, error1);
}

function gotFileWriter(writer) {
    writer.onwriteend = function(evt) {
        navigator.notification.alert('Archivo escrito',null,'Escribir','Aceptar');
    };
    writer.write($('#aSend').val());
}

function error1(error) {
    alert(error.code);
}

// Wait for device API libraries to load
//
function Leer(){
    document.addEventListener("deviceready", onDeviceReady, false);
}
// device APIs are available
//
function onDeviceReady() {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}

function gotFS(fileSystem) {
    fileSystem.root.getFile("readme.txt", null, gotFileEntry, fail);
}

function gotFileEntry(fileEntry) {
    fileEntry.file(readAsText, fail);
}

function readAsText(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        $('#aGet').text(evt.target.result);
    };
    alert(reader.readAsText(file));
}

function fail(evt) {
    console.log(evt.target.error.code);
}


