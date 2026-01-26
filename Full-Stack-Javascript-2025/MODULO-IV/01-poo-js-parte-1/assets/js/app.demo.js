/* ==========================================================
   APP.DEMO.JS — POO EN JAVASCRIPT (PARTE I) — AE1.1
   ========================================================== */

const output = document.querySelector("#output");

function log(mensaje) {
  const texto = String(mensaje);
  console.log(texto);
  if (output) output.textContent += texto + "\n";
}

function limpiar() {
  console.clear();
  if (output) output.textContent = "";
}

function separador() {
  log("------------------------------------------------------------");
}

function leerNombre() {
  const inp = document.querySelector("#inp-nombre");
  return inp ? inp.value : "";
}

function leerCorreo() {
  const inp = document.querySelector("#inp-correo");
  return inp ? inp.value : "";
}

function leerModelo() {
  const inp = document.querySelector("#inp-modelo");
  return inp ? inp.value : "";
}

/* ===================== DEMO 1: OBJETO LITERAL ===================== */
function demo1_objetoLiteral() {
  limpiar();
  log("DEMO 1) Objeto literal {}");
  separador();

  const nombre = leerNombre();
  const correo = leerCorreo();

  const usuarioLiteral = {
    nombre: nombre,
    correo: correo,
    mostrarInfo: function () {
      return "Usuario (literal): " + this.nombre + " - " + this.correo;
    },
  };

  log("Objeto literal creado:");
  log(JSON.stringify(usuarioLiteral, null, 2));
  log("mostrarInfo(): " + usuarioLiteral.mostrarInfo());
  log("Idea clave: sirve para 1 caso, no es 'plantilla'.");
}

/* ===================== DEMO 2: CONSTRUCTORA + PROTOTYPE ===================== */
function UsuarioConstructor(nombre, correo) {
  this.nombre = nombre;
  this.correo = correo;
}

UsuarioConstructor.prototype.mostrarInfo = function () {
  return "Usuario (constructor): " + this.nombre + " - " + this.correo;
};

function demo2_constructorYPrototype() {
  limpiar();
  log("DEMO 2) Constructora + prototype");
  separador();

  const u1 = new UsuarioConstructor(leerNombre(), leerCorreo());
  const u2 = new UsuarioConstructor("Lucas", "lucas@email.com");

  log("u1.mostrarInfo(): " + u1.mostrarInfo());
  log("u2.mostrarInfo(): " + u2.mostrarInfo());
  log("Idea clave: prototype comparte métodos entre instancias.");
}

/* ===================== DEMO 3: CLASS + HERENCIA + OVERRIDE ===================== */
class UsuarioClass {
  constructor(nombre, correo) {
    this.nombre = nombre;
    this.correo = correo;
  }
  mostrarInfo() {
    return "Usuario (class): " + this.nombre + " - " + this.correo;
  }
}

class Administrador extends UsuarioClass {
  constructor(nombre, correo, permiso) {
    super(nombre, correo);
    this.permiso = permiso;
  }
  mostrarInfo() {
    const estado = this.permiso ? "Sí" : "No";
    return "Administrador: " + this.nombre + " - " + this.correo + " - Permiso: " + estado;
  }
}

function demo3_classUsuarios() {
  limpiar();
  log("DEMO 3) class + herencia + override");
  separador();

  const u = new UsuarioClass(leerNombre(), leerCorreo());
  const a = new Administrador("Lucas", "lucas@email.com", true);

  log(u.mostrarInfo());
  log(a.mostrarInfo());
  log("Idea clave: override = mismo método, distinto comportamiento (polimorfismo).");
}

/* ===================== DEMO 4: VEHÍCULOS (POLIMORFISMO) ===================== */
class Vehiculo {
  constructor(marca, modelo) {
    this.marca = marca;
    this.modelo = modelo;
  }
  mostrarInfo() {
    return "Vehículo: " + this.marca + " - " + this.modelo;
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, puertas) {
    super(marca, modelo);
    this.puertas = puertas;
  }
  mostrarInfo() {
    return "Auto: " + this.marca + " - " + this.modelo + " | Puertas: " + this.puertas;
  }
}

