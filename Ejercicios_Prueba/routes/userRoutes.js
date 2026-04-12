const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Ruta GET para obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] } // No enviar contraseña
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
});

module.exports = router;
