const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: `Hola ${req.user.username}, esta es tu información protegida.` });
});

module.exports = router;
