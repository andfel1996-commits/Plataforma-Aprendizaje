const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.PG_DATABASE,
  process.env.PG_USER,
  process.env.PG_PASSWORD,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
    logging: false, // Opcional: desactiva logs SQL en consola
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a PostgreSQL exitosa');
  } catch (error) {
    console.error('No se pudo conectar a PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
