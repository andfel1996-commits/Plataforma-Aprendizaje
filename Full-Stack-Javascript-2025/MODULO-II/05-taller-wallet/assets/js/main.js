// import saveWalletToLocalStorage from './utilities/funciones.js'

// Texto del saldo: <p id="balanceText">
const HTML_ID_BALANCE_TEXT = "#balanceText";

// Input del monto: <input id="amountInput">
const HTML_ID_AMOUNT_INPUT = "#amountInput";

// Botones: <button id="depositBtn"> y <button id="withdrawBtn">
const HTML_ID_DEPOSIT_BUTTON = "#depositBtn";
const HTML_ID_WITHDRAW_BUTTON = "#withdrawBtn";

// Caja de feedback: <div id="feedback">
const HTML_ID_FEEDBACK_BOX = "#feedback";

// Historial: <section id="historyCard"> y <ul id="historyList">
const HTML_ID_HISTORY_CARD = "#historyCard";
const HTML_ID_HISTORY_LIST = "#historyList";

// Botón para mostrar/ocultar historial: <button id="toggleHistoryBtn">
const HTML_ID_TOGGLE_HISTORY_BUTTON = "#toggleHistoryBtn";


/* =====================================================================
   PASO 1) CONSTANTES DEL NEGOCIO (tipos de movimiento)
   ---------------------------------------------------------------------
===================================================================== */

const MOVEMENT_TYPE_DEPOSIT  = "DEPOSIT";  // depósito
const MOVEMENT_TYPE_WITHDRAW = "WITHDRAW"; // retiro


/* =====================================================================
   PASO 2) ESTADO (variables principales)
   ---------------------------------------------------------------------
===================================================================== */

// Saldo actual como número
let currentBalanceNumber = 0;

// Lista de movimientos (array de objetos)
let movementList = [];


/* =====================================================================
   PASO 3) localStorage (Keys + Guardar + Cargar)
   ---------------------------------------------------------------------

===================================================================== */

// "Keys" (nombres) bajo los cuales guardaremos en localStorage
const STORAGE_KEY_BALANCE   = "miniWallet_balance";
const STORAGE_KEY_MOVEMENTS = "miniWallet_movements";

/* ---------------------------------------------------------
   Guarda el estado actual (saldo + movimientos) en localStorage
--------------------------------------------------------- */
function saveWalletToLocalStorage() {

  // Guardamos el saldo como texto (String)
  localStorage.setItem(STORAGE_KEY_BALANCE, String(currentBalanceNumber));

  // Guardamos el array como JSON (texto)
  localStorage.setItem(STORAGE_KEY_MOVEMENTS, JSON.stringify(movementList));
}

/* ---------------------------------------------------------
   Carga (si existe) el estado desde localStorage
--------------------------------------------------------- */
function loadWalletFromLocalStorage() {

  // 1) Cargar saldo
  const savedBalanceText = localStorage.getItem(STORAGE_KEY_BALANCE); // texto o null
  const savedBalanceNumber = Number(savedBalanceText);                // convertimos a número

  // Si existe y es válido, lo usamos
  if (savedBalanceText !== null && !Number.isNaN(savedBalanceNumber)) {
    currentBalanceNumber = savedBalanceNumber;
  }

  // 2) Cargar movimientos
  const savedMovementsText = localStorage.getItem(STORAGE_KEY_MOVEMENTS); // texto JSON o null

  // Si existe texto, lo transformo en array, si no, dejo []
  if (savedMovementsText) {
    movementList = JSON.parse(savedMovementsText);
  } else {
    movementList = [];
  }
}


/* =====================================================================
   PASO 4) UTILIDADES (formato dinero, feedback, validación)
===================================================================== */

/* ---------------------------------------------------------
   Formatear número a pesos chilenos: 12000 -> "$ 12.000"
--------------------------------------------------------- */
function formatCurrencyToCLP(valueNumber) {
  return "$ " + valueNumber.toLocaleString("es-CL");
}

/* ---------------------------------------------------------
   Mostrar el saldo en el HTML
--------------------------------------------------------- */
function renderBalanceOnScreen() {

  // Convertimos el saldo a texto formateado
  const balanceText = formatCurrencyToCLP(currentBalanceNumber);

  // Lo escribimos dentro del <p id="balanceText">
  $(HTML_ID_BALANCE_TEXT).text(balanceText);
}

