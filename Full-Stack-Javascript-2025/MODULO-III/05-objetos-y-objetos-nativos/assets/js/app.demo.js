/* ==========================================================
   APP.DEMO.JS — OBJETOS + OBJETOS NATIVOS (MATH / STRING) — AE3.5
   ----------------------------------------------------------
   DEMO ENTRETENIDA: “Mini Tienda: Perfil + Cupón + Ticket”
   ----------------------------------------------------------
   CONCEPTOS QUE INTEGRAMOS (Parte I + Parte II):
   ✅ OBJETOS: propiedades + métodos (funciones dentro de un objeto)
   ✅ ACCESO: notación de punto vs corchetes
   ✅ MUTACIÓN: modificar / agregar / eliminar propiedades (delete)
   ✅ MATH: random, floor, round, ceil (aleatorio y redondeos)
   ✅ STRING: trim, toLowerCase, replace, normalize (limpieza de texto)
   ✅ MATCH: extraer números desde un texto (por ejemplo: "$12.990")
   ✅ ARRAYS + FUNCIONES: catálogo de productos, selección aleatoria, etc.
   ========================================================== */
   const output = document.querySelector('#output');
   let usuarioActual = null;

   //funcion para mostrar info en el log
   function log(mensaje){
      const texto = String(mensaje) // texto seguro
      console.log(texto)
      if(output) output.textContent += texto + "\n"
   }

   // funcion para limpiar el log
   function limpiar(){
        if(output) output.textContent = ""
   }

   function leerNombre(){
      const inp = document.querySelector('#inp-nombre'); // capturamos el input del nombre
      return inp ? inp.value : "" //ternario
   }

   function leerApellido(){
      const inp = document.querySelector('#inp-apellido'); // capturamos el input del apellido
      return inp ? inp.value : "" //ternario
   }

   function leerPrecio(){
      const inp = document.querySelector('#inp-precioo'); // capturamos el input del precio
      return inp ? inp.value : "" //ternario
   }

   // DEMO 1
   function demo1_crearUsuario(){

      log("=== DEMO 1: Crear objeto usuario (Propiedades + Método) =========");
      
      const nombre = leerNombre();
      const apellido = leerApellido();

      usuarioActual = {
         nombre,
         apellido,
         "nombre completo" : nombre + " " + apellido,
         presentarse : function(){
            return "Hola soy " + this["nombre completo"];
         }
      }

      log('Objeto usuario creado');
      log(JSON.stringify( usuarioActual, null, 3 ));
      log("Usamos el método presentarse: " + usuarioActual.presentarse())
      log("")


   }

   // DEMO 2
   function demo2_puntoVsCorchetes(){
      log("=== DEMO 2: Notación de puntos versus la de corchete =========");
      // validar 
      if(!usuarioActual){
         log("Primero crea el usuario en (DEMO 1)")
         log("")
         return
      }

      log("usuarioActual.nombre (notación de punto) " + usuarioActual.nombre);
      log("usuarioActual['nombre completo'] (corchetes)" + usuarioActual['nombre completo']);

      // Clave dinámica
      const clave = "apellido";
      log("clave = " + clave)
      log("usuarioActual[clave] " + usuarioActual[clave]);
      log("")
   }

   // Demo 3
   function demo3_mutarPropiedades(){
      log("=== DEMO 3: Modificar / Agregar / eliminar propiedades Delete =========");

      if(!usuarioActual){
         log("Primero crea el usuario en (DEMO 1)")
         log("")
         return
      }
      // Modificamos el objeto y le quitamos los espacios
      usuarioActual.nombre = String(usuarioActual.nombre).trim();
      usuarioActual.apellido = String(usuarioActual.apellido).trim();

      // Agregar propiedades nuevas
      usuarioActual.rol = "Cliente";
      usuarioActual.creadoEn = new Date().toLocaleString();
      usuarioActual.temp = "Propiedad temporal se eliminará";
      log("Usuario después de modificar/agregar:")
      log( JSON.stringify( usuarioActual, null, 3 ));
   }

   function enteroAleatorio( min, max ){
      // Math.random() produce un decimal entre 0 y 1 (Sin incluir el 1 )
      // Se multiplica por el tamaño del rango ( max - min +1 )
      // Math.floor() baja al entero inferior
      // Sumamos min para mover el rango al inicio deseado 
      return Math.floor( Math.random() * (max - min + 1 )) + min
   }

   function demo4_mathAleatoriosYRedondeo(){
      log("=== DEMO 4: MATH - aleatorios + redondeos =========");
      const ejemplo = 5.7
      log("Numero ejemplo:" + ejemplo);
      // Sube al entero más cercano
      log("Math.round(5.7) = " +  Math.round(ejemplo));
      // baja al piso
      log("Math.floor(5.7) = " +  Math.floor(ejemplo));
      // Siempre hacia arriba
      log("Math.ceil(5.7) = " +  Math.ceil(ejemplo));
      // trunc corta decimalessin redondear
      log("Math.trunc(5.7) = " +  Math.trunc(ejemplo));

      const dado = enteroAleatorio(1,6);
      log("Dado (1 a 6) : " + dado);


   }



/* ==========================================================
   Conectar botones
   ========================================================== */
const btnLimpiar = document.querySelector("#btn-limpiar");
const btn1 = document.querySelector("#btn-demo-1");
const btn2 = document.querySelector("#btn-demo-2");
const btn3 = document.querySelector("#btn-demo-3");
const btn4 = document.querySelector("#btn-demo-4");
const btn5 = document.querySelector("#btn-demo-5");
const btn6 = document.querySelector("#btn-demo-6");
const btnFinal = document.querySelector("#btn-demo-final");

if (btnLimpiar) btnLimpiar.addEventListener("click", limpiar);
if (btn1) btn1.addEventListener("click", demo1_crearUsuario);
if (btn2) btn2.addEventListener("click", demo2_puntoVsCorchetes);
if (btn3) btn3.addEventListener("click", demo3_mutarPropiedades);
if (btn4) btn4.addEventListener("click", demo4_mathAleatoriosYRedondeo);
if (btn5) btn5.addEventListener("click", demo5_stringLimpieza);
if (btn6) btn6.addEventListener("click", demo6_matchExtraerNumero);
if (btnFinal) btnFinal.addEventListener("click", demoFinal_generarTicket);

log("👋 Listo. Presiona un botón del panel para comenzar.");




