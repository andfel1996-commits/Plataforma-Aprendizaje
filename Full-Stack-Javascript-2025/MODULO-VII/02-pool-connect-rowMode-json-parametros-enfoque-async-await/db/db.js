   import pg from "pg"
   import dotenv from 'dotenv';
   const { Client, Pool } = pg;
   dotenv.config();

//    console.log('Salida de process.env-->', process.env)
   
   export const pool = new Pool({
        user  :process.env.DB_USER,
        host : process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port : process.env.DB_PORT,
        max:20,
        min:2,
        connectionTimeoutMillis: 2000,
        idleTimeoutMillis: 30000,
    });