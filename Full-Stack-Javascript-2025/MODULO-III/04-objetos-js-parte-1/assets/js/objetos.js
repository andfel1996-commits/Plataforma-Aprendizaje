/////////Hola
function generarContrasena( nombre ){
    if(!nombre){
        console.log("Error debes ingresar un nombre")
        return
    }

    const nombreLimpio = nombre.trim();
    const parteNombre = nombreLimpio.slice(0,3).toUpperCase();
    const randomNun = Math.floor(Math.random() * 1000);
    const contrasena = parteNombre + randomNun

    console.log('nombreLimpio:', nombreLimpio)
    console.log('parteNombre:', parteNombre)
    console.log('randomNun:', randomNun)
    console.log('contrasena:', contrasena)

    return contrasena
}

generarContrasena("Pedro")
generarContrasena(" Valentina  ")
generarContrasena("")


window.console.log('Holaaaaaa')

let fecha = new Date();
console.log(fecha.toLocaleString("es-CL",{
        dateStyle : "full",
        timeStyle:"medium"
}))



