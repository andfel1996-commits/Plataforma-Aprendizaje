/**
 * 02-express-api/app.js (ESM)
 * ------------------------------------------------------------
 * OBJETIVO PEDAGÓGICO 
 * 1) Levantar un servidor con Express (más simple que http nativo).
 * 2) Crear una API REST con CRUD para "tareas":
 *    - GET    /api/tareas        -> listar todas
 *    - GET    /api/tareas/:id    -> obtener 1 por id
 *    - POST   /api/tareas        -> crear una nueva
 *    - PUT    /api/tareas/:id    -> actualizar una existente
 *    - DELETE /api/tareas/:id    -> eliminar una existente
 * 3) Entender:
 *    - req (request) y res (response)
 *    - req.params (parámetros de ruta, ej :id)
 *    - req.body (datos enviados en POST/PUT)
 *    - status codes: 200, 201, 204, 400, 404
 *    - middleware: express.json() + logger
 *
 * CÓMO PROBAR (IMPORTANTÍSIMO)
 * - GET se puede probar fácil en el navegador.
 * - POST/PUT/DELETE NO se pueden "hacer bien" desde el navegador escribiendo una URL.
 *   Para eso necesitas una herramienta como:
 *   ✅ Postman / Thunder Client (VSCode) / Insomnia / curl (terminal)
 *
 * Ejecutar:
 *   npm run dev
 */


import express from "express";
import * as tareasStore from './data/tareas.js';

const app = express();
const PUERTO = 3000;

// Meddleware
app.use(express.json());

// Hacemos nuestra primera ruta con express
app.get('/', (req,res)=>{
    res 
        .status(200)
        .send("API funcionando (ESM). Prueba /api/tareas o envía POST/PUT/DELETE.");
});

app.get('/api/tareas', (req,res)=>{
    const tareas = tareasStore.getAll();
    res.status(200).json(tareas);
})

app.get('/api/tareas/:id', ( req, res)=>{
    // console.log( 'Salida de req.params-->', req );
    const id = Number(req.params.id);

    if(!Number.isFinite(id)){
        return res.status(400).json({mensaje:"El id debe ser numérico"})
    }

    const tarea = tareasStore.getById(id);
    if(!tarea){
        return res.status(404).json({mensaje: "No encontrada"})
    }

    res.status(200).json(tarea);
})

app.post("/api/tareas", (req,res) => {
    /*
        req.body esto viene gracias a express.json()
    */
   const { titulo } = req.body
   if(!titulo || typeof titulo !== "string" || titulo.trim().length < 3){
        return res.status(400).json({
            mensaje :"titulo es requerido (string) y debe tener al menos 3 caracteres"
        })
   }

   // Creamos nuestra tarea 
   const nueva = tareasStore.create({titulo:titulo.trim()});
   res.status(201).json(nueva);
})

app.put('/api/tareas/:id', ( req, res)=>{

    const id = Number(req.params.id);
    if(!Number.isFinite(id)){
        return res.status(400).json({mensaje:"El id debe ser numérico"})
    }

    const {titulo, completado } = req.body;

    if( typeof titulo !== "string" || titulo.trim().length < 3 ){
        return res.status(400).json({
            mensaje :"titulo es requerido (string) y debe tener al menos 3 caracteres"
        })
    }

    if(typeof completado !== "boolean"){
       return res.status(400).json({
            mensaje :"Si envías completado, debe ser boolean (true/false)"
        })
    }

    // hacer el update
    const actualiza = tareasStore.update(id, {
        titulo : typeof titulo === "string" ? titulo.trim() : titulo,
        completado
    })

    if(!actualiza){
        return res.status(404).json({mensaje: "No encontrada"})
    }

    res.status(200).json(actualiza);
})


// Eliminar 
app.delete("/api/tareas/:id", (req, res )=>{

    const id = Number(req.params.id);

    if(!Number.isFinite(id)){
        return res.status(400).json({mensaje:"El id debe ser numérico"})
    }

    const ok = tareasStore.remove(id)
    if(!ok){
        return res.status(404).json({mensaje:"No encontrado"})
    }
    res.status(204).send()
})

app.get('/ir-a-tareas', (req,res)=>{
    res.redirect("/api/tareas");
})

app.use((req,res)=>{
    res.status(404).json({mensaje:"Ruta no encontrada"})
})

app.listen( PUERTO ,()=>{
    console.log(`Servidor arriba 🚀 con express en http://localhost:${PUERTO}/`)
})
