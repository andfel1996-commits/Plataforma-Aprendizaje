import express from 'express';
import { postUsuario } from '../controller/usuarioHandler.js';

const router = express.Router();


router.post('/', postUsuario )

export default router