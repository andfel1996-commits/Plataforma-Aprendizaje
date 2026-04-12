/**
 * 02-session/index.js  (ES Modules)
 * ------------------------------------------------------------
 * OBJETIVO
 * - Aprender autenticación con sesiones usando express-session.
 * - Este ejemplo es INTENCIONALMENTE SIMPLE y MUY comentado.
 *
 * Importante:
 * - Aquí NO usamos base de datos real.
 * - Los usuarios están “mockeados” en un array.
 * - En un proyecto real:
 *    - contraseñas → bcrypt
 *    - sesiones → store (Redis, DB) en producción
 *
 * Cómo ejecutar:
 *   node index.js
 * Luego abre:
 *   http://localhost:3000/login
 * ------------------------------------------------------------
 */

import express from "express";
import session from "express-session";
const app = express();

// 1) Crear los Middleware
// Para leer formularios
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Configurar sesiones
/**
 * ¿Por qué necesitamos sesiones?
 * - HTTP es "stateless" ( Sin estado ): cada request es independiente.
 * - Si el usuario se loguea en /login,
 *   el servidor debe recordar ese estado para las siguientes rutas.
 *
 * ¿Qué hace express-session?
 * - Crea un objeto req.session para guardar datos del usuario.
 * - Asigna un ID de sesión.
 * - Envía una cookie al navegador (por defecto: connect.sid).
 *
 * Esa cookie NO guarda el usuario.
 * Guarda un ID.
 * Con ese ID, el servidor encuentra la sesión.
 */

app.use(session({
    secret:"mi-secreto-seguro",
    resave: false, // No guarda la sesion si no cambio
    saveUninitialized:false, // false -> no crea sesión vacia sin datos
    cookie:{maxAge: 1000 * 60 * 60 } // 1 hora 
}))

// BASE DE DATOS
const usuarios = [
    {usuario:"admin", password:"1234", rol: "admin"},
    {usuario:"maria", password:"1234", rol: "user"}
]

// DEFINIMOS UN MIDDLEWARE QUE PROTEGE RUTAS 
const requireAuth = (req,res, next) => {
    // El estado lo definimos nosotros cuando el login es existoso
    if( !req.session.estado ) return res.redirect("/login")
    next()
}

// CREAMOS NUESTRAS RUTAS PUBLICAS

app.get("/",(req,res)=>{
    res.send(`<h1>Home (público)</h1>
    <p><strong>Sesión ID:</strong> ${req.sessionID}</p>
    <p><strong>Logueado:</strong> ${req.session.estado ? "Sí" : "No"}</p>
    <p><strong>Usuario:</strong> ${req.session.usuario || "-"}</p>
    <hr />
    <ul>
      <li><a href="/login">/login</a></li>
      <li><a href="/privado">/privado</a> (requiere login)</li>
      <li><a href="/logout">/logout</a></li>
    </ul>`)
})

app.get('/login', (req,res)=>{
    if(req.session.estado) return res.redirect('/privado');
    res.send(`    <h1>Login</h1>
    <p>Usuarios de prueba: <strong>admin/1234</strong> o <strong>maria/1234</strong></p>

    <form method="POST" action="/login">
      <label>Usuario</label><br />
      <input name="usuario" placeholder="admin" /><br /><br />

      <label>Password</label><br />
      <input type="password" name="password" placeholder="1234" /><br /><br />

      <button>Ingresar</button>
    </form>

    <p><a href="/">Volver al Home</a></p>`)
})

app.post("/login",(req,res)=>{
    const { usuario, password } = req.body;
    if(!usuario || !password){
        return res.status(400).send(`<h1>Error</h1>
      <p>Usuario y password son requeridos.</p>
      <p><a href="/login">Volver</a></p>`)
    }

    // Buscar usuarios
    const encontrado = usuarios.find((u) => u.usuario === usuario && u.password === password)

    if(!encontrado){
        res.status(401).send(`<h1>Login inválido</h1>
      <p>Usuario o contraseña incorrectos.</p>
      <p><a href="/login">Intentar nuevamente</a></p>`)
    }

    req.session.estado = true;
    req.session.usuario = encontrado.usuario;
    req.session.rol = encontrado.rol
    // req.session.estado seguirá siendo true hasta que expire 
    res.redirect('/privado')
})

// Creamos ahora una RUTA Privada
app.get('/privado', requireAuth , (req,res)=>{
    // Si llegamos hasta aquí significa que requireAuth dejo pasar
    res.send(`
    <h1>Zona Privada ✅</h1>
    <p>Si estás viendo esto, es porque <strong>requireAuth</strong> validó tu sesión.</p>

    <h3>Datos en sesión:</h3>
    <ul>
      <li><strong>Sesión ID:</strong> ${req.sessionID}</li>
      <li><strong>estado:</strong> ${req.session.estado}</li>
      <li><strong>usuario:</strong> ${req.session.usuario}</li>
      <li><strong>rol:</strong> ${req.session.rol}</li>
    </ul>

    <p><a href="/">Ir al Home</a></p>
    <p><a href="/logout">Cerrar sesión (logout)</a></p>
  `);
})

app.get('/logout', ( req, res )=>{
    req.session.destroy(()=>{
        res.send(`<h1>Sesión cerrada</h1>
      <p>Tu sesión fue destruida en el servidor.</p>
      <p><a href="/login">Ir a login</a></p>
      <p><a href="/">Ir a home</a></p>`)
    })
})

app.listen(3000,()=>{
    console.log("✅ Servidor arriba en http://localhost:3000");
    console.log("➡️  Prueba: /login y luego /privado");
})