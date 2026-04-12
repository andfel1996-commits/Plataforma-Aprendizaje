/**
 * IMPORTACIONES
 */
// readFile -> lee un archivo y devuelve su contenido como texto
// writeFile -> escribe (o sobrescribe) un archivo con nuevo contenido
// access -> comprobar si un archivo existe en el disco 
import { readFile, writeFile, access} from "node:fs/promises";
// FS_CONSTANTS.F_OK esta constante verifica si puede acceder a este archivo
import { constants as FS_CONSTANTS } from "node:fs";
// Path nos ayuda a contruir rutas de archivos de forma correcta en cualquier sistema operatio
import path from "node:path";
// fileURLToPath convierte la URL del módulo actual a una ruta de archivo normal
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// -------------------------------------------------------------
// RUTA DEL ARCHIVO JSON
// -------------------------------------------------------------
// path.join une partes de una ruta de forma segura.
// ".." sube un nivel (sale de /src), luego entra a /data/usuarios.json
// Resultado: /ruta-del-proyecto/data/usuarios.json
export const RUTA_USUARIOS = path.join( __dirname, "..", "data", "usuarios.json" );

// -------------------------------------------------------------
// DATOS POR DEFECTO
// -------------------------------------------------------------
const DEFAULT = [
    { id:1,nombre:"Ana",    edad:25 },
    { id:2,nombre:"Carlos", edad:30 },
    { id:3,nombre:"Sofía",  edad:22 },
]

// -------------------------------------------------------------
// FUNCIONES INTERNAS (privadas - no se exportant)
// -------------------------------------------------------------
/**
 * existe(ruta)
 * Comprueba si un archivo existe en el disco
 * Devuelve True si existe, false si no existe
 * 
 */
async function existe( ruta ){
    try {
        await access(ruta, FS_CONSTANTS.F_OK) // Intenta acceder al archivo
        return true
    } catch {
        return false
    }
}

// npm start -- add "Maria" 28

/**
 * validarNombre(nombre)
 * Limpia y valida el nombre antes de guardarlo.
 * 
 */
function validarNombre(nombre){
    const n = String(nombre).trim();
    if( n.length < 2 ) throw new Error("nombre debe tener al menos 2 caracteres.");
    return n;
}

/**
 * validarEdad(edad)
 * Convertir la edad en número y verificar que se un entero positivo
 * Number.isInteger() → verifica que no sea decimal (ej: 25.5 no es válido)
 * e <= 0             → rechaza cero y negativos
 * Devuelve la edad como número.
 */
function validarEdad( edad ){
    const e = Number(edad);
    if( !Number.isInteger(e) || e <= 0 ) throw new Error("Edad debe ser un entero positvo");
    return e
}

/**
 * nextId(usuarios)
 * Va a generar el próximo ID disponible de forma automática
 * Ejemplo : si los id actuales [1,2,3] -> 4
 * Si la lista esta vacia devuelve 1 (Primer usuario)
 */
function nextId(usuarios){
    if( usuarios.length === 0 ) return 1 // lista vacía -> empieza desde 1
    const max = Math.max(...usuarios.map( u => u.id )) // busca el id más alto
    return max + 1;
}

// -----------------------------------------------------------------------------
// FUNCIONES PUBLICAS (exportadas - se usan desde app.js)
// -----------------------------------------------------------------------------

/**
 * asegurarArchivo()
 * Garantizar que usuarios.json existe antes de cualquier operacion
 * 
 * - Si ya existe -> no hace nada (return corta la función)
 * - si NO existe -> lo crea con los datos DEFAULT
 * Se llama automáticamente dentro leerUsuarios()
 * 
 */
export async function asegurarArchivo(){
    if(await existe( RUTA_USUARIOS )) return // ya existe , no hay que hacer nada 
    
    await writeFile( RUTA_USUARIOS , JSON.stringify( DEFAULT, null, 2), "utf8")
}

