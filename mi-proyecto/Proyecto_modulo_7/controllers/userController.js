// Importamos los modelos y la instancia de conexión
const { User, Order } = require('../models');
const sequelize = require('../config/database'); 

// --- PASO 1 (Plus): POST con Transacción ---
const createUserWithHistory = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { nombre, email, password } = req.body;
        const newUser = await User.create({ nombre, email, password }, { transaction: t });
        
        await Order.create({ 
            producto: 'Registro Inicial', 
            monto: 0, 
            userId: newUser.id 
        }, { transaction: t });

        await t.commit();
        res.status(201).json({ message: 'Usuario y Pedido creados con éxito' });
    } catch (error) {
        await t.rollback();
        next(error); // Enviamos al errorHandler
    }
};

// --- PASO 2: GET con Paginación y Atributos Protegidos ---
const getUsers = async (req, res, next) => {
    try {
        const { page = 1, limit = 5 } = req.query;
        const offset = (page - 1) * limit;

        const { count, rows } = await User.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            attributes: { exclude: ['password'] }, // Requisito: No mostrar clave
            include: [{ model: Order, as: 'pedidos' }]
        });

        res.json({ 
            total: count, 
            pages: Math.ceil(count / limit), 
            currentPage: parseInt(page),
            data: rows 
        });
    } catch (error) {
        next(error);
    }
};

// --- PASO 3: PUT (Actualizar con Validación) ---
const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error("ID no encontrado, no se puede actualizar.");
            error.status = 404;
            throw error;
        }

        await user.update(req.body);
        res.json({ message: 'Usuario actualizado con éxito', data: user });
    } catch (error) {
        next(error);
    }
};

// --- PASO 3: DELETE (Eliminar con Validación) ---
const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);

        if (!user) {
            const error = new Error("El ID solicitado no existe, no se puede eliminar.");
            error.status = 404;
            throw error;
        }

        await user.destroy();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        next(error);
    }
};

module.exports = { 
    createUserWithHistory, 
    getUsers, 
    updateUser, 
    deleteUser 
};