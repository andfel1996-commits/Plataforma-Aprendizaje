const yargs = require('yargs');

yargs.command({
  command: 'saludar',
  describe: 'Imprime un saludo',
  builder: {
    nombre: {
      describe: 'Nombre de la persona',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    console.log(`Hola, ${argv.nombre}!`);
  },
});

yargs.parse();
