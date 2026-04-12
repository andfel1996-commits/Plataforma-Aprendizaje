import { pool } from "./db/db.js";

console.clear();

const obtenerRopa = async() => {

    try {
        //   await client.connect();
          console.log("✅ Conexión establecida con PostgreSQL");
          // ejecutamnos la consulta
        //   const res = await client.query("SELECT * FROM ropa");
          const res = await pool.query("SELECT * FROM ropa");
          const result = res.rows
          return console.log(result);

    } catch (error) {

        console.error("❌ Error en la consulta:", error.message);

    }finally{
        await pool.end();
        console.log("🔌 Conexión cerrada.");
    }
}

process.on("uncaughtException", (error) => {
  console.error("🚨 Error NO manejado detectado:", error.message);
});


obtenerRopa()
