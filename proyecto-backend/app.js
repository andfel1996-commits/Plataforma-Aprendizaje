require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const indexRoutes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

// Middleware para rutas no encontradas (404)
app.use((req, res, next) => {
  const err = new Error('Ruta no encontrada');
  err.status = 404;
  next(err);
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conectado a PostgreSQL y base de datos sincronizada');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error conectando a la base de datos:', err);
    process.exit(1);
  }
})();
