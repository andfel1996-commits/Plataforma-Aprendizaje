// Router de Express agrupa rutas relacionadas
import { Router } from 'express'

import {
    obtenerFecha,
    obtenerTareas,
    crearTarea,
    actualizarTarea,
    borrarTarea
} from '../controller/tareasController.js';


const router = Router();

// ── GET /api/tareas/date ──────────────────────────────────────────────────────
// Devuelve la hora del servidor PostgreSQL.
// Útil para confirmar en Postman que la BD está activa.

//   GET    /api/tareas/date   → obtenerFecha
//   GET    /api/tareas        → obtenerTareas
//   POST   /api/tareas        → crearTarea
//   PUT    /api/tareas/:id    → actualizarTarea
//   DELETE /api/tareas/:id    → borrarTarea
router.get('/date', obtenerFecha );

// ── GET /api/tareas ───────────────────────────────────────────────────────────
// Devuelve todas las tareas ordenadas por id DESC.
router.get('/', obtenerTareas )

// ── POST /api/tareas ──────────────────────────────────────────────────────────
// Crea una nueva tarea.
// Body JSON: { "titulo": "...", "descripcion": "..." }
router.post('/', crearTarea);

// ── PUT /api/tareas/:id ───────────────────────────────────────────────────────
// Actualiza una tarea existente por su id.
// Body JSON: { "id": 1, "titulo": "...", "descripcion": "..." }
router.put('/:id', actualizarTarea);

// ── DELETE /api/tareas/:id ────────────────────────────────────────────────────
// Elimina la tarea con el id indicado. Devuelve la fila eliminada.
router.delete('/:id', borrarTarea);

export default router;