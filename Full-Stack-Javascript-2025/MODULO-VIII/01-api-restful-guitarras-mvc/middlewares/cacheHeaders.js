export function cacheForGetRequest( seconds = 60 ){
    return function(req, res, next ){
        if(req.method === 'GET'){
            // Para peticiones GET: permite al navegador y proxies guardar la respuesta en caché
            res.set('Cache-Control', `public, max-age=${seconds}`)
        }else{
           // Para POST, PUT, PATCH, DELETE: nunca almacenar en caché
            res.set('Cache-Control', 'no-store')
        }
        // pasar el control al siguiente Middleware o controlador 
        next()
    }
}
