/* ==========================================================
   EJERCICIO 02 (ALUMNO) — REGISTRO DE ASISTENCIA
   ========================================================== 
   
  Contexto: 🙌
  Vamos a crear una función que registre la asistencia de los estudiantes a una clase y calcule el porcentaje de asistencia. La función deberá recibir el nombre de la materia, el número total de clases y los estudiantes presentes.

  Consigna: ✍️
  Crear una función que registre la asistencia de estudiantes en una clase y determine el porcentaje de asistencia de la siguiente manera:
  Recibir el nombre de la materia.
  Recibir la cantidad total de clases.
  Recibir los nombres de los estudiantes presentes utilizando el operador rest ....

   */

// TODO: implementar según comentarios
function registrarAsistencia(materia, totalClases, ...asistentes) {
  // PASO 1) validar materia
  // PASO 2) validar totalClases (>0)
  // PASO 3) mostrar asistentes
  // PASO 4) porcentaje = (asistentes.length / totalClases) * 100
  // PASO 5) mostrar porcentaje con toFixed(2)
  // PASO 6) return porcentaje (número)
}

// Pruebas (descomenta)
// registrarAsistencia("JavaScript Avanzado", 10, "Sofía", "Ariel", "Luciano", "Anto");
// registrarAsistencia("Front-end", 5, "Cami", "Pedro");
// registrarAsistencia("", 10, "X");
// registrarAsistencia("UX", 0, "X");