class Moto extends Vehiculo {
  constructor(marca, modelo, cilindrada) {
    super(marca, modelo);
    this.cilindrada = cilindrada;
  }
  mostrarInfo() {
    return "Moto: " + this.marca + " - " + this.modelo + " | Cilindrada: " + this.cilindrada + "cc";
  }
}

function demo4_vehiculos() {
  limpiar();
  log("DEMO 4) Vehículos (polimorfismo)");
  separador();

  const auto = new Auto("Toyota", leerModelo(), 4);
  const moto = new Moto("Yamaha", "R6", 600);

  log(auto.mostrarInfo());
  log(moto.mostrarInfo());
  log("Idea clave: mismo método, salida distinta según el objeto.");
}

/* ===================== DEMO 5: ENCAPSULAMIENTO (#privado) ===================== */
class CuentaBancaria {
  #saldo;

  constructor(saldoInicial) {
    const inicial = Number(saldoInicial);
    this.#saldo = Number.isNaN(inicial) ? 0 : inicial;
  }

  depositar(monto) {
    const m = Number(monto);
    if (Number.isNaN(m) || m <= 0) return "Depósito inválido";
    this.#saldo += m;
    return "Depósito OK. Saldo ahora: " + this.#saldo;
  }

  retirar(monto) {
    const m = Number(monto);
    if (Number.isNaN(m) || m <= 0) return "Retiro inválido";
    if (m > this.#saldo) return "Fondos insuficientes";
    this.#saldo -= m;
    return "Retiro OK. Saldo ahora: " + this.#saldo;
  }

  get saldo() {
    return this.#saldo;
  }
}

function demo5_encapsulamiento() {
  limpiar();
  log("DEMO 5) Encapsulamiento (#privado)");
  separador();

  const cuenta = new CuentaBancaria(10000);
  log("Saldo inicial: " + cuenta.saldo);
  log(cuenta.depositar(2500));
  log(cuenta.retirar(4000));
  log(cuenta.retirar(999999));
  log("Saldo final: " + cuenta.saldo);
  log("Importante: NO puedes acceder a cuenta.#saldo desde fuera.");
}

/* ===================== DEMO COMPLETA: ABSTRACCIÓN ===================== */
function finalizarOperacion(usuario, vehiculo) {
  if (!usuario || !vehiculo) return "Operación inválida";
  return (
    "RESUMEN OPERACIÓN\n" +
    "Usuario: " + usuario.mostrarInfo() + "\n" +
    "Vehículo: " + vehiculo.mostrarInfo() + "\n" +
    "Estado: OK\n"
  );
}

function demoFinal() {
  limpiar();
  log("DEMO COMPLETA) Mini sistema");
  separador();

  const admin = new Administrador("Lucas", "lucas@email.com", true);
  const auto = new Auto("Toyota", leerModelo(), 4);
  const moto = new Moto("Yamaha", "R6", 600);

  log(finalizarOperacion(admin, auto));
  log(finalizarOperacion(admin, moto));
  log("Idea clave: una misma función trabaja con distintos objetos (polimorfismo).");
}

/* ===================== EVENTOS ===================== */
const btnLimpiar = document.querySelector("#btn-limpiar");
const btn1 = document.querySelector("#btn-1");
const btn2 = document.querySelector("#btn-2");
const btn3 = document.querySelector("#btn-3");
const btn4 = document.querySelector("#btn-4");
const btn5 = document.querySelector("#btn-5");
const btnFinal = document.querySelector("#btn-final");

if (btnLimpiar) btnLimpiar.addEventListener("click", limpiar);
if (btn1) btn1.addEventListener("click", demo1_objetoLiteral);
if (btn2) btn2.addEventListener("click", demo2_constructorYPrototype);
if (btn3) btn3.addEventListener("click", demo3_classUsuarios);
if (btn4) btn4.addEventListener("click", demo4_vehiculos);
if (btn5) btn5.addEventListener("click", demo5_encapsulamiento);
if (btnFinal) btnFinal.addEventListener("click", demoFinal);

log("Listo. Presiona un botón del panel para comenzar.");


