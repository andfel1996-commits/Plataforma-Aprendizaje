/**
 * classroom.js
 * ------------
 * Clase que administra una sala/curso.
 * - Agrega estudiantes
 * - Obtiene resumen
 *
 * Nota: en una app real, esto podría ser un "servicio" o parte del dominio.
 */

export class Classroom {
  constructor(nombreCurso) {
    this.nombreCurso = nombreCurso;
    this.students = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  // Ejemplo de método que retorna un objeto resumen (para UI/Reportes)
  summary() {
    const total = this.students.length;

    const aprobados = this.students.filter((s) => s.isApproved()).length;
    const reprobados = total - aprobados;

    // Promedio general del curso
    const averageCourse =
      total === 0
        ? 0
        : Number(
            (
              this.students.reduce((acc, s) => acc + s.average(), 0) / total
            ).toFixed(2)
          );

    return {
      curso: this.nombreCurso,
      total,
      aprobados,
      reprobados,
      promedioCurso: averageCourse,
    };
  }
}
