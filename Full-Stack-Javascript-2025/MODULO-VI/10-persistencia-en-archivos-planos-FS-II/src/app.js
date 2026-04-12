/**
 * app.js — Interfaz de línea de comandos (CLI)
 * -----------------------------------------------------------
 * ¿Qué es un CLI?
 * Es un programa que se controla escribiendo comandos en la terminal,
 * en lugar de hacer clic en botones. Ejemplo: git, npm, node.
 *
 * ¿Cómo funciona este CLI?
 * El usuario escribe un comando como:
 *   npm start -- list
 *   npm start -- add "Maria" 28
 * y este archivo lo recibe, lo interpreta y llama a la función correcta
 * de gestorUsuarios.js para operar sobre el archivo usuarios.json.
 *
 * Separación de responsabilidades:
 *   app.js          → recibe el comando y muestra los resultados (interfaz)
 *   gestorUsuarios.js → hace el trabajo real con el archivo JSON (lógica)
 *
 * Comandos disponibles:
 *   help        → muestra la ayuda
 *   list        → muestra todos los usuarios
 *   add         → agrega un usuario nuevo
 *   update-age  → cambia la edad de un usuario
 *   delete      → elimina un usuario
 *   reset       → restaura el archivo al estado inicial
 */

// -------------------------------------------------------------
// IMPORTACIONES
// -------------------------------------------------------------
// Importamos solo lo que necesitamos de gestorUsuarios.js.
// RUTA_USUARIOS  → la ruta al archivo JSON (para mostrarla en pantalla)
// leerUsuarios   → devuelve el array de usuarios del archivo
// agregarUsuario → agrega un usuario nuevo y lo guarda
// actualizarEdadPorId → modifica la edad de un usuario existente
// eliminarUsuarioPorId → elimina un usuario del archivo
// resetUsuarios  → restaura el archivo a los datos por defecto


import {
    RUTA_USUARIOS,
    leerUsuarios,
    agregarUsuario,
    actualizarEdadPorId,
    eliminarUsuarioPorId,
    resetUsuarios

} from "./gestorUsuarios.js";
import chalk from 'chalk';

// FUNCION DE AYUDA
async function help(){
    console.log(chalk.cyan("=============================================="))
    console.log(chalk.cyan.bold("   Gestor de usuarios (usuarios.json)"))
    console.log(chalk.cyan("=============================================="))
    console.log(chalk.grey("  Archivo:  ")) + chalk.yellow(RUTA_USUARIOS);
    console.log("")
    console.log(chalk.white.bold("  Comandos disponibles:"));
    console.log("  " + chalk.green("npm start -- help"));
    console.log("  " + chalk.green("npm start -- list"));
    console.log("  " + chalk.green('npm start -- add "Maria" 28'));
    console.log("  " + chalk.green("npm start -- update-age 2 31"));
    console.log("  " + chalk.green("npm start -- delete 1"));
    console.log("  " + chalk.green("npm start -- reset"));
    console.log("");
}

async function main(){
    //  npm start -- add "Pedro" 35
    const [ cmd , ...args ] = process.argv.slice(2)

    if( !cmd || cmd === 'help') return help();

    if(cmd === 'list'){
        const usuarios = await leerUsuarios();
        console.log(chalk.cyan.bold("\n 👥 Lista de usuarios:"));
        console.table(usuarios);
        return
    }

    if(cmd === "add"){
        const nombre = args[0]
        const edad   = args[1]
        const u = await agregarUsuario( nombre,edad )
        console.log(chalk.green.bold("\n ✅ Usuario agregado correctamente:"))
        console.table([u])
        return 
    }

    if(cmd === "update-age"){
        const id = args[0] // id
        const edad = args[1] // edad
        const u = await actualizarEdadPorId( id, edad )
        console.log(chalk.green.bold("\n ✏️ Usuario actualizado:"))
        console.table([u])
        return 
    }

    if(cmd === "delete"){
        const id = args[0]
        const u = await eliminarUsuarioPorId(id);
        console.log(chalk.red.bold("\n 🗑️ Usuario eliminado:"))
        console.table([u])
        console.log(chalk.grey("\n Usuarios restantes:"))
        console.table( await leerUsuarios() )
        return 
    }

    if(cmd === "reset"){
        await resetUsuarios();
        console.log(chalk.yellow.bold("\n 🗑️ usuarios.json fue restaurado a estado inicial."))
        console.log(chalk.grey("\n Usuarios cargados:"))
        console.table( await leerUsuarios() )
    }

    throw new Error("Comando no reconocido. Usa : npm start -- help ");
    

}


main().catch((e)=>{
    console.error(chalk.red.bold("\n ❌ Error:"), chalk.red(e.message));
    console.log(chalk.grey("Tip:  ")) + chalk.cyan("npm start -- help");
})