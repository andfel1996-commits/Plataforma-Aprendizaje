const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ ok: false, message: 'Email ya registrado' });

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ ok: true, user: newUser });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.unscoped().findOne({ where: { email } });
        
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ ok: false, message: 'Credenciales inválidas' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '4h' });
        res.json({ ok: true, token, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};