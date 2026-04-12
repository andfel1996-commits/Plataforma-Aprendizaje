import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host:"localhost",
  password:"postgres",
  database: "clientes",
  port: 5432  
})

pool.connect( async ( error, client, release )=>{
    // Iniciar la transacción
    await client.query('BEGIN');

    try{
        const descontar = "UPDATE usuarios SET saldo = saldo - 200000 WHERE email='joselyn.riquelme@gmail.com'";
        await client.query(descontar);

        const acreditar = "UPDATE usuarios SET saldo = saldo + 200000 WHERE email='lpaprocki@hotmail.com'";
        await client.query(acreditar);
        await client.query('COMMIT');
        
    }catch(e){
        await client.query('ROLLBACK');
        console.log('Error decodigo-->', e.code);
        console.log('Detalle del error-->', e.detail);
        console.log('Tabla originaria del error-->', e.table);
        console.log('restricción violada de campo-->', e.constraint)
    }
    release()
    pool.end();
})