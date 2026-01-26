  // Manejo del formulario de login
$(function () {
  $('#loginForm').submit(function (event) {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    // Verificar las credenciales
    if (email === 'andy@billetera.com' && password === '12345') {
      // Credenciales válidas, redirigir a la pantalla de Menu
      window.location.href = 'Menu.html';
    } else {
      // Credenciales inválidas, mostrar mensaje de error
      alert('Usuario o contraseña invalido. Inténtalo de nuevo.');
    }
  });
});
// Manejo del depósito de dinero
$(
function () {
  let saldo = parseFloat(localStorage.getItem('saldo'));
  $('#current-balance').text(saldo.toFixed(2));

  $('#depositForm').submit(function (e) {
    e.preventDefault();
    const monto = parseFloat($('#amount').val());

    if (monto > 0) {
      saldo += monto;
      localStorage.setItem('saldo', saldo.toFixed(2));

      $('#confirm-legend').text('Has depositado: $' + monto.toFixed(2));
      $('#alert-container').html('<div class="alert alert-success">Depósito exitoso. Volviendo al menú...</div>');

      setTimeout(() => { window.location.href = 'menu.html'; }, 2000);
    } else {
      $('#alert-container').html('<div class="alert alert-danger">Por favor, ingresa un monto válido.</div>');
    }
  });
});

// Manejo del retiro de dinero
$(function () {
  let saldo = parseFloat(localStorage.getItem('saldo'));
  $('#current-balance').text(saldo.toFixed(2));
  $('#withdrawForm').submit(function (e) {
    e.preventDefault();
    const monto = parseFloat($('#amount').val());

    if (monto > 0 && monto <= saldo) {
      saldo -= monto;
      localStorage.setItem('saldo', saldo.toFixed(2));

      $('#confirm-legend').text('Has retirado: $' + monto.toFixed(2));
      $('#alert-container').html('<div class="alert alert-success">Retiro exitoso. Volviendo al menú...</div>');
      setTimeout(() => { window.location.href = 'menu.html'; }, 2000);
    } else {
      $('#alert-container').html('<div class="alert alert-danger">Monto inválido o saldo insuficiente.</div>');
    }
  });
}); //



// CONSTANTES DE SELECTORES HTML
// Texto del saldo: <p id="balanceText">
const HTML_ID_BALANCE_TEXT = "#balanceText";

// Input del monto: <input id="amountInput">
const HTML_ID_AMOUNT_INPUT = "#amountInput";

// Botones: <button id="depositBtn"> y <button id="withdrawBtn">
const HTML_ID_DEPOSIT_BUTTON = "#depositBtn";
const HTML_ID_WITHDRAW_BUTTON = "#withdrawBtn";

// Historial: <section id="historyCard"> y <ul id="historyList">
const HTML_ID_HISTORY_CARD = "#historyCard";
const HTML_ID_HISTORY_LIST = "#historyList";

// CONSTANTES DEL NEGOCIO (tipos de movimiento)

const MOVEMENT_TYPE_DEPOSIT = "DEPOSIT";  // depósito
const MOVEMENT_TYPE_WITHDRAW = "WITHDRAW"; // retiro

// Saldo actual como número
let currentBalanceNumber = 0;

// Lista de movimientos (array de objetos)
let movementList = [];
//localStorage (Keys + Guardar + Cargar)

// "Keys" (nombres) bajo los cuales guardaremos en localStorage
const STORAGE_KEY_BALANCE = "miniWallet_balance";
const STORAGE_KEY_MOVEMENTS = "miniWallet_movements";
//Guarda el estado actual (saldo + movimientos) en localStorage
function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY_BALANCE, currentBalanceNumber.toString());
  localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(movementList));
}
