const UserServices = require('../services/UserServices');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const user = await UserServices.createUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', userId: user.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await UserServices.validateUserCredentials(username, password);

    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
