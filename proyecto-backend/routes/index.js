const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');

// --- Auth ---
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));

// --- Usuarios ---
router.get('/users', asyncHandler(userController.getUsers));

// --- Rutas Protegidas ---
router.post('/users/update/:id', authMiddleware, asyncHandler(userController.updateUser));
router.post('/users/delete/:id', authMiddleware, asyncHandler(userController.deleteUser));

// --- Subida de Archivos ---
router.post('/upload', authMiddleware, (req, res) => {
    upload.single('avatar')(req, res, async (err) => { // Agregamos async aquí
        console.log("--- DEBUG SUBIDA ---");
        
        if (err) {
            console.error("Error Multer:", err);
            return res.status(400).json({ ok: false, message: err.message });
        }
        
        if (!req.file) {
            return res.status(400).json({ ok: false, message: "No se recibió archivo" });
        }

        try {
            // Buscamos al usuario usando el ID que viene en el token (req.user.id)
            const user = await User.findByPk(req.user.id);
            
            if (user) {
                // Actualizamos el campo avatar con la ruta del archivo
                await user.update({ avatar: `/uploads/${req.file.filename}` });
                
                return res.json({ 
                    ok: true, 
                    message: "Imagen guardada en BD",
                    url: `/uploads/${req.file.filename}` 
                });
            } else {
                return res.status(404).json({ ok: false, message: "Usuario no encontrado" });
            }
        } catch (dbError) {
            console.error("Error al actualizar BD:", dbError);
            return res.status(500).json({ ok: false, message: "Error al guardar en base de datos" });
        }
    });
});
module.exports = router;