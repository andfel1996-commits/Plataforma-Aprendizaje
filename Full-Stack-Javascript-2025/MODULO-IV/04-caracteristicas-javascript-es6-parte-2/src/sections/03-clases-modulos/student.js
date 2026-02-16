/**
 * student.js
 * ----------
 * Modela un estudiante con:
 * - nombre / apellido
 * - notas
 * - métodos de instancia (fullName, average, info)
 *
 * También demostramos un campo privado (#id)
 * - Esto es ES2022+, pero se considera parte de las mejoras modernas.
 */

export class Student {
  // Campo privado: solo accesible DENTRO de la clase
  #id;

  constructor(nombre, apellido, notas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.notas = notas;

    // Generamos un id interno (ejemplo didáctico)
    this.#id = Math.random().toString(16).slice(2);
  }

  // Getter público para exponer el id de manera controlada
  get internalId() {
    return this.#id;
  }

  fullName() {
    return `${this.nombre} ${this.apellido}`.trim();
  }

  average() {
    if (this.notas.length === 0) return 0;

    const total = this.notas.reduce((acc, n) => acc + n, 0);
    return Number((total / this.notas.length).toFixed(2));
  }

  isApproved(min = 5.0) {
    return this.average() >= min;
  }

  info() {
    const estado = this.isApproved() ? "✅ Aprobado" : "❌ Reprobado";
    return `${this.fullName()} → Promedio: ${this.average()} → ${estado}`;
  }
}
