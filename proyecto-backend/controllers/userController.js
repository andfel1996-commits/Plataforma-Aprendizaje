const User = require('../models/User');

// GET - Listar con Paginación (Paso 2)
// GET - Listar con Paginación
exports.getUsers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; 
    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
        limit,
        offset,
        attributes: { exclude: ['password'] }, 
        order: [['createdAt', 'DESC']]
    });

    // CAMBIA ESTO:
    // res.render('users', { ... });

    // POR ESTO:
    res.json({ 
        ok: true,
        users: rows, 
        totalPaginas: Math.ceil(count / limit),
        paginaActual: page
    });
};
// POST - Crear Usuario
exports.createUser = async (req, res) => {
    const { name, email } = req.body;
    await User.create({ name, email });
    res.redirect('/users');
};

// PUT - Actualizar con Validación de ID (Paso 3)
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        const error = new Error('Usuario no encontrado para actualizar');
        error.status = 404;
        throw error;
    }

    await user.update(req.body);
    res.redirect('/users');
};

// DELETE - Eliminar con Validación de ID (Paso 3)
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
        const error = new Error('El ID solicitado no existe, no se puede eliminar');
        error.status = 404;
        throw error;
    }

    await user.destroy();
    res.redirect('/users');
};