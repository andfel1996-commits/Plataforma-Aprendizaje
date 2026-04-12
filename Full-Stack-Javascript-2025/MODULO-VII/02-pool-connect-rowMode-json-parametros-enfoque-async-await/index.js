import { pool } from "./db/db.js";

const SQLQuery = {
    rowMode : "array",
    text    : "insert into usuarios (first_name, last_name, email, saldo) values ($1, $2, $3, $4) RETURNING *;",
    values : ['Joselyn', 'Riquelme', 'joselyn.riquelme@gmail.com', 200000]
}

const insertUserQuery = async () => {
    let client
    try {
        client = await pool.connect();
        const result = await client.query(SQLQuery);
        console.log(result.rows);
    } catch (error) {
        console.error("Error durante la conexión o la consulta", error.stack)
    }finally{
        if(client){
            client.release()
        }
    }
}

insertUserQuery()