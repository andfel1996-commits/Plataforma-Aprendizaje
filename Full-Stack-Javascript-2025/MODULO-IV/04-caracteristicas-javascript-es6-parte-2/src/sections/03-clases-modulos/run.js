/**
 * sections/03-clases-modulos/run.js
 * --------------------------------
 * Esta sección está separada en módulos reales para demostrar import/export.
 *
 * Verás:
 * - Clase Student (modelo)
 * - Clase Classroom (agregador)
 * - Un módulo de utilidades
 */

import { logTitle, logLine, logObject } from "../../utils/logger.js";
import { Student } from "./student.js";
import { Classroom } from "./classroom.js";
import { formatMoney } from "./utils.js";

export function run03_ClasesYModulos() {
  logTitle("3) Clases y Módulos (ES6+)");

  /**
   * (A) Creamos instancias de una clase (Student)
   */
  const s1 = new Student("Ana", "Rojas", [6.0, 5.5, 6.5]);
  const s2 = new Student("Luis", "Pérez", [4.0, 5.0, 4.5]);
  const s3 = new Student("Sofía", "Gómez", [6.8, 6.7, 7.0]);

  logLine(`s1.fullName(): ${s1.fullName()}`);
  logLine(`s1.average(): ${s1.average()}`);

  /**
   * (B) Agregamos estudiantes a un curso (Classroom)
   */
  const sala = new Classroom("ECMA6 - Clase II");
  sala.addStudent(s1);
  sala.addStudent(s2);
  sala.addStudent(s3);

  logObject("Resumen sala", sala.summary());

  /**
   * (C) Herencia + método override (extend)
   * Creamos una subclase con comportamiento extra.
   */
  class ScholarshipStudent extends Student {
    // Esta clase hereda TODO de Student, pero añadimos beca
    constructor(nombre, apellido, notas, porcentajeBeca = 0.2) {
      super(nombre, apellido, notas); // llama al constructor de Student
      this.porcentajeBeca = porcentajeBeca;
    }

    // Sobrescribimos (override) un método para agregar info extra
    info() {
      return `${super.info()} (Beca: ${Math.round(this.porcentajeBeca * 100)}%)`;
    }
  }

  const becado = new ScholarshipStudent("Martín", "Díaz", [5.5, 6.0, 6.2], 0.35);
  sala.addStudent(becado);

  logLine(becado.info());

  /**
   * (D) Private fields (#)
   * Student usa un campo privado para guardar un id interno.
   * No se puede acceder desde fuera: s1.#id -> ERROR
   */
  logLine(`Student internalId (acceso controlado): ${s1.internalId}`);

  /**
   * (E) Módulo utilitario (formatMoney)
   */
  const precioCurso = 19990;
  logLine(`Precio curso: ${formatMoney(precioCurso)}`);

  logLine("");
  logLine("Idea clave: clases organizan el dominio; módulos organizan el proyecto (arquitectura).");
}
