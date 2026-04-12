import fs from "fs";

const archivo = "tarea.txt";
const contenido = "Estudiar Node.js y crear API REST con Express.\n";

console.log("1) Inicio del Script (Esto aparece primero)");

fs.writeFile( archivo, contenido , (err) => {

    if(err){
        console.error("Error al escribir el archivo", err )
        return 
    }

    console.log(`2) Archivo ${archivo} creado/actualizado.`);

    fs.readFile(archivo, "utf8", (err2, data)=>{
        if(err2){
            console.error('Error al leer el archivo', err2)
            return
        }

        console.log("3) Contenido Leído  deade el archivo:")
        console.log("---------------------------------------------")
        console.log(data);
        console.log("---------------------------------------------")

    })


})

console.log("4) Fin del script (esto aparece ANTES de leer el archivo)");
