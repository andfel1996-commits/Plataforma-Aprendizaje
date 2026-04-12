const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Configurar motor de vistas EJS
app.set('view engine', 'ejs');

// Middleware para archivos estáticos (CSS, JS)
app.use(express.static('public'));

// Middleware para parsear datos de formularios
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware para simular sesión simple (solo para ejemplo)
let loggedUser = null;

// Middleware para pasar variables a las vistas
app.use((req, res, next) => {
  res.locals.loggedUser = loggedUser;
  next();
});

// Rutas

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/galeria', (req, res) => {
  res.render('galeria');
});

app.get('/lenguajes', (req, res) => {
  res.render('lenguajes');
});

app.get('/colores', (req, res) => {
  res.render('colores');
});

app.get('/contacto', (req, res) => {
  res.render('contacto', { message: null });
});

// Ruta para login (simulado)
app.post('/login', (req, res) => {
  const { usuario, password } = req.body;
  // Validación simple (en producción usar base de datos y hash)
  if (usuario === 'admin' && password === '1234') {
    loggedUser = usuario;
    res.redirect('/');
  } else {
    res.render('contacto', { message: 'Usuario o contraseña incorrectos' });
  }
});

// Ruta para logout
app.get('/logout', (req, res) => {
  loggedUser = null;
  res.redirect('/');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
