import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router()
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';

const USUARIOS = [
    {
        id : 1,
        email : process.env.DEMO_ADMIN_EMAIL || 'admin@tutorial.dev',
        password : process.env.DEMO_ADMIN_PASSWORD || 'Admin123*',
        role: 'admin',
        nombre : 'Administrador'
    },
    {
        id : 2,
        email : process.env.DEMO_ADMIN_EMAIL || 'user@tutorial.dev',
        password : process.env.DEMO_ADMIN_PASSWORD || 'User123*',
        role: 'user',
        nombre : 'Usuario Regular'
    }
]

// Endpoint Publico
// Recibe email y password,  valida credenciales y retorna JWT
router.post('/login', (req, res) => {

    const { email, password } = req.body
    // Validación
    if(!email || !password){
        return res.status(400).json({
            status:'error',
            code:400,
            mensaje : 'Email y password son obligatorios'
        })
    }

    // Buscamos el usuario email ignorando mayusculas y minuscular
    const usuario = USUARIOS.find(
        u => u.email.toLowerCase() === email.toLowerCase()
    );
    // Si no existe el email devolvemos un 401
    if(!usuario){
        return res.status(401).json({
            status: 'error',
            code: 401,
            mensaje: 'Credenciales inválidas'
        })
    }

    // validación de contraseña 
    // En sistemas reales se compara hash vs hash no texto plano 
    if( usuario.password !== password ){
        return res.status(401).json({
            status :'error',
            code: 401,
            mensaje: 'Credenciales inválidas'
        })
    }

    // Payload del token: datos mínimos de identidad/autorización
    // Evitamos enviar información sensible
    const payload = {
        id : usuario.id,
        email : usuario.email,
        role : usuario.role
    }

    // Generamos el JWT firmado con la clave secreta 
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '2m' }
    )

    res.status(200).json({
        status:'success',
        code: 200,
        mensaje:'Login exitoso',
        data:{
            token,
            tokenType: 'Bearer',
            expiresIn: process.env.JWT_EXPIRES_IN || '15m',
            usuario:{
                id: usuario.id,
                email :usuario.email,
                role:usuario.role
            }
        }
    })
})

export default router;