/**
 * resetUsuarios()
 * Reinicia el archivo al estado inicial (Los 3 usuarios del DEFAULT)
 * Útil para pruebas : permite volver a empezar fácilmente 
 */
export async function resetUsuarios(){
    await writeFile( RUTA_USUARIOS, JSON.stringify( DEFAULT, null, 2 ), "utf8" );
}


/**
 * leerUsuarios()
 * Lee el archivo JOSN y devuelve el array de usuarios
 * PASOS
 * 1. Asegura que el archivo existe (Si no lo crea).
 * 2. Lee el contenido del archivo como texto (string).
 * 3. Convierte el texto JOSON en un ARRAY de obsjetos con JSON JSON.parse().
 * 4. Verifica que sea un ARRAY ( protección ante archivos corruptos ).
 * 5. Devuelve el ARRAY listo para usar.
 */

export async function leerUsuarios(){

    await asegurarArchivo() // Garantizamos que el archivo existe.

    const txt = await readFile( RUTA_USUARIOS, "utf8" );
    const data = JSON.parse(txt);
    if( !Array.isArray(data) ){
        throw new Error("usuarios.json debe contener un array de usuarios.");
    }
    return data;
}


/**
 * guardarUsuarios()
 * Sobreescribe todo el archivo con el array actualizado
 * recibe el array completo y lo convierte a JSON formateado antes de escribirlo.
 * Esta estrategia se llama "reescritura total" cada vez que hay un cambio
 * 
 */
export async function guardarUsuarios(arr){
    await writeFile(RUTA_USUARIOS, JSON.stringify(arr, null, 2), 'utf8');
}

/**
 * agregarUsuario( nombre, edad )
 * Agrega un usuario al JSON
 * PASOS:
 * 1) Lee los usuarios actuales
 * 2) Crea un objeto nuevo con id automatico y datos validados
 * 3) Agrega el nuevo usuario al ARRAY con .push()
 * 4) Guarda el ARRAY actualizado al archivo
 * 5) Devuelve el usuario recién creado
 */
export async function agregarUsuario( nombre, edad ){
    // Leemos los usuarios que hay en data/usuarios.json
    const usuarios = await leerUsuarios();
    // Contruir el objeto del nuevo usuario
    const nuevo = {
        id     : nextId( usuarios ),
        nombre : validarNombre( nombre ),
        edad   : validarEdad( edad )
    }

    // Lo agregamos al array final
    usuarios.push( nuevo );
    await guardarUsuarios(usuarios);

    return nuevo // Devuelve el usuario creado
}

/**
 * actualizarEdadPorId( id, edad )
 * Busca al usuario por su id y cambia su edad
 * PASOS
 * 1. Lee los usuarios actuales
 * 2. Convierte el ID a numero y lo valida
 * 3. Busca la posición (indice) del usuario en el array con findIndex()
 * 4. Si no lo encuentra , lanza error
 * 5. Actualiza solo el campo edad del usuario encontrado
 * 6. Guarda el array con el cambio
 * 7. Devuelve el usuario ya actualizado.
 */

export async function actualizarEdadPorId( id , edad ){

    const usuarios = await leerUsuarios();
    const ID = Number(id);

    if(!Number.isInteger(ID)) throw new Error("id debe ser un entero");

    const idx = usuarios.findIndex((u) => u.id === ID)

    if(idx === -1 ) throw new Error(`No existe usuario con id=${ID}`);
    
    usuarios[idx].edad = validarEdad( edad );

    await guardarUsuarios(usuarios);

    return usuarios[idx]

}


export async function eliminarUsuarioPorId(id){

    const usuarios = await leerUsuarios();
    const ID = Number(id);

    if(!Number.isInteger(ID)) throw new Error("id debe ser un entero");

    const idx = usuarios.findIndex((u) => u.id === ID)

    if(idx === -1 ) throw new Error(`No existe usuario con id=${ID}`);
    
    const eliminado = usuarios[idx]

    const nuevos = usuarios.filter( u => u.id !==ID)

    await guardarUsuarios(nuevos);

    return eliminado

}






