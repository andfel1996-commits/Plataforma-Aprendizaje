import express from 'express';
import { getPublicaciones, getPublicacionesByUsuario } from '../controller/publicacionHandler.js';

const router = express.Router();

router.get('/', getPublicaciones);
// GET /api/publicacion/usuario/:usuarioId
router.get('/usuario/:usuarioId', getPublicacionesByUsuario )

export default router;