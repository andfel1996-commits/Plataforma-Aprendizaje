const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('nombre', {
    alias: 'n',
    description: 'Tu nombre',
    type: 'string',
    demandOption: true
  })
  .help()
  .argv;

console.log(`¡Hola, ${argv.nombre}! Bienvenido a Node.js`);
