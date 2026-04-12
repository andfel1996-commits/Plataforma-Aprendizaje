require('dotenv').config();
const express = require('express');
const { connectDB } = require('./database');


const app = express();
app.use(express.json());

// Importar rutas (ejemplo)
const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api/protected', protectedRoutes);


const PORT = process.env.PORT || 3000;
const User = require('./models/User');

const startServer = async () => {
  await connectDB();

  // Sincronizar modelos (crea tablas si no existen)
  await User.sync({ alter: true }); // alter:true actualiza tablas sin perder datos

  app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
  });
};

startServer();
