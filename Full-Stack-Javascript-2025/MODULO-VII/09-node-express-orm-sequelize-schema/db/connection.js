import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const db = new Sequelize(

    process.env.PGDATABASELOCAL || process.env.PGDATBASE,
    process.env.PGUSERLOCAL     || process.env.PGUSER,
    process.env.PGPASSWORDLOCAL || process.env.PGPASSWORD,

    {
        host    : process.env.PGHOSTLOCAL || process.env.PGHOST,
        port    : process.env.PGPORTLOCAL  || process.env.PGPORT,
        dialect : 'postgres',
        // Muestra las consultas SQL en desarrollo; las silencia en prodfucción
        logging : process.env.NODE_ENV === 'production' ? false : console.log,
    
        // Pool de conexiones para mejor rendimiento bajo carga concurrente
        pool:{
            max : 5,  // conexiones simultaneas máximas
            min : 0, // Conexiones minimas en reposo
            acquire: 30000, // ms máximo para obtener una conexión antes de lanzar un error
            idle : 10000 // ms antes de liberar una conexión inactiva
        }

    }

)

export default db;