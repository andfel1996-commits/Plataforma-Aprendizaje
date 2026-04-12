const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();

// Registrar la carpeta de parciales
hbs.registerPartials(path.join(__dirname, '/views/partials'));

// Configurar el motor de vistas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

// Definir ruta principal
app.get('/', (req, res) => {
  res.render('index');
});

// Servir contenido estático (si tienes archivos CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
