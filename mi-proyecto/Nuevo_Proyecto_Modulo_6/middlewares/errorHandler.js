module.exports = (err, req, res, next) => {
  const status = err.status || 500;

  console.error(err);

  res.status(status).render('error', {
    status,
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    active: '' // Para evitar error en navbar
  });
};
