const fs = require('fs');
const path = require('path');

const logError = (error) => {
    const logPath = path.join(__dirname, '../logs/error.log');
    const message = `[${new Date().toISOString()}] - ERROR: ${error}\n`;

    if (!fs.existsSync(path.join(__dirname, '../logs'))) {
        fs.mkdirSync(path.join(__dirname, '../logs'));
    }
    fs.appendFileSync(logPath, message);
};

module.exports = logError;