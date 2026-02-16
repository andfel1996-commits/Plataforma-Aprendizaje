/**
 * 01-variables-funciones.js
 * ------------------------
 * Objetivo: mostrar mejoras ES6+ que hacen el código más claro y seguro:
 * - let / const (en vez de var)
 * - scope por bloque
 * - template literals
 * - arrow functions
 * - parámetros por defecto
 *
 * Contexto "vida real": tenemos una lista de alumnos y queremos:
 * - calcular promedios
 * - generar mensajes
 */

import { logTitle, logLine, logObject } from "../utils/logger.js";

export function run01_VariablesFunciones() {
  logTitle("1) Variables y Funciones (ES6+)");

  /**
   * (A) var vs let/const
   * - var: alcance (scope) de FUNCIÓN, puede causar errores por hoisting y redeclaraciones.
   * - let: alcance (scope) de BLOQUE, se puede reasignar.
   * - const: alcance de BLOQUE, NO se reasigna (pero objetos/arrays se pueden mutar).
   */

  // ✅ const: ideal cuando NO necesitamos reasignar la variable
  const curso = "JavaScript Moderno (ES6+)";
  logLine(`Curso: ${curso}`);

  // ✅ let: ideal cuando SÍ necesitamos reasignar
  let semana = 2;
  logLine(`Semana: ${semana}`);
  semana = 3; // reasignación OK
  logLine(`Semana (actualizada): ${semana}`);

  /**
   * (B) Scope por bloque
   * - let/const viven dentro del bloque { ... }
   */
  if (true) {
    const mensaje = "Estoy dentro del bloque if";
    logLine(mensaje);
  }
  // OJO: si descomentas esto, dará error porque "mensaje" no existe aquí:
  // logLine(mensaje);

  /**
   * (C) Template literals
   * - Permiten interpolar variables con ${}
   * - Permiten strings multilínea fácilmente
   */
  const nombreDocente = "Alejandro";
  const saludo = `Hola, soy ${nombreDocente}.
Hoy veremos ES6+ con ejemplos reales.`;
  logLine(saludo);

  /**
   * (D) Arrow functions
   * - Sintaxis más corta.
   * - No "re-bindea" this (tema útil en objetos/clases).
   */
  const sumar = (a, b) => a + b;
  logLine(`sumar(2, 3) = ${sumar(2, 3)}`);

  /**
   * (E) Parámetros por defecto
   * - Evitan if/else innecesarios para valores típicos.
   */
  const formatearAlumno = (nombre = "Sin nombre", apellido = "Sin apellido") => {
    return `${nombre} ${apellido}`.trim();
  };

  logLine(`Alumno: ${formatearAlumno("Camila", "Rojas")}`);
  logLine(`Alumno (default): ${formatearAlumno()}`);

  /**
   * (F) Ejemplo integrador: promedios
   */
  const alumnos = [
    { nombre: "Ana", notas: [6.0, 5.5, 6.5] },
    { nombre: "Luis", notas: [4.0, 5.0, 4.5] },
    { nombre: "Sofía", notas: [6.8, 6.7, 7.0] },
  ];

  // Arrow + map: transformamos cada alumno en un nuevo objeto con promedio
  const alumnosConPromedio = alumnos.map((a) => {
    const total = a.notas.reduce((acc, n) => acc + n, 0);
    const promedio = total / a.notas.length;

    // Retornamos un objeto NUEVO (inmutabilidad "suave")
    return { ...a, promedio: Number(promedio.toFixed(2)) };
  });

  logObject("Alumnos con promedio", alumnosConPromedio);

  // Generamos mensajes usando template literals
  alumnosConPromedio.forEach((a) => {
    const estado = a.promedio >= 5.0 ? "✅ Aprobado" : "❌ Reprobado";
    logLine(`- ${a.nombre} → Promedio: ${a.promedio} → ${estado}`);
  });

  logLine("");
  logLine("Idea clave: con ES6+ el código se vuelve más legible y seguro (menos errores).");
}
