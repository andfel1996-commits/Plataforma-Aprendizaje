// Este middleware es un logger: registra por consola cada petición con su método URL código y duración
export const requestInfo = (req, res, next) => {
    // Guardamos el tiempo de inicio en milisegundos
    const startedAt = Date.now();

    res.on('finish', () => {
        const durationsMs = Date.now() - startedAt;
        console.log(`${req.method} ${req.originalUrl} -> ${res.statusCode} (${durationsMs} ms)`);
    })
    next()
}

/*

GET /api/v1/guitarras -> 200 (8 ms)
POST /api/v1/guitarras -> 201 (3 ms)
GET /api/v1/guitarras/id-que-no-existe -> 404 (1 ms)

*/
