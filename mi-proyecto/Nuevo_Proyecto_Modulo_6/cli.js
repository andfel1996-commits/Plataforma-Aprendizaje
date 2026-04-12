const yargs = require('yargs');
const chalk = require('chalk').default; // Importa así para evitar error

const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .command('start', 'Iniciar el servidor', {
    port: {
      description: 'Puerto para el servidor',
      alias: 'p',
      type: 'number',
      default: 3000,
    },
  }, (args) => {
    console.log(chalk.green(`Iniciando servidor en el puerto ${args.port}...`));
    require('./index').startServer(args.port);
  })
  .command('greet', 'Saludar a alguien', {
    name: {
      description: 'Nombre de la persona',
      alias: 'n',
      type: 'string',
      demandOption: true,
    },
  }, (args) => {
    console.log(chalk.blue(`Hola, ${args.name}! Bienvenido al proyecto.`));
  })
  .demandCommand(1, 'Debes especificar un comando válido')
  .help()
  .argv;
