/**
 * ============================================================
 *  USO DE CURSORES EN POSTGRESQL CON pg-cursor
 * ============================================================
 *
 *  ¿Qué es un cursor?
 *  -------------------
 *  Un cursor es un mecanismo de BD que permite recorrer el resultado
 *  de una consulta FILA A FILA (o en lotes), en lugar de cargar
 *  todos los registros en memoria de una sola vez.
 *
 *  ¿Cuándo usarlo?
 *  ----------------
 *  - Tablas con millones de filas (evita OutOfMemory).
 *  - Exportaciones / procesos ETL masivos.
 *  - Cuando necesitas controlar el ritmo de consumo (backpressure).
 *
 *  Flujo de uso:
 *  -------------
 *  1. client = await pool.connect()   →  cliente dedicado (no se
 *     devuelve al pool automáticamente, la conexión debe estar
 *     activa todo el tiempo que dure la lectura).
 *  2. cursor = client.query( new Cursor(sql) )  →  abre el cursor.
 *  3. cursor.read(N, cb)  →  pide N filas al servidor.
 *  4. rows.length === 0   →  no hay más datos; cerrar y liberar.
 * ============================================================
 */

import pg from 'pg';
import Cursor from 'pg-cursor';
const { Pool } = pg;

console.clear();

// ── Pool de conexiones ────────────────────────────────────────────────────────
// Pool reutiliza conexiones entre peticiones.
// Para cursores usamos pool.connect() en lugar de pool.query() porque
// necesitamos mantener la misma conexión abierta durante toda la lectura.
const pool = new Pool({
    user:     "postgres",
    host:     "localhost",
    password: "postgres",
    database: "clientes",
    port:     5432
});

// ── Modo de error para demostración ──────────────────────────────────────────
// Cambia el valor para probar cada caso:
//   null        → flujo normal, sin errores forzados
//   'catch'     → fuerza el error del bloque catch (antes de leer filas)
//   'callback'  → fuerza el error dentro del callback de cursor.read()
const FORZAR_ERROR = "callback";



// ── Función principal ─────────────────────────────────────────────────────────
const useCursor = async () => {

    // PASO 1 — Cliente dedicado
    // pool.connect() reserva UNA conexión exclusiva para este proceso.
    // Debemos llamar client.release() al terminar para devolvérsela al pool.
    const client = await pool.connect();

    // Consulta a ejecutar vía cursor.
    // Cuando FORZAR_ERROR === 'callback', se usa SQL con sintaxis inválida
    // para que PostgreSQL devuelva un error dentro del callback de .read().
    const query = FORZAR_ERROR === 'callback'
        ? 'SELECCT * FROM usuarios'   // ← SQL inválido → dispara err en callback
        : 'SELECT * FROM usuarios';

    try {
        // ── Error forzado tipo CATCH ──────────────────────────────────────────
        // Este throw simula un fallo antes de abrir el cursor:
        // por ejemplo, parámetros inválidos, lógica previa que lanza excepción,
        // o un error síncrono al preparar la consulta.
        if (FORZAR_ERROR === 'catch') {
            throw new Error('[CATCH FORZADO] Simulación de error antes de abrir el cursor');
        }

        // PASO 2 — Crear el cursor
        // client.query(new Cursor(...)) abre el cursor en PostgreSQL.
        // El cursor NO ejecuta la consulta completa de golpe; queda listo
        // para entregar filas de a poco cada vez que se llame .read().
        const cursor = client.query( new Cursor(query) );

        // PASO 3 — Leer fila a fila con una función recursiva
        // cursor.read(N, callback) solicita al servidor exactamente N filas.
        // Cambiar 1 por 100, 500, etc. para leer en lotes y reducir round-trips.
        function read() {
            cursor.read( 1, (err, rows) => {

                // ── Error forzado tipo CALLBACK ───────────────────────────────
                // Este bloque captura errores ASÍNCRONOS que devuelve PostgreSQL
                // durante la lectura: SQL inválido, tabla inexistente, permisos,
                // o cualquier fallo que ocurre mientras el cursor ya está abierto.
                // A diferencia del catch, aquí el try/catch NO puede interceptarlo
                // porque el error llega de forma asíncrona al callback.
                if (err) {
                    console.error('╔══ ERROR EN CALLBACK (cursor.read) ══╗');
                    console.error('║ Ocurrió DESPUÉS de abrir el cursor. ║');
                    console.error('║ El try/catch NO lo puede capturar.  ║');
                    console.error('╚═════════════════════════════════════╝');
                    console.error('Detalle:', err.message);
                    cursor.close(() => client.release());
                    return;
                }

                // PASO 4 — Fin de datos
                // rows.length === 0 significa que PostgreSQL ya no tiene
                // más filas para este cursor → cerrar y liberar.
                if (rows.length === 0) {
                    console.log('✔ Lectura completa. No hay más filas.');
                    cursor.close(() => client.release());
                    return;
                }

                // Procesar las filas recibidas
                // (aquí podría ir lógica de transformación, insert, etc.)
                console.log('Fila recibida:', rows);

                // Llamada recursiva para pedir la siguiente fila.
                // La recursión se detiene cuando rows.length === 0.
                read();
            });
        }

        read(); // Arrancar la lectura

    } catch (error) {
        // ── Error tipo CATCH ─────────────────────────────────────────────────
        // Captura errores SÍNCRONOS que ocurren ANTES o DURANTE la apertura
        // del cursor: pool.connect() falla, throw manual, o cualquier excepción
        // lanzada dentro del bloque try de forma síncrona.
        // NO captura errores asíncronos del callback de cursor.read().
        console.error('╔══ ERROR EN CATCH (bloque try/catch) ══╗');
        console.error('║ Ocurrió ANTES de leer filas.          ║');
        console.error('║ Es síncrono o de conexión/preparación.║');
        console.error('╚═══════════════════════════════════════╝');
        console.error('Detalle:', error.message);
        client.release(); // Liberar siempre para evitar fugas de conexión
    }
};

useCursor();


// ============================================================
//  VERSIÓN ALTERNATIVA — async/await con promisify
//  Más legible; elimina el callback recursivo.
// ============================================================
/*
import { promisify } from 'util';

const useCursorAsync = async () => {
    const client = await pool.connect();

    try {
        const cursor    = client.query( new Cursor('SELECT * FROM usuarios') );
        const readAsync = promisify(cursor.read.bind(cursor));

        while (true) {
            const rows = await readAsync(1);   // leer 1 fila (o más)

            if (rows.length === 0) {
                console.log('✔ Lectura completa.');
                break;
            }

            console.log('Fila recibida:', rows);
        }

        await new Promise(resolve => cursor.close(resolve));
    } finally {
        client.release();   // se ejecuta siempre, incluso si hay error
    }
};

useCursorAsync();
*/

    