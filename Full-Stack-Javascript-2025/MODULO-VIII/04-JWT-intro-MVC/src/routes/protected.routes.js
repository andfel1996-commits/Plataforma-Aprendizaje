import express from 'express';
const router = express.Router()
import { verificarJWT } from '../middlewares/auth.js'

// Endpoint protegido de ejemplo: Perfil de usuario utenticado
// Flujo de ejecución
// 1) llega la request a /perfil
// 2) se ejecuta verificarJWT
// 3) Si el token es valido, se llena req.user y se continua
// 4) Si el token es invalido, el middleware responde 401 y este handlre no corre

router.get('/perfil', verificarJWT , (req, res) => {

    res.status(200).json({
        status: 'success',
        code:200,
        mensaje: 'Acceso autorizado con JWT',
        data:{
            usuario:req.user
        }
    });

});

export default router;