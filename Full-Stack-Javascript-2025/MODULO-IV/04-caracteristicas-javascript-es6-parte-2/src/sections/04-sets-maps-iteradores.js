/**
 * 04-sets-maps-iteradores.js
 * -------------------------
 * Objetivo: estructuras avanzadas y el concepto de iteración:
 * - Set (valores únicos)
 * - Map (pares clave/valor, claves de cualquier tipo)
 * - Iteradores + for...of
 * - Generators (funciones que producen valores "paso a paso")
 *
 * Contexto: necesitamos evitar duplicados y asociar info por clave.
 */

import { logTitle, logLine, logObject } from "../utils/logger.js";

export function run04_SetsMapsIteradores() {
  logTitle("4) Sets, Maps e Iteradores");

  /**
   * (A) Set → colección de valores ÚNICOS
   */
  const emails = new Set();

  // Agregamos correos (duplicados se ignoran)
  emails.add("ana@mail.com");
  emails.add("luis@mail.com");
  emails.add("ana@mail.com"); // duplicado

  logLine(`Set size (debe ser 2): ${emails.size}`);
  logLine(`¿Existe luis@mail.com? ${emails.has("luis@mail.com")}`);

  // Convertimos a array (útil para UI o para map/filter)
  const emailsArray = [...emails];
  logObject("Emails (como array)", emailsArray);

  /**
   * (B) Map → clave/valor
   * - A diferencia de objetos, la clave puede ser:
   *   string, number, objeto, función, etc.
   */
  const notasPorAlumno = new Map();

  // Claves tipo string
  notasPorAlumno.set("Ana", [6.0, 5.5, 6.5]);
  notasPorAlumno.set("Luis", [4.0, 5.0, 4.5]);

  // Clave tipo objeto (ejemplo)
  const keyObj = { tipo: "meta", version: 2 };
  notasPorAlumno.set(keyObj, { creadoPor: "docente", fecha: "hoy" });

  logLine(`Map size: ${notasPorAlumno.size}`);
  logObject("Luis notas", notasPorAlumno.get("Luis"));

  /**
   * (C) Iteración con for...of
   * - for...of funciona en iterables: arrays, sets, maps, strings...
   */
  logLine("Iterando Set (emails):");
  for (const email of emails) {
    logLine(`- ${email}`);
  }

  logLine("Iterando Map (notasPorAlumno):");
  for (const [clave, valor] of notasPorAlumno) {
    logLine(`- clave: ${JSON.stringify(clave)} → valor: ${JSON.stringify(valor)}`);
  }

  /**
   * (D) Generators (iteradores personalizados)
   * - Un generator es una función que puede "pausar" y "continuar"
   * - Útil para flujos, paginación, streams, etc.
   */
  function* idGenerator(prefix = "ID") {
    let i = 1;
    while (true) {
      // yield "devuelve" un valor y pausa
      yield `${prefix}-${i}`;
      i++;
    }
  }

  const gen = idGenerator("ALUMNO");

  logLine("Generando 3 ids con generator:");
  logLine(gen.next().value);
  logLine(gen.next().value);
  logLine(gen.next().value);

  logLine("");
  logLine("Idea clave: Set/Map + iteración son herramientas muy potentes para datos reales.");
}
