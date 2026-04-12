import { Jimp } from "jimp";
import fs from "fs";
import path from "path";

const [ origen , salida ] = process.argv.slice(2);

if( !origen || !salida){
    console.log("\n Faltan argumentos");
    console.log("Debes pasar : (1) origen (URL o Archivo) y (2) salida (ruta de guardado)\n");
    console.log("Ejemplo URL : node index.js 'https://picsum.photos/900/600' 'output/salida.jpg'");
    process.exit(1) // Salimos o cortamos la ejecución
}

// 3) ASEGURAR QUE EXISTE LA CARPETA
const outDir = path.dirname(salida);

// Crear la carpeta
fs.mkdirSync( outDir, { recursive:true} )

// 4) PROCESO PRINCIPAL
try {

    // Aqui lo lee desde la URL
    // O lo lee desde el disco

    const image = await Jimp.read(origen);
    await image.resize({ w : 600 });
    await image.greyscale()

    // Guardamos la imagen final
    await image.write(salida)

    console.log("\n LISTO !");
    console.log("Origen", origen);
    console.log("Salida", salida);
    console.log("Carpeta", outDir);
    console.log("Tip: abre el archivo guardado y verifica el resultado.\n")

} catch (error) {
    console.log("\n Ocurrió. un error JIMP")
    console.log("Mensaje:", error?.message || error);
    console.log("\nPosibles causas:");
    console.log("-URL Bloqueda");
    console.log("- Ruta local incorrecta");
    console.log("- No hay permisos para escribir en la carpeta de destino\n")
    process.exit(1)
}

