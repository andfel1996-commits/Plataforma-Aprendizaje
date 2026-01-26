/* ==========================================================
   EJERCICIO 2 — SIMULADOR DE TEMPERATURA (SOLUCIÓN)
   ========================================================== */

console.log("\n=== EJERCICIO 2 (SOLUCIÓN): Simulador de temperatura ===\n");

// 1) Función anónima guardada en una constante
const obtenerTemperatura = function () {
  // Math.random() devuelve un número decimal entre 0 y 1
  // Ej: 0.1234

  // Multiplicamos por 41 para obtener algo entre 0 y 40.999...
  const decimal = Math.random() * 41;

  // Math.floor() quita decimales y redondea hacia abajo
  // Ej: 12.9 => 12
  const entero = Math.floor(decimal);

  // Devolvemos el número entero (0 a 40)
  return entero;
};

// 2) Función flecha para clasificar
const clasificarClima = () => {
  // Pedimos una temperatura
  const temperatura = obtenerTemperatura();

  // Variable para el mensaje
  let mensaje = "";

  // Clasificamos con if / else if / else
  if (temperatura >= 0 && temperatura <= 15) {
    mensaje = "Hace frío";
  } else if (temperatura >= 16 && temperatura <= 25) {
    mensaje = "Está templado";
  } else {
    mensaje = "Hace calor";
  }

  // Mostramos el resultado
  console.log("Temperatura:", temperatura + "°C -", mensaje);
};

// 3) Probamos 3 veces
clasificarClima();
clasificarClima();
clasificarClima();

console.log("\n=== FIN EJERCICIO 2 (SOLUCIÓN) ===\n");
