/*
Objetivo:
Crear un servidor con el Módulo Nativo de NODEJS

*/
import http from "http"; // Módulo Nativo : Servidor HTTP
const PORT = 3000;


const server = http.createServer( ( req, res ) => {
    // Podemos definir nuestras rutas 
    const url = req.url;
    const method = req.method;

    // console.log('Salida de req',req )
    console.log(`[HTTP] ${url} ${method}`)

    res.setHeader("Content-Type","text/plain; charset=utf-8")

    if(url === "/"){
        res.statusCode = 200;
        res.end("Hola mundo desde NodeJS (HTTP nativo) ESM/import\n");
        return
    }

    if(url === "/saludo"){
          res.statusCode = 200;
          res.end("Hola desde /saludo ");
          return;
    }

    if(url === "/hora"){
        const ahora = new Date().toLocaleString('es-CL');
        res.statusCode = 200;
        res.end(`Hora actual :${ahora}\n`)
    }

    res.statusCode = 404


    return res.end(
        JSON.stringify({
        error: "Ruta no encontrada",
        method: req.method

        })
    );

});


server.listen( PORT,()=>{
    console.log(`Servidor HTTP corriendo en : http://localhost:${PORT}/`)
})
// console.clear()



