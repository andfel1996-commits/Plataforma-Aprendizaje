// Router de Express agrupa rutas relacionadas
import { Router } from 'express'

import {
    obtenerFecha,
    obtenerClientes,
    crearCliente,
    actualizarCliente,
    borrarCliente
} from '../controller/clientesController.js';


const router = Router();

// ── GET /api/tareas/date ──────────────────────────────────────────────────────
// Devuelve la hora del servidor PostgreSQL.
// Útil para confirmar en Postman que la BD está activa.

//   GET    /api/clientes/date   → obtenerFecha
//   GET    /api/clientes        → obtenerTareas
//   POST   /api/clientes        → crearTarea
//   PUT    /api/clientes/:id    → actualizarTarea
//   DELETE /api/clientes/:id    → borrarTarea

router.get('/date', obtenerFecha );

// ── GET /api/clientes ───────────────────────────────────────────────────────────
// Devuelve todas los clienetes
router.get('/', obtenerClientes )

// ── POST /api/clientes ──────────────────────────────────────────────────────────
// Crea una nuevo cliente
router.post('/', crearCliente);

// ── PUT /api/clientes/:id ───────────────────────────────────────────────────────
// Actualiza una cliente existente por su id.
router.put('/:id', actualizarCliente);

// ── DELETE /api/clientes/:id ──────────────────────────────────────────────────
// Elimina el cliente con el id indicado. Devuelve la fila eliminada.
router.delete('/:id', borrarCliente );

// ── DELETE /api/clientes  (sin id) ────────────────────────────────────────────
// Captura el caso en que se olvida el id y devuelve un error claro.
router.delete('/', (req, res) => {
    res.status(400).json({
        ok: false,
        mensaje: 'Debes indicar el id del cliente en la URL. Ejemplo: DELETE /api/clientes/5'
    });
});

export default router;