/* ---------------------------------------------------------
   Mostrar mensajes animados (Bootstrap alert)
--------------------------------------------------------- */
function showFeedbackAnimated(messageText, feedbackTypeText) {

  // Seleccionamos la caja de feedback
  const $feedbackElement = $(HTML_ID_FEEDBACK_BOX);

  // Quitamos clases anteriores
  $feedbackElement.removeClass("alert-success alert-danger alert-warning alert-info");

  // Agregamos la clase correspondiente
  // Ej: alert-success / alert-danger / alert-warning / alert-info
  $feedbackElement.addClass(`alert-${feedbackTypeText}`);

  // Escribimos el mensaje
  $feedbackElement.text(messageText);

  // Evitamos que se acumulen animaciones y mostramos con slideDown
  $feedbackElement.stop(true, true).hide().slideDown(200);

  // Luego de 2 segundos lo ocultamos
  setTimeout(() => $feedbackElement.slideUp(200), 2000);
}

/* ---------------------------------------------------------
   Validar el monto que el usuario escribió en el input
--------------------------------------------------------- */
function validateAmountFromInput() {

  // Tomamos el valor del input como texto
  const amountInputValueText = $(HTML_ID_AMOUNT_INPUT).val();

  // Convertimos a número
  const amountNumber = Number(amountInputValueText);

  // Si está vacío o no es número válido
  if (!amountInputValueText || Number.isNaN(amountNumber)) {
    return { isValid: false, errorMessage: "Ingresa un número válido." };
  }

  // Si es 0 o negativo (en wallet no sirve)
  if (amountNumber <= 0) {
    return { isValid: false, errorMessage: "El monto debe ser mayor que 0." };
  }

  // Si todo está OK
  return { isValid: true, amountNumber };
}


/* =====================================================================
   PASO 5) RENDER HISTORIAL (#historyList)
   ---------------------------------------------------------------------
===================================================================== */

function renderHistoryListOnScreen() {

  // Seleccionamos el <ul id="historyList">
  const $historyListElement = $(HTML_ID_HISTORY_LIST);

  // Limpiamos para que NO se duplique contenido
  $historyListElement.empty();

  // Si no hay movimientos, mostramos un mensaje
  if (movementList.length === 0) {
    $historyListElement.append(`
      <li class="list-group-item text-muted">
        Aún no hay movimientos.
      </li>
    `);
    return; // salimos de la función
  }

  // Recorremos cada movimiento y lo pintamos como <li>
  movementList.forEach((movementRecord, index) => {

    // Determinamos si es depósito o retiro
    const isDepositMovement = movementRecord.movementType === MOVEMENT_TYPE_DEPOSIT;

    // Badge verde si es depósito, rojo si es retiro
    const badgeCssClass = isDepositMovement ? "bg-success" : "bg-danger";

    // Texto humano para mostrar
    const movementLabelText = isDepositMovement ? "Depósito" : "Retiro";

    // Formateo del monto
    const amountText = formatCurrencyToCLP(movementRecord.movementAmountNumber);

    // Construimos el <li> y lo agregamos con append
    $historyListElement.append(`
      <li class="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span class="badge ${badgeCssClass} me-2">${movementLabelText}</span>
          <strong>${amountText}</strong>
          <small class="text-muted ms-2">${movementRecord.movementDateText}</small>
        </div>

        <!-- data-index guarda el índice en el array -->
        <button class="btn btn-sm btn-outline-secondary deleteBtn" data-index="${index}">
          Eliminar
        </button>
      </li>
    `);
  });
}


/* =====================================================================
   PASO 6) RECALCULAR SALDO DESDE MOVIMIENTOS (al eliminar)
   ---------------------------------------------------------------------
===================================================================== */

function recalculateBalanceFromMovements() {

  // Partimos de 0
  let newBalance = 0;

  // Recorremos todos los movimientos
  movementList.forEach((movementRecord) => {

    // Si es depósito, sumo
    if (movementRecord.movementType === MOVEMENT_TYPE_DEPOSIT) {
      newBalance = newBalance + movementRecord.movementAmountNumber;
    }

    // Si es retiro, resto
    if (movementRecord.movementType === MOVEMENT_TYPE_WITHDRAW) {
      newBalance = newBalance - movementRecord.movementAmountNumber;
    }
  });

  // Guardamos el resultado en el estado
  currentBalanceNumber = newBalance;
}


/* =====================================================================
   PASO 7) ACCIONES PRINCIPALES (DEPÓSITO / RETIRO)
===================================================================== */

