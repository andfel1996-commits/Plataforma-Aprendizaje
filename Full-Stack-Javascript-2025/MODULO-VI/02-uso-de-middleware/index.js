/**
 * app.js (Express + Middleware explicado paso a paso)
 * ---------------------------------------------------
 * OBJETIVO:
 * 1) Entender QUÉ es un Middleware.
 * 2) Ver cómo "intercepta" una petición ANTES de llegar a la ruta final (handler).
 * 3) Entender el flujo con next() y qué pasa si respondemos con res.send().
 *
 * ¿Qué es un Middleware?
 * - Es una función que se ejecuta "en medio" del request (req) y la response (res).
 * - Se usa para:
 *   Validar (auth, permisos, datos)
 *   Registrar logs (logger)
 *   Transformar datos (ej: parsear JSON con express.json())
 *   Controlar el flujo (dejar pasar o cortar)
 *
 * FIRMA típica:
 *   (req, res, next) => { ... }
 *
 * req  = request (lo que llega del cliente)
 * res  = response (lo que enviamos al cliente)
 * next = función que le dice a Express: "continúa con el siguiente middleware/handler"
 */

import express from 'express';
import path from 'node:path';
import { fileURLToPath } from "node:url";
const app = express();
console.clear();


/* =========================================================
   1) Resolver rutas en ESM (porque __dirname NO existe en ESM)
   ---------------------------------------------------------
   En Node hay 2 estilos:

   A) CommonJS (viejo):  const express = require("express")
      - Tiene __dirname y __filename disponibles.

   B) ESM (moderno):     import express from "express"
      - NO tiene __dirname ni __filename.
      - Por eso debemos reconstruirlos.

   import.meta.url:
   - Es la URL del archivo actual.
   - Viene en formato URL: "file:///ruta/al/archivo/app.js"

   fileURLToPath(import.meta.url):
   - Convierte esa URL a ruta real del sistema:
     "file:///.../app.js" -> "/.../app.js"
   ========================================================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("__filename =", __filename)
console.log("__dirname =", __dirname)
/* =========================================================
   2) Middleware: carpeta pública (STATIC)
   ---------------------------------------------------------
   express.static() es un MIDDLEWARE.
   Sirve archivos que están en una carpeta del proyecto, tal cual:

   Si existe:
     public/index.html
     public/css/app.css
     public/img/logo.png

   entonces se puede acceder vía navegador.

   ¿Por qué usamos path.join(__dirname, "public")?
   - Para apuntar a la carpeta "public" usando una ruta absoluta segura.
   - Así funciona igual aunque ejecutes node desde otro lugar.

   IMPORTANTE:
   - express.static responde SOLO si encuentra el archivo.
   - Si NO lo encuentra, llama next() internamente y Express sigue buscando rutas.
   ========================================================= */
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));

/*
    0) Middleware Global
    app.use(...) este se ejecuta en todas las peticiones.
    Útil para logger , medición de tiempo 
*/

app.use((req,res, next )=>{
    const inicio = Date.now();
    res.on("finish", ()=>{
        const ms = Date.now() - inicio;
        console.log(`[LOG] ${req.method} -> ${res.statusCode} -> ${ms}`)
    })
    // Si NO llamamos next(), el request se quedaría "pegado" (no avanza)
    next();
})

/*
    1) Middleware con RUTA
    - Se ejecuta SOLO si la ruta comieza con "/Tiempo"
    - app.use aplica a CUALQUIER método HTTP (GET/POST/etc)
*/

app.use("/Tiempo", (req,res,next)=>{
    // Lee el header Authorization
    // Ejemplo en Postman
    // Authorization:12345
    //   const auth = req.header("Authorization");
    const auth = req.header("Authorization")

    /*
        -Si auth EXISTE => next() => Express sigue hacia app.get("/Tiempo")
        -Si auth NO EXISTE => Respondemos => NO next() => Se corta el flujo
    */
    if(auth){
        console.log("[AUTH] Autorización recibida", auth);
        return next();
    }

    return res.status(401).send("Quien es ? Falta Authorización")
})

app.get("/Tiempo", (req,res)=>{
    const tiempo = {time:Date.now()}
    return res.json(tiempo)
})


app.use("/colores/:color", (req, res, next)=>{
    const { color } = req.params
    const colorNormalizado = String(color).toLocaleLowerCase();

    if(colorNormalizado === "azul"){
        return next()
    }
    return res.status(403).send("No es Azul (Acceso bloqueado)")
})

app.get("/colores/:color", (req, res)=>{
    return res.send("Si es azul")
})

app.use((req,res)=>{
    return res.status(404).send(`404 - Ruta no encontrada : ${req.method} ${req.originalUrl}`)
})

/*
app.use(( err, req, res, next )=>{
    console.error("[ERROR]", err)
    return res.status(500).send("500 - Error interno del servidor")
})
*/ 



app.listen( 3000,()=>console.log("Servidor up en el puerto 3000"));