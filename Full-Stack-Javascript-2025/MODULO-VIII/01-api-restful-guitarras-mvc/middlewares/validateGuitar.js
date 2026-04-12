import ApiError from '../utils/ApiError.js';

const REQUIRED_FIELDS = ['name', 'brand', 'model', 'body', 'color', 'pickups', 'strings', 'value', 'stock']

const validateTextField = ( value ) => typeof value === 'string' && value.trim() !== '';
const validateNumberField = ( value ) => typeof value === 'number' && !Number.isNaN( value ) && value >= 0;

const normalizePayload = ( payload = {}) => ({
    ...payload,
  name: typeof payload.name === 'string' ? payload.name.trim() : payload.name,
  brand: typeof payload.brand === 'string' ? payload.brand.trim() : payload.brand,
  model: typeof payload.model === 'string' ? payload.model.trim() : payload.model,
  body: typeof payload.body === 'string' ? payload.body.trim() : payload.body,
  color: typeof payload.color === 'string' ? payload.color.trim() : payload.color,
  pickups: typeof payload.pickups === 'string' ? payload.pickups.trim() : payload.pickups
})

// Construye un array con todos los errores de validación encontrados en el payload.
// 'payload' = el body del request (req.body)
// 'partial' = true para PATCH (solo valida los campos enviados)
//             false para POST y PUT (valida que estén todos los campos obligatorios)
const buildValidationErrors = (payload, partial = false) => {
  // Array que acumula los mensajes de error encontrados
  const errors = [];

  // ── Validación de campos obligatorios (solo para POST y PUT, no para PATCH) ──
  if (!partial) {
    // Filtra los campos requeridos que faltan, son null o están vacíos
    // REQUIRED_FIELDS = ['name', 'brand', 'model', 'body', 'color', 'pickups', 'strings', 'value', 'stock']
    const missing = REQUIRED_FIELDS.filter(
      (field) => payload[field] === undefined || payload[field] === null || payload[field] === ''
    );

    // Si falta al menos un campo, agrega un mensaje indicando cuáles faltan
    // Ejemplo: "Faltan campos obligatorios: model, color, stock"
    if (missing.length) {
      errors.push(`Faltan campos obligatorios: ${missing.join(', ')}`);
    }
  }

  // ── Determina qué campos validar ───────────────────────────────────────────
  // PATCH (partial=true)  → solo valida los campos que el cliente envió (Object.keys del body)
  // POST/PUT (partial=false) → valida todos los campos de REQUIRED_FIELDS
  const presentFields = partial ? Object.keys(payload) : REQUIRED_FIELDS;

  // ── Valida el tipo de cada campo presente ──────────────────────────────────
  for (const field of presentFields) {
    const value = payload[field];

    // Si el campo no vino en el body, lo omite (solo relevante en PATCH)
    if (value === undefined) continue;

    // Valida que los campos de texto sean strings no vacíos
    // validateTextField(value) = typeof value === 'string' && value.trim() !== ''
    if (['name', 'brand', 'model', 'body', 'color', 'pickups'].includes(field) && !validateTextField(value)) {
      errors.push(`El campo '${field}' debe ser un texto no vacío.`);
    }

    // Valida que los campos numéricos sean números válidos y >= 0
    // validateNumberField(value) = typeof value === 'number' && !isNaN(value) && value >= 0
    if (['strings', 'value', 'stock'].includes(field) && !validateNumberField(value)) {
      errors.push(`El campo '${field}' debe ser un número mayor o igual a 0.`);
    }
  }

  // Devuelve el array de errores (vacío si todo es válido)
  return errors;
};


export const validateCreateGuitar = (req, res, next) => {
  req.body = normalizePayload(req.body);
  const errors = buildValidationErrors(req.body, false);

  if (errors.length) {
    return next(new ApiError(422, 'Error de validación al crear la guitarra.', errors));
  }

  return next();
};

export const validatePutGuitar = (req, res, next) => {
  req.body = normalizePayload(req.body);
  const errors = buildValidationErrors(req.body, false);

  if (errors.length) {
    return next(new ApiError(422, 'Error de validación al reemplazar la guitarra.', errors));
  }

  return next();
};

export const validatePatchGuitar = (req, res, next) => {
  req.body = normalizePayload(req.body);

  if (!Object.keys(req.body || {}).length) {
    return next(new ApiError(422, 'Debes enviar al menos un campo para actualizar.'));
  }

  const errors = buildValidationErrors(req.body, true);

  if (errors.length) {
    return next(new ApiError(422, 'Error de validación al actualizar parcialmente la guitarra.', errors));
  }

  return next();
};