function handleDepositButtonClick() {

  // 1) Validar input
  const validationResult = validateAmountFromInput();

  // 2) Si no es válido, muestro feedback y termino
  if (!validationResult.isValid) {
    return showFeedbackAnimated(validationResult.errorMessage, "warning");
  }

  // 3) Tomo el monto ya validado
  const depositAmountNumber = validationResult.amountNumber;

  // 4) Actualizo el saldo (negocio)
  currentBalanceNumber = currentBalanceNumber + depositAmountNumber;

  // 5) Agrego el movimiento al inicio del array (unshift)
  movementList.unshift({
    movementType: MOVEMENT_TYPE_DEPOSIT,
    movementAmountNumber: depositAmountNumber,
    movementDateText: new Date().toLocaleString(),
  });

  // 6) Persisto en localStorage
  saveWalletToLocalStorage();

  // 7) Render UI
  renderBalanceOnScreen();
  renderHistoryListOnScreen();

  // 8) Limpio input
  $(HTML_ID_AMOUNT_INPUT).val("");

  // 9) Feedback final
  showFeedbackAnimated("Depósito realizado ✅", "success");
}

function handleWithdrawButtonClick() {

  // 1) Validar input
  const validationResult = validateAmountFromInput();

  // 2) Si no es válido, muestro feedback y termino
  if (!validationResult.isValid) {
    return showFeedbackAnimated(validationResult.errorMessage, "warning");
  }

  // 3) Monto a retirar
  const withdrawAmountNumber = validationResult.amountNumber;

  // 4) Validación extra: no retirar más que el saldo
  if (withdrawAmountNumber > currentBalanceNumber) {
    return showFeedbackAnimated("No puedes retirar más que tu saldo.", "danger");
  }

  // 5) Actualizo el saldo
  currentBalanceNumber = currentBalanceNumber - withdrawAmountNumber;

  // 6) Agrego movimiento
  movementList.unshift({
    movementType: MOVEMENT_TYPE_WITHDRAW,
    movementAmountNumber: withdrawAmountNumber,
    movementDateText: new Date().toLocaleString(),
  });

  // 7) Persisto en localStorage
  saveWalletToLocalStorage();

  // 8) Render UI
  renderBalanceOnScreen();
  renderHistoryListOnScreen();

  // 9) Limpio input
  $(HTML_ID_AMOUNT_INPUT).val("");

  // 10) Feedback final
  showFeedbackAnimated("Retiro realizado ✅", "info");
}


/* =====================================================================
   PASO 8) ELIMINAR (delegación de eventos)
   ---------------------------------------------------------------------
===================================================================== */

function deleteMovementByIndex(movementIndexNumber) {

  // 1) Elimino 1 elemento desde el índice indicado
  movementList.splice(movementIndexNumber, 1);

  // 2) Recalculo saldo para que quede correcto
  recalculateBalanceFromMovements();

  // 3) Guardo estado actualizado
  saveWalletToLocalStorage();

  // 4) Render UI
  renderBalanceOnScreen();
  renderHistoryListOnScreen();

  // 5) Feedback
  showFeedbackAnimated("Movimiento eliminado.", "warning");
}


/* =====================================================================
   PASO 9) TOGGLE HISTORIAL (mostrar/ocultar)
===================================================================== */

function toggleHistoryCardOnScreen() {
  // slideToggle muestra/oculta con animación
  $(HTML_ID_HISTORY_CARD).stop(true, true).slideToggle(200);
}


/* =====================================================================
   PASO 10) INICIALIZACIÓN + EVENTOS (document ready)
   ---------------------------------------------------------------------
===================================================================== */

$(function () {

  // 1) Cargar desde localStorage (si hay datos guardados)
  loadWalletFromLocalStorage();

  // 2) Render inicial (mostrar lo que se cargó)
  renderBalanceOnScreen();
  renderHistoryListOnScreen();

  // 3) Conectar eventos de depósito y retiro
  $(HTML_ID_DEPOSIT_BUTTON).on("click", handleDepositButtonClick);
  $(HTML_ID_WITHDRAW_BUTTON).on("click", handleWithdrawButtonClick);

  // 4) Conectar botón para mostrar/ocultar historial
  $(HTML_ID_TOGGLE_HISTORY_BUTTON).on("click", toggleHistoryCardOnScreen);

  // 5) Delegación: escuchar clicks en botones .deleteBtn dentro de #historyList
  $(HTML_ID_HISTORY_LIST).on("click", ".deleteBtn", function () {

    // Leo el atributo data-index del botón que se clickeó
    const movementIndexText = $(this).attr("data-index");

    // Convierto a número
    const movementIndexNumber = Number(movementIndexText);

    // Si no es número, muestro error
    if (Number.isNaN(movementIndexNumber)) {
      return showFeedbackAnimated("Error: índice inválido al eliminar.", "danger");
    }

    // Elimino el movimiento
    deleteMovementByIndex(movementIndexNumber);
  });

  

});
