// 1) IMPORTS
import dotenv from "dotenv"
import express from 'express' // Framework para crear servidor
import path from "node:path" // Manejo de rutas 
import { fileURLToPath } from 'node:url' // Para calcular __filename en MODULE
import fs from "node:fs/promises" // File System con promesas (async/await)
dotenv.config();

// 2) Crear __dirname
const __filename = fileURLToPath(import.meta.url)  // Ruta absoluta al archivo actual
const __dirname  = path.dirname(__filename)  // Carpeta donde vive este server.js

// 3) Configuración
const app = express();
// Puerto del server (En producción suele venir de variable de entorno)
const PORT = process.env.PORT || 3000;

// Ruta Absoluta al archivo JSON que usaremos como "DB"
const DB_FILE = path.join(__dirname, "db", "tareas.json");

// 4) MIDDLEWARES
// express.json(), Lee el body de requests POST/PUT con Content-Type: application/json
app.use(express.json())

// Servir el FRONT con express.static()
// Servir como raíz estática la carpeta
/*
 * - Vamos a servir como raíz estática la carpeta:
 *     ../public/admin-tareas
 *   Entonces:
 * - http://localhost:3000/               -> index.html
 * - http://localhost:3000/assets/...     -> assets del front
*/
app.use(express.static(path.join( __dirname, "..", "public", "admin-tareas" )));

// 5) Funciones utilitarias
/*
    * - Verifica que exista el archivo tareas.json.
    * - Si no existe, crea la carpeta db/ y el archivo con [] (array vacío).
*/
async function ensureDB(){
    try {
        await fs.access(DB_FILE) // Si existe , no pasa nada 
    } catch (error) {
        // Si no existe , lo creamos
        await fs.mkdir(path.dirname(DB_FILE));
        await fs.writeFile(DB_FILE, "[]", "utf-8");
    }
}

/*
    * readTareas()
    * - Lee el archivo JSON y lo convierte a un array de tareas.
    * - Si está vacío o da error, devolvemos [].
*/

async function readTareas(){
    await ensureDB();
    const raw = await fs.readFile(DB_FILE , "utf-8");
    if(!raw.trim()) return []
    return JSON.parse(raw)
}

/**
 * writeTareas(tareas)
 * - Recibe un array y lo guarda en el archivo JSON.
 * - JSON.stringify con indentación para que se vea bonito.
 */

async function writeTareas(tareas){
    await ensureDB();
    const pretty = JSON.stringify(tareas,null,2)
    await fs.writeFile( DB_FILE, pretty, "utf-8")
}

/**
 * parseIdFromQuery(req)
 * - En el ejercicio original el id venía así: /tareas?id=3
 * - Aquí lo mantenemos igual por compatibilidad con el front.
 *
 * Retorna:
 * - number (1..N) si existe y es válido
 * - null si no es válido
 *  */

function parseIdFromQuery(req){
    const id = Number(req.query.id)
    if(!Number.isInteger(id) || id <= 0 ) return null
    return id
}

/*
     ENDPOINTS   
*/ 
// GET http://localhost:3000/tareas
app.get("/tareas", async (req, res)=>{
    const tareas = await readTareas();
    return res.json(tareas)
})

app.post('/tareas', async (req, res)=>{
    try {
        const { titulo, descripcion } = req.body ?? {}
        if(!titulo || !descripcion ){
            return res.status(400).json({
                error:"Faltan campos, Debes enviar { Titulo, descripcion }"
            })
        }
        const tareas = await readTareas();
        tareas.push({ titulo, descripcion })

        await writeTareas(tareas)
        return res.status(201).json(tareas)

    } catch (error) {
        return res.status(400).json({error:"JSON Inválido o Body incorrecto"})
    }
})

// PUT
app.put('/tareas', async (req,res)=>{
    const id = parseIdFromQuery(req)
    if(!id){
        return res.status(400).json({error:"Debes enviar ?id=1 (Número valido)"})
    }
    const { titulo, descripcion } = req.body ?? {};
    if(!titulo || !descripcion){
        return res.status(400).json({
            error:"Faltan campos. Debes enviar {titulo,descripción}"
        })
    }
    const tareas = await readTareas();
    const index = id - 1
    if(!tareas[index]){
        return res.status(400).json({
            error:`No existe tarea con id=${id}`
        })
    }
    tareas[index] = {titulo , descripcion}
    await writeTareas(tareas)
    return res.json(tareas)
})

// DELETE
app.delete("/tareas", async (req,res)=>{

    const id = parseIdFromQuery(req)

    if(!id){
        return res.status(400).json({error:"Debes enviar ?id=1 (Número valido)"})
    }

    const tareas = await readTareas();
    const index = id - 1
        if(!tareas[index]){
        return res.status(400).json({
            error:`No existe tarea con id=${id}`
        })
    }
    // const frutas = ["peras","manzanas","naranjas","platanos"]
    // frutas[1] // manzanas
    // frutas.splice(1, 2)
    const eliminada = tareas.splice(index, 1)
    await writeTareas(tareas)
    return res.json({
        mensaje : `Tarea id=${id} eliminada correctamente`,
        eliminada:eliminada[0],
        tareas
    })
})

app.use((req, res) => {
  const accept = req.headers.accept || "";

  if (accept.includes("application/json")) {
    return res.status(404).json({
      error: "Not Found",
      message: `La URL ${req.method} ${req.originalUrl} no existe`,
    });
  }

  return res.status(404).send(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>404</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="bg-light">
        <main class="container py-5">
          <div class="alert alert-warning" role="alert">
            404 - La URL <strong>${req.method} ${req.originalUrl}</strong> no existe
          </div>
        </main>
      </body>
    </html>
  `);
});


app.listen(PORT, ()=>`Servidor UP en puerto ${PORT}`)