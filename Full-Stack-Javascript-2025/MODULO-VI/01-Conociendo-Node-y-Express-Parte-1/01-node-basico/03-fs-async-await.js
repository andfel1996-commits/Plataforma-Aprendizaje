import fs from "fs/promises";
const archivo = "notas.txt";

async function main(){
    console.log("1) Inicio del Main")
    try {
        await fs.writeFile(
            archivo,
            "Notas de la clase:\n-Node.js\n-Event Loop\n Express\n",
            "utf8"
        )
        console.log(`2) Archivo "${archivo}" escrito.`)
        const data  = await fs.readFile(archivo, "utf8")
        console.log("3) Contenido Leido")
        console.log("---------------------------------------------")
        console.log(data);
        console.log("---------------------------------------------")
    } catch (error) {
        console.error("Error en main()", error)
    }
    console.log("4) Fin main()");
}
main();