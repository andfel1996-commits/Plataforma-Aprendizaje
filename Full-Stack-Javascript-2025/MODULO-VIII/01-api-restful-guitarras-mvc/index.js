import dotenv from 'dotenv';
import Server from './models/Server.js';

dotenv.config();

const server = new Server();
server.listen();

/**
 * Concepto clave: dotenv.config() debe llamarse ANTES de instanciar Server porque el constructor de Server lee process.env.PORT, process.env.API_VERSION, etc.
 */