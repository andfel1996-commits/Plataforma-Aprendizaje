const express = require('express');
const router = express.Router();
const asyncHandler = require('../middlewares/asyncHandler');
const User = require('../models/User');

router.get('/', (req, res) => {
  res.render('index', { title: 'Inicio', active: 'home' });
});

router.get('/users', asyncHandler(async (req, res) => {
  const users = await User.findAll({ order: [['createdAt', 'DESC']] });
  res.render('users', { users, active: 'users' });
}));

router.get('/users/new', (req, res) => {
  res.render('newUser', { errors: [], oldData: {}, active: 'newUser' });
});

router.post('/users', asyncHandler(async (req, res) => {
  const name = (req.body.name || '').trim();
  const email = (req.body.email || '').trim().toLowerCase();

  const errors = [];
  if (!name) errors.push({ msg: 'El nombre es obligatorio' });
  if (name && name.length < 3) errors.push({ msg: 'El nombre debe tener al menos 3 caracteres' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) errors.push({ msg: 'El correo electrónico es obligatorio' });
  if (email && !emailRegex.test(email)) errors.push({ msg: 'Debe ser un correo electrónico válido' });

  if (errors.length) {
    return res.status(400).render('newUser', { errors, oldData: { name, email }, active: 'newUser' });
  }

  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return res.status(400).render('newUser', {
      errors: [{ msg: 'El correo electrónico ya está registrado' }],
      oldData: { name, email },
      active: 'newUser'
    });
  }

  await User.create({ name, email });
  res.redirect('/users');
}));

module.exports = router;
