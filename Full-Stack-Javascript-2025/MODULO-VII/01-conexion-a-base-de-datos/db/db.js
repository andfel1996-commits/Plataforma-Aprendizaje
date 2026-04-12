   import pg from "pg"
   import dotenv from 'dotenv';
   const { Client, Pool } = pg;
   dotenv.config();
   
   export const pool = new Pool({
    
        // user  :process.env.DB_USER,
        // host : process.env.DB_HOST,
        // database: process.env.DB_DATABASE,
        // password: process.env.DB_PASSWORD,
        // port : process.env.DB_PORT

        // Conexión a travéz de string de conexión 
        connectionString:process.env.CONNECTION_STRING
    });

   // export const client = new Client({
   //      user  :process.env.DB_USER,
   //      host : process.env.DB_HOST,
   //      database: process.env.DB_DATABASE,
   //      password: process.env.DB_PASSWORD,
   //      port : process.env.DB_PORT
   //  });