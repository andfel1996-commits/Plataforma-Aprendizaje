const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// routes/userRoutes.js
router.post('/', userController.createUserWithHistory); // Para crear datos iniciales
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;