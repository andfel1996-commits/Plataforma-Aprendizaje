// ─────────────────────────────────────────────────────────────────────────────
// HATEOAS — Hypermedia As The Engine Of Application State
//
// HATEOAS es un principio REST que dice que cada respuesta debe incluir
// enlaces (_links) que le indiquen al cliente qué acciones puede realizar
// a continuación, sin necesidad de que el cliente conozca las URLs de memoria.
//
// Ejemplo de lo que agrega en cada respuesta:
//   "_links": {
//     "self":          { "href": "http://localhost:3000/api/v1/guitarras/d8be2362" },
//     "update":        { "href": "http://localhost:3000/api/v1/guitarras/d8be2362", "method": "PUT" },
//     "partialUpdate": { "href": "http://localhost:3000/api/v1/guitarras/d8be2362", "method": "PATCH" },
//     "delete":        { "href": "http://localhost:3000/api/v1/guitarras/d8be2362", "method": "DELETE" },
//     "collection":    { "href": "http://localhost:3000/api/v1/guitarras" }
//   }
// ─────────────────────────────────────────────────────────────────────────────

// Construye la URL base del servidor dinámicamente a partir del objeto req de Express.
// req.protocol → "http" o "https"
// req.get('host') → "localhost:3000" (o el dominio en producción)
// Resultado: "http://localhost:3000"
// Se hace dinámico para que funcione igual en desarrollo, staging o producción sin cambiar código.
export const getBaseUrl = (req) => `${req.protocol}://${req.get('host')}`;

// Genera los links para respuestas del tipo GET
export const buildCollectionLinks = (req, meta = {}) => {

    const baseUrl = getBaseUrl(req)

    // Construye un objeto URL completo con la ruta y query params actuales
    // req.originalUrl → "/api/v1/guitarras?page=2&limit=3"
    // new URL(path, base) → "http://localhost:3000/api/v1/guitarras?page=2&limit=3"
    // Esto permite manipular los query params fácilmente (agregar ?page=3, etc.)
    const url = new URL(req.originalUrl, baseUrl);

    // Links base que simepre se incluyen en la respuesta de coleccion
    const links = {
        self: { href: url.toString() },                             // URL exacta de la petición
        create: { href: `${baseUrl}/api/v1/guitarras`, method: 'POST' }, // Indica com,o crear un nuevo recurso
        docs: { href: `${baseUrl}/api/v1` }                         // Documentación
    }

    // Agrega "next" si NO estamos en la última página
    if (meta.hasNextPage && meta.page && meta.totalPages) {
        const nextUrl = new URL(url) // Clonamos la URL Actual para no modificarla
        nextUrl.searchParams.set('page', String(meta.page + 1)) // Cambia sólo el prametro page al siguiente
        links.next = { href: nextUrl.toString() } // "...?page=3"
    }

    // Agrega "prev" si NO estamos en la primera página
    if ( meta.hasPrevPage && meta.page > 1 ) {
        const prevUrl = new URL(url)
        prevUrl.searchParams.set('page', String(meta.page - 1))
        links.prev = { href: prevUrl.toString() }
    }

    return links
}

// Genera los _links para respuestas de un recurso individual (GET/PUT/PATCH/DELETE /api/v1/guitarras/:id)
// Recibe el id de la guitarra para construir la URL completa del recurso.
export const buildGuitarLinks = (req, guitarId) => {

    const baseUrl = getBaseUrl(req)
    const resourceUrl = `${baseUrl}/api/v1/guitarras/${guitarId}`;

    return {
        self:          { href: resourceUrl },
        collection:    { href: `${baseUrl}/api/v1/guitarras` },
        update:        { href: resourceUrl, method: 'PUT' },
        partialUpdate: { href: resourceUrl, method : 'PATCH' },
        delete:        { href: resourceUrl, method: 'DELETE' }
    }
}
