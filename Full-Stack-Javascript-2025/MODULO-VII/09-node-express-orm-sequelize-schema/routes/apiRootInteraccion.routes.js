import express from 'express';
import {
    crearInteraccion,
    getPublicacionesPorUsuario,
    getUsuariosPorPublicacion,
    eliminarInteraccion
} from '../controller/interaccionHandler.js';

// ─────────────────────────────────────────────────────────────────────────────
// Router — /api/interaccion
// ─────────────────────────────────────────────────────────────────────────────
// Todas estas rutas quedan montadas bajo el prefijo /api/interaccion
// que se define en Server.js (apiPaths.interaccion).
//
// Tabla de endpoints:
//   Método   URL completa                                      Acción
//   ──────   ────────────────────────────────────────────────  ─────────────────────────────
//   POST     /api/interaccion                                  Crear interacción (usuario → publicación)
//   GET      /api/interaccion/usuario/:usuarioId               Publicaciones de un usuario
//   GET      /api/interaccion/publicacion/:publicacionId       Usuarios de una publicación
//   DELETE   /api/interaccion/:usuarioId/:publicacionId        Eliminar interacción
// ─────────────────────────────────────────────────────────────────────────────

const router = express.Router();

// POST /api/interaccion
// Body: { usuarioId, publicacionId, tipo? }
router.post('/', crearInteraccion);

// GET /api/interaccion/usuario/:usuarioId
// Devuelve todas las publicaciones con las que interactuó el usuario
router.get('/usuario/:usuarioId', getPublicacionesPorUsuario);

// GET /api/interaccion/publicacion/:publicacionId
// Devuelve todos los usuarios que interactuaron con la publicación
router.get('/publicacion/:publicacionId', getUsuariosPorPublicacion);

// DELETE /api/interaccion/:usuarioId/:publicacionId
// Elimina el vínculo entre ese usuario y esa publicación
router.delete('/:usuarioId/:publicacionId', eliminarInteraccion);

export default router;
