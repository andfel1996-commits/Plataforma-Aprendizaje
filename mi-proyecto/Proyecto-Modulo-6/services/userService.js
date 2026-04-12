const User = require('../models/User');
const bcrypt = require('bcryptjs');

const createUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, email, password: hashedPassword });
  return user;
};

const getUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

const validateUserCredentials = async (username, password) => {
  const user = await getUserByUsername(username);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;

  return user;
};

module.exports = {
  createUser,
  getUserByUsername,
  validateUserCredentials,
};
