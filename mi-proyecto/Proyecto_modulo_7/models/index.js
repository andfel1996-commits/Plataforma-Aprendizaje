const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/database');

const User = sequelize.define('User', {
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
});

const Order = sequelize.define('Order', {
    producto: { type: DataTypes.STRING, allowNull: false },
    monto: { type: DataTypes.FLOAT, allowNull: false }
});

// Definición de Relaciones (Requisito Módulo 7)
User.hasMany(Order, { foreignKey: 'userId', as: 'pedidos' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = { sequelize, User, Order };