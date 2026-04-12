import express from "express";
import { create } from 'express-handlebars';
import * as helpers from './lib/helpers.js';
import { usuarios } from './lib/usuarios.js'
import * as path from "path";
import { fileURLToPath } from 'url';
import { Jimp } from 'jimp';
import session from 'express-session';
import fs from 'fs';


// Creamos la constante app para asignarle express();
const app = express()

// Vamos a crear la variable __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));
console.log('Salida de __dirname', __dirname )

// Middelware
app.use( express.json() );
app.use(express.urlencoded({ extended: true }));
app.use( express.static('public') );

app.use(session({
	secret            : 'mi-secreto-seguro',
    resave            : false,
    saveUninitialized : false,
    cookie            : { maxAge: 1000 * 60 * 60 } // 1 hora
}))

// =============================================================
// 🌐 MIDDLEWARE GLOBAL DE VISTAS (inyectar sesión en Handlebars)
// =============================================================
// res.locals es un objeto que Handlebars lee automáticamente en TODAS las vistas.
// Gracias a esto, {{estado}} y {{usuario}} están disponibles en cualquier plantilla
// sin necesidad de pasarlos manualmente en cada res.render().
//
// Flujo: req.session → res.locals → Handlebars (nav, layouts, etc.)
app.use((req, res, next )=>{
	res.locals.estado = req.session.estado || null   // true si estamos logeados
	res.locals.usuario = req.session.usuario || null // Nombre del usuario
	next();
})


app.use('/boostrap', express.static(__dirname+'/node_modules/bootstrap/dist/css') );
app.use('/boostrapjs', express.static(__dirname+'/node_modules/bootstrap/dist/js') );
app.use('/jquery', express.static(__dirname+'/node_modules/jquery/dist'));
app.use('/axios', express.static(__dirname+'/node_modules/axios/dist') );

// =============================================================
// 🔐 CONFIGURACIÓN DE SESIÓN (express-session)
// =============================================================

// La sesión permite recordar al usuario entre distintas peticiones HTTP.
// HTTP es un protocolo sin estado (stateless), por eso necesitamos sesiones.
//
// ¿Cómo funciona?
// 1. El servidor crea un ID de sesión único (cookie: connect.sid)
// 2. Ese ID se guarda en el navegador del usuario
// 3. En cada petición, el navegador envía ese ID al servidor
// 4. El servidor busca los datos asociados a ese ID (req.session)
//
// Opciones:
//   secret          → Clave para firmar la cookie (evita manipulación)
//   resave          → false = no guarda la sesión si no hubo cambios
//   saveUninitialized → false = no crea sesión si no hay datos
//   cookie.maxAge   → Tiempo de vida de la sesión (1 hora en ms)





// =============================================================
// 🌐 MIDDLEWARE DE AUTENTIFICACION
// =============================================================
const requireAuth = (req,res, next) => {
    // El estado lo definimos nosotros cuando el login es existoso
    if( !req.session.estado ) return res.redirect("/login")
    next()
}


// Configuramos Handlebars
const hbs = create({
    // Integración de helpers
    helpers,
    // Configuramos varios directorios o parciales
    partialsDir:[
        "views/partials/"
    ]
});

// Configurar el motor de plantilla, para esto debemos usar el método “engine”,
// el cual define el motor de plantillas que utilizaremos en nuestro servidor con Express.
app.engine("handlebars", hbs.engine);

// Se especifica al motor que reconozca la extensión handlebars
app.set("view engine", "handlebars");




// =============================================================
// 🌐 RUTAS PUBLICAS ( Accesibles sin login )
// ============================================================
app.get('/', (req , res) => {
    
    res.render("home",{
        layout:'main',
        title :"Home",
        dataCard:[
			{
				title:"Este es el titulo uno",
				description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry",
				url:"img/300x200.png"
			},
			{
				title:"Este es el titulo dos",
				description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry",
				url:"img/300x200.png"
			},
			{
				title:"Este es el titulo tres",
				description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry",
				url:"img/300x200.png"
			}
	]
    })
})


app.get('/galeria', (req,res)=>{
	res.render("galeria",{
		title:"Galería",
		message:"Hello world desde un helper"
	})
})

app.get('/contacto', (req,res)=>{
	res.render("galeria",{
		title:"Contacto",
		message:"Hello world desde un helper",
		helpers:{
			contacto (msg){
				return ("Hola el helper a sido anulado")
			}
		}
	})
})

