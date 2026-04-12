import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
// Clase para lanzar errores HTTP con código y mensaje estructurado
import ApiError from '../utils/ApiError.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construye la ruta absoluta al archivo db.json (en la misma carpeta que este archivo)
const dbPath = path.join(__dirname, 'db.json');
// Lee el archivo db.json de forma síncrona y lo parsea a objeto Javascript
const DB = JSON.parse(fs.readFileSync( dbPath, 'utf8'));

const persistDB = async () => {
    await fs.promises.writeFile(dbPath, JSON.stringify( DB, null, 2 ), 'utf8');
}
// Busca y devuelve la posición (Índice) de una guitarra en el array por su id
// Devuelve -1 si no existe (igual que Array.findIndex)
const getIndexById = ( guitarId ) => DB.guitars.findIndex( guitar => guitar.id === guitarId )

// Busca si ya existe una guitarra con el mismo nombre ( Sin importar mayusculas )
// excludeId permite ignorar la guitarra que se esta editando (para no bloquerase a si misma )
const findDuplicateByName = (name, excludedId=null) =>
    DB.guitars.find(
        g => g.name.toLowerCase() === name.toLowerCase() && g.id !== excludedId
    )


export const getAllGuitarDB = () => [ ...DB.guitars];

export const getOneGuitarDB = ( guitarId ) => {
    const guitar = DB.guitars.find( item => item.id === guitarId)

    if(!guitar){
        throw new ApiError(404, `No existe una guitarra con el id '${guitarId}'`)
    }
    return guitar
}

export const createNewGuitarDB = async (newGuitar) => {

    const duplicate = findDuplicateByName(newGuitar.name)

    if(duplicate){
        throw new ApiError(409, `ya existe una guitarra con el nombre '${newGuitar.name}'.`)
    }

    DB.guitars.push(newGuitar);
    await persistDB();
    return newGuitar;
}

// PUT
export const replaceOneGuitarDB = async ( guitarId, guitarData ) => {

    const index = getIndexById(guitarId)

    if(index === -1){
        throw new ApiError(404, `No existe una guitarra con el id '${guitarId}'.`)
    }

    const duplicate = findDuplicateByName(guitarData.name, guitarId)

    if(duplicate){
        throw new ApiError(409, `Ya existe otra guitarra con el nombre '${guitarData.name}' `)
    }

    // El spread operator fusiona: Datos originales + datos nuevos 
    const update = { ...DB.guitars[index], ...guitarData, id:guitarId, updateAt: new Date().toISOString() }

    DB.guitars[index] = update;
    await persistDB()

    return update;

}

// Actuliza parcialmente una guitarra (operación : PATCH sólo los campos enviados )
export const patchOneGuitarDB = async ( guitarId, changes ) => {
     const index = getIndexById(guitarId)
     if(index === -1)  throw new ApiError(404, `No existe una guitarra con el id '${guitarId}'.`) 
    
    // Solo verifica duplicados si se está cambiando el nombre
    if(changes.name){
         const duplicate = findDuplicateByName(changes.name, guitarId)
         if(duplicate)  throw new ApiError(409, `Ya existe otra guitarra con el nombre '${changes.name}'.`) 
    }

    const update = { ...DB.guitars[index], ...changes, id:guitarId, updateAt: new Date().toISOString() }
    
    DB.guitars[index] = update;
    await persistDB()
    return update;
}

// Elimina una guitarra del array por su id
export const deleteOneGuitarDB = async (guitarId) => {
    const index = getIndexById(guitarId)
    if(index === -1)  throw new ApiError(404, `No existe una guitarra con el id '${guitarId}'.`) 
    DB.guitars.splice( index,1 )
    await persistDB()
}
















