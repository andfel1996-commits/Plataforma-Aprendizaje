import { v4 as uuidv4 } from 'uuid';

import {
    createNewGuitarDB,
    deleteOneGuitarDB,
    getAllGuitarDB,
    getOneGuitarDB,
    patchOneGuitarDB,
    replaceOneGuitarDB
} from '../database/Guitars.js';

// GET /api/v1/guitarras
export const getAllGuitarsService = (query={}) => {
    // FRASE CLAVE DE CLASE:
    // "Primero busco, despues ordeno, y recien al final corto la pagina."
    // Esta funcion sigue exactamente ese orden.

    // Paso 0: leemos lo que llega en la URL (query string).
    // Ejemplo de URL:
    // /api/v1/guitarras?q=gibson&sortBy=value&order=asc&page=2&limit=3
    const {
        q,
        sortBy,
        order = 'asc',
        page = '1',
        limit = '10'
    } = query;

    // Paso 1: SANITIZAR page y limit.
    // "Sanitizar" significa limpiar la entrada del usuario.
    // No confiamos en lo que llega, lo acomodamos para que sea util y seguro.
    // Si page o limit son invalidos, usamos un valor seguro por defecto.
    // - page invalido  -> 1
    // - limit invalido -> 10
    const parsedPage = Number.parseInt(String(page), 10);
    const parsedLimit = Number.parseInt(String(limit), 10);
    const pageNumber = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;
    const limitNumber = Number.isInteger(parsedLimit) && parsedLimit > 0 ? parsedLimit : 10;

    // Paso 2: NORMALIZAR order.
    // Solo trabajamos con dos posibilidades reales: "asc" o "desc".
    // Si viene cualquier otro texto, tomamos "asc".
    const normalizedOrder = String(order).toLowerCase() === 'desc' ? 'desc' : 'asc';

    // Paso 3: obtenemos todos los registros (lista completa, sin filtros aun).
    const allItems = getAllGuitarDB();

    // Paso 4: FILTRO por texto (q).
    // En palabras simples: q funciona como una lupa de busqueda.
    // Si no llega q, no filtramos y usamos toda la lista.
    // Si llega q, buscamos ese texto en varios campos de cada guitarra.
    let filtered = allItems;

    if(q){

        // Normalizamos el texto de busqueda para comparar sin importar mayusculas/minusculas.
        const search = String(q).trim().toLowerCase();
        // Para cada guitarra armamos una "bolsa de texto" con campos buscables.
        // Luego preguntamos: "alguno de estos campos contiene el texto buscado?"

        filtered = allItems.filter( ( guitar ) => {
            const searchableValues = [
                guitar.id,
                guitar.name,
                guitar.brand,
                guitar.model,
                guitar.body,
                guitar.color,
                guitar.pickups
            ]

            /*
                Quitamos valores vacios para evitar errores al convertir a texto.
                const datos = [1, 0, 'Hola', '', null, 'Mundo', undefined, false];
                const limpios = datos.filter(Boolean);
                // Resultado: [1, 'Hola', 'Mundo']
            */
            .filter( Boolean )
            // Convertimos todo a minuscula para una comparacion uniforme.
            .map(value => String(value).toLowerCase());

            // Si al menos un campo incluye el texto buscado, esta guitarra queda en la lista.
            return searchableValues.some( value => value.includes(search))
        })
    }

    // Paso 5: ORDENAMIENTO (sortBy + order).
    // En palabras simples: sort es acomodar una fila.
    // OJO: ordenamos la lista ya filtrada, no la lista original.
    // Si no llega sortBy, conservamos el orden actual.
    let sorted = filtered;

    if( sortBy ){

        // direction define el "sentido" del ordenamiento:
        // - asc  =>  1 (menor a mayor / A a Z)
        // - desc => -1 (mayor a menor / Z a A)
        const direction = normalizedOrder === 'desc' ? -1 : 1;

        sorted = [ ...filtered ].sort(( a, b ) => {
            // Leemos dinamicamente el campo pedido por el cliente.
            // Ejemplo: si sortBy=value, comparamos a.value con b.value.
            const aValue = a[sortBy];
            const bValue = b[sortBy];

            // Si faltan valores, decidimos un orden estable para evitar resultados raros.
            // - Si ambos faltan, los tratamos como iguales.
            // - Si solo falta uno, ese se va al final.
            if( aValue === undefined && bValue === undefined ) return 0
            if( aValue === undefined ) return 1;
            if( bValue === undefined ) return -1;


            // Si ambos son numeros, ordenamos con resta matematica.
            if( typeof aValue === 'number' && typeof bValue === 'number' ){
                return ( aValue - bValue ) * direction
            }

            /**
              a = 299
              b = 1599

              a - b 
              299 - 1599 = -1300 -> negativo -> 299 -> va primero -> orden ASCENDENTE
              -1300 * -1 = 1300 -> positivo -> 1599 -> va primero -> orden DESCENDENTE
             */

              /*
                "Fender".localeCompare("Gibson", 'es', { sensitivity: 'base' })
                // → negativo → Fender va primero ✓ (alfabéticamente F < G)

                "Gibson".localeCompare("Fender", 'es', { sensitivity: 'base' })
                // → positivo → Fender va primero ✓
              
              */

            // Si son textos (o convertibles a texto), usamos comparacion alfabetica.
            // numeric:true hace que "2" quede antes que "10" (orden natural).
            return String(aValue).localeCompare(String(bValue), 'es', {
                sensitivity : 'base',
                numeric: true,
            }) * direction
        })
    }

    // Paso 6: PAGINACION (page + limit).
    // En palabras simples: paginar es cortar la lista en bloques.
    // Reglas para explicar en clase:
    // - limit = tamano del bloque
    // - page  = que bloque quiero ver
    // - primero filtro y ordeno, recien despues corto la pagina
    const total = sorted.length;
    const totalPages = total === 0 ? 1 : Math.ceil(total / limitNumber);

    // Si piden una pagina mayor a la ultima disponible, respondemos con la ultima.
    // Esto evita devolver una pagina "fantasma".
    const currentPage = Math.min(pageNumber, totalPages);

    // Formulas clave de paginacion (estas conviene escribirlas en pizarra):
    //   startIndex = (page - 1) * limit
    //   endIndex   = startIndex + limit
    // Ejemplo: page=2, limit=3 -> start=3, end=6
    const startIndex = (currentPage - 1) * limitNumber;
    const endIndex = startIndex + limitNumber;

    // slice corta solo el bloque que corresponde a la pagina solicitada.
    const items = sorted.slice(startIndex, endIndex);

    // Paso 7: devolvemos datos + meta de navegacion.
    // meta funciona como el "GPS" de la paginacion:
    // te dice donde estas y si puedes ir a la pagina anterior o siguiente.
    return {
        items,
        meta : {
            total,
            count: items.length,
            page: currentPage,
            limit: limitNumber,
            totalPages,
            hasPrevPage: currentPage > 1,
            hasNextPage: currentPage < totalPages
        }
    }
}

// GET /api/v1/guitarras/:id 
export const getOneGuitarService = ( guitarId ) => {
    return getOneGuitarDB( guitarId )
}

// POST /api/v1/guitarras
export const createNewGuitarService = async ( newGuitar ) => {
    const guitarToInsert = {
        id : uuidv4().split('-')[0],
        ...newGuitar,
        createdAt: new Date().toISOString()
    }
    return await createNewGuitarDB(guitarToInsert)
}

// PUT /api/v1/guitarras/:id
export const replaceOneGuitarService = async ( guitarId, guitarData ) => {
    return await replaceOneGuitarDB( guitarId, guitarData )
}

// PATCH /api/v1/guitarras/:id
export const patchOneGuitarService = async ( guitarId, changes ) => {
    return await patchOneGuitarDB(guitarId, changes)
}

// DELETE /api/v1/guitarras/:id
export const deleteOneGuitarService = async ( guitarId ) => {
    await deleteOneGuitarDB( guitarId )
}