app.get("/lenguajes",(req, res)=>{
	res.render('lenguajes', {
		layout : "main",
		title: "Lenguajes de programación más usados",
		message: "Hola mundo desde un Helper con función propia",
		lenguajesFronend:['HTML', 'CSS', 'JAVASCRIPT']
	})
})

app.get('/colores',( req, res )=>{
	res.render("colores",{
		layout : "main",
		colores:[
			"primary",
			"secondary",
			"success",
			"danger",
			"warning",
			"info",
			"light",
			"dark"
		],
		color:"danger",
		title:"Colores"
	})
})

app.get('/colores/:color', (req,res)=>{
	const color = req.params.color
	console.log("Salida de color",color)
	res.render('colores',{
		layout : "main",
			colores:[
			"primary",
			"secondary",
			"success",
			"danger",
			"warning",
			"info",
			"light",
			"dark"
		],
		color:color,
		title:"Colores"
	})
})


// =============================================================
// 🌐 RUTAS DE AUTENTICACION
// ============================================================
app.get("/login", ( req, res )=>{
	if(req.session.estado) return res.redirect('/')
	res.render("login",{
		layout:"main",
		title:"Login"
	})
})

// POST
app.post("/login", (req, res)=>{
	const { usuario,password } = req.body;
	// Validación de campos vacios
	if(!usuario || !password){
		return res.render('login',{
			layout:"main",
			title:"Login",
			error : "usuario y contraseña son requeridos"
		})
	}

	// Buscar el usuario y la contraseña de usuarios.js
	const usuarioEncontrado = usuarios.find( (u) => u.usuario === usuario && u.password === password);
	console.log("Login intento-->", {usuario,existoso:!!usuarioEncontrado})

	if(!usuarioEncontrado){
		return res.render("login",{
			layout:"main",
			title:"Login",
			error : "usuario y contraseña incorrectos"
		})
	}

	// LOGIN existoso -> Guardar los datos de sesión
	// req.session persiste entre peticiones gracias a express-session
	req.session.estado = true;
	req.session.usuario = usuarioEncontrado.usuario;
	req.session.mensaje = usuarioEncontrado.mensaje

	// Redirigir  a Home tras login existoso
	res.redirect('/')
})

// GET Logout

app.get('/logout', ( req, res )=>{
	req.session.destroy(()=>{
		res.redirect('/login')
	})
})


// =============================================================
// 🌐 RUTAS PRIVADAS
// ============================================================
app.get("/tienda", requireAuth, (req, res)=>{
	res.render("productos",{
		title:"Tienda de Verduras y buena salud",
		productos : ["banana", "cebollas", "lechuga", "papas", "pimenton", "tomate"]
	})
})

app.get('/imagen',requireAuth, (req, res)=>{
	res.render('imagen', {
		layout: 'main',
		title: 'Subir imágen'
	})
})

app.post('/upload', requireAuth, async ( req, res )=>{
	try {
		const {url, name } = req.body;

		if(!url || !name){
			return res.status(400).send({
				status:400,
				message : "Url y name son requeridos"
			})
		}

		// función auxiliar : convierte un Buffer string base64
		const encode = (data) => Buffer.from(data).toString('base64');

		const imagen = await Jimp.read(url)
		// Encadenamos transformaciones de la imagen
		await imagen
			.resize({w:600}) // redimensionamos
			.greyscale() // convertir a escala de grises
			.write(name) // Guardamos con el nombre indicado

		// Leer el archivo guardado y enviarlo como base64 al cliente
		fs.readFile(name, ( err, Imagen)=>{
			if(err) return res.status(500).send({error:err.message})
			res.send(`
					<img class="img-fluid" src='data:image/jpg;base64,${encode(Imagen)}'/>
					<p>La Imegen <strong>${name}</strong> se ha subido correctamente ✅</p>
			`);
		})
	} catch (error) {
		console.error('Error en JIMP:', error.message);
		res.status(500).send({status:500, error:error.message})
	}
})


// =============================================================
// 🌐 MANEJO DE ERROR 404
// ============================================================

app.use((req, res)=>{
	res.status(404);
	res.render("404",{
		title:"Error 404",
		message:"Lo sentimos esta URL no existe"
	})
})


// Debemos hacer el el serve sea escuchado por un puerto
app.listen( 3000, () => `Server arriba funcionando en el puerto 3000`)