import UsuarioPublicacion from '../models/UsuarioPublicacion.js';
import Usuario            from '../models/Usuario.js';
import Publicacion        from '../models/Publicacion.js';

// ═══════════════════════════════════════════════════════════════════════════════
// CONTROLLER — interaccionHandler.js
// ───────────────────────────────────────────────────────────────────────────────
// Gestiona las operaciones CRUD sobre la tabla intermedia "usuario_publicacion".
// Cada función corresponde a un endpoint de la API REST.
//
// Endpoints registrados en el router (ver routes/apiRootInteraccion.routes.js):
//
//   POST   /api/interaccion                                → crearInteraccion
//   GET    /api/interaccion/usuario/:usuarioId             → getPublicacionesPorUsuario
//   GET    /api/interaccion/publicacion/:publicacionId     → getUsuariosPorPublicacion
//   DELETE /api/interaccion/:usuarioId/:publicacionId      → eliminarInteraccion
// ═══════════════════════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────────────────────
// POST /api/interaccion
// Crea un nuevo vínculo entre un usuario y una publicación.
//
// Body esperado (JSON):
//   {
//     "usuarioId":     1,
//     "publicacionId": 3,
//     "tipo":          "favorito"   ← opcional, default "favorito"
//   }
// ─────────────────────────────────────────────────────────────────────────────
export const crearInteraccion = async (req, res) => {
    // Extraemos los campos del cuerpo de la petición
    const { usuarioId, publicacionId, tipo } = req.body;

    // ── Validación básica ─────────────────────────────────────────────────────
    // Verificamos que los campos obligatorios lleguen en el body.
    // Si falta alguno respondemos 400 Bad Request antes de tocar la BD.
    if (!usuarioId || !publicacionId) {
        return res.status(400).json({ msg: 'usuarioId y publicacionId son obligatorios.' });
    }

    try {
        // ── Verificar que el usuario existe ───────────────────────────────────
        // findByPk busca un registro por su clave primaria (PK = id).
        // Si no existe retorna null; en ese caso respondemos 404 Not Found.
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ msg: `No existe un usuario con id ${usuarioId}.` });
        }

        // ── Verificar que la publicación existe ───────────────────────────────
        const publicacion = await Publicacion.findByPk(publicacionId);
        if (!publicacion) {
            return res.status(404).json({ msg: `No existe una publicación con id ${publicacionId}.` });
        }

        // ── Evitar duplicados ─────────────────────────────────────────────────
        // findOne aplica un WHERE con los dos campos.
        // Si el vínculo ya existe respondemos 409 Conflict (no lo creamos dos veces).
        const existente = await UsuarioPublicacion.findOne({
            where: { usuarioId, publicacionId }
        });
        if (existente) {
            return res.status(409).json({ msg: 'Esta interacción ya existe.' });
        }

        // ── Crear el registro en la tabla intermedia ──────────────────────────
        // create() ejecuta un INSERT con los datos recibidos.
        // Si `tipo` no viene en el body, el modelo usa el defaultValue 'favorito'.
        const interaccion = await UsuarioPublicacion.create({ usuarioId, publicacionId, tipo });

        // Respondemos 201 Created con el objeto recién creado.
        res.status(201).json(interaccion);

    } catch (error) {
        console.error('crearInteraccion error:', error);

        // SequelizeValidationError ocurre si `tipo` no es un valor válido del ENUM
        if (error.name === 'SequelizeValidationError') {
            const mensajes = error.errors.map(e => e.message);
            return res.status(400).json({ msg: 'Error de validación.', errores: mensajes });
        }
        res.status(500).json({ msg: 'Error al crear la interacción.', error: error.message });
    }
};


// ─────────────────────────────────────────────────────────────────────────────
// GET /api/interaccion/usuario/:usuarioId
// Retorna todas las publicaciones con las que un usuario ha interactuado,
// incluyendo el tipo de interacción y la fecha.
//
// Parámetro de ruta:
//   :usuarioId → id del usuario a consultar
// ─────────────────────────────────────────────────────────────────────────────
export const getPublicacionesPorUsuario = async (req, res) => {
    const { usuarioId } = req.params;

    try {
        // Verificamos que el usuario exista antes de consultar sus interacciones.
        const usuario = await Usuario.findByPk(usuarioId);
        if (!usuario) {
            return res.status(404).json({ msg: `No existe un usuario con id ${usuarioId}.` });
        }

        // ── Eager-loading N:M ─────────────────────────────────────────────────
        // Usamos include para traer las publicaciones relacionadas en una sola consulta.
        // El alias 'publicacionesInteractuadas' fue definido en belongsToMany
        // dentro de UsuarioPublicacion.js.
        //
        // Sequelize genera el JOIN automáticamente:
        //   SELECT publicaciones.*, usuario_publicacion.tipo, usuario_publicacion.fechaInteraccion
        //   FROM publicaciones
        //   INNER JOIN usuario_publicacion ON publicaciones.id = usuario_publicacion.publicacionId
        //   WHERE usuario_publicacion.usuarioId = :usuarioId
        const usuarioConPublicaciones = await Usuario.findByPk(usuarioId, {
            attributes: ['id', 'nombre', 'email'], // campos del usuario que retornamos
            include: [{
                model:      Publicacion,
                as:         'publicacionesInteractuadas', // alias del belongsToMany
                attributes: ['id', 'titulo', 'contenido', 'imagen', 'fechaPublicacion'],
                // through: permite controlar qué campos de la TABLA INTERMEDIA se incluyen
                through: {
                    attributes: ['tipo', 'fechaInteraccion'] // campos extra de la tabla intermedia
                }
            }]
        });

        res.status(200).json(usuarioConPublicaciones);

    } catch (error) {
        console.error('getPublicacionesPorUsuario error:', error);
        res.status(500).json({ msg: 'Error al obtener las publicaciones del usuario.', error: error.message });
    }
};


// ─────────────────────────────────────────────────────────────────────────────
// GET /api/interaccion/publicacion/:publicacionId
// Retorna todos los usuarios que han interactuado con una publicación concreta,
// incluyendo el tipo de interacción y la fecha.
//
// Parámetro de ruta:
//   :publicacionId → id de la publicación a consultar
// ─────────────────────────────────────────────────────────────────────────────
export const getUsuariosPorPublicacion = async (req, res) => {
    const { publicacionId } = req.params;

    try {
        // Verificamos que la publicación exista.
        const publicacion = await Publicacion.findByPk(publicacionId);
        if (!publicacion) {
            return res.status(404).json({ msg: `No existe una publicación con id ${publicacionId}.` });
        }

        // Eager-loading inverso: desde la publicación hacia los usuarios.
        // El alias 'usuariosInteractuados' fue definido en el segundo belongsToMany
        // dentro de UsuarioPublicacion.js.
        const publicacionConUsuarios = await Publicacion.findByPk(publicacionId, {
            attributes: ['id', 'titulo', 'contenido', 'imagen', 'fechaPublicacion'],
            include: [{
                model:      Usuario,
                as:         'usuariosInteractuados', // alias del belongsToMany
                attributes: ['id', 'nombre', 'email'],
                through: {
                    attributes: ['tipo', 'fechaInteraccion'] // campos de la tabla intermedia
                }
            }]
        });

        res.status(200).json(publicacionConUsuarios);

    } catch (error) {
        console.error('getUsuariosPorPublicacion error:', error);
        res.status(500).json({ msg: 'Error al obtener los usuarios de la publicación.', error: error.message });
    }
};


// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/interaccion/:usuarioId/:publicacionId
// Elimina el vínculo entre un usuario y una publicación.
//
// Parámetros de ruta:
//   :usuarioId     → id del usuario
//   :publicacionId → id de la publicación
// ─────────────────────────────────────────────────────────────────────────────
export const eliminarInteraccion = async (req, res) => {
    const { usuarioId, publicacionId } = req.params;

    try {
        // Buscamos el registro exacto con ambas FKs usando WHERE con los dos campos.
        const interaccion = await UsuarioPublicacion.findOne({
            where: { usuarioId, publicacionId }
        });

        // Si no existe respondemos 404 Not Found.
        if (!interaccion) {
            return res.status(404).json({
                msg: `No existe una interacción entre el usuario ${usuarioId} y la publicación ${publicacionId}.`
            });
        }

        // destroy() ejecuta un DELETE en la BD para este registro.
        await interaccion.destroy();

        // 200 OK con mensaje de confirmación.
        res.status(200).json({ msg: 'Interacción eliminada correctamente.' });

    } catch (error) {
        console.error('eliminarInteraccion error:', error);
        res.status(500).json({ msg: 'Error al eliminar la interacción.', error: error.message });
    }
};
