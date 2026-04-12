const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración del motor de vistas EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Ruta principal que muestra una vista dinámica
app.get('/', (req, res) => {
  res.render('index', { title: 'Inicio' });
});

// Importar rutas de usuarios
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
