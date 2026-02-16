/**
 * utils.js
 * --------
 * Módulo utilitario para demostrar export/import.
 * Aquí podrías tener helpers reutilizables.
 */

// Export nombrado (named export)
export function formatMoney(value, currency = "CLP") {
  // Intl.NumberFormat ayuda a formatear valores según locale/moneda
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

// También podríamos tener un export default (por ejemplo):
// export default function algo() {}
