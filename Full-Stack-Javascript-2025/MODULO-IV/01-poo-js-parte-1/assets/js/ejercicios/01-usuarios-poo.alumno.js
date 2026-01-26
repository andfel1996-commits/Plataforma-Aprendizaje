/* EJERCICIO 01 (ALUMNO) — USUARIOS CON POO */

class Usuario {
  // TODO: constructor(nombre, correo)
  constructor(nombre, correo) {
    // TODO
  }

  // TODO: mostrarInfo()
  mostrarInfo() {
    // TODO
  }
}

class Administrador extends Usuario {
  // TODO: constructor(nombre, correo, permiso)
  constructor(nombre, correo, permiso) {
    // TODO: super(nombre, correo)
    // TODO: this.permiso = permiso
  }

  // TODO: override mostrarInfo()
  mostrarInfo() {
    // TODO
  }
}

// PRUEBAS (descomenta)
// const u = new Usuario("Sofía", "sofia@email.com");
// const a = new Administrador("Lucas", "lucas@email.com", true);
// console.log(u.mostrarInfo());
// console.log(a.mostrarInfo());
