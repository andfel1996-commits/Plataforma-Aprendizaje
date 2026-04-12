import chalk from 'chalk';
import dayjs from 'dayjs';
console.clear();
console.log(chalk.bold.cyan("===DEMO 01: NPM + package.json==="));
console.log("Fecha/hora actual:", chalk.yellow(dayjs().format("YYYY-MM-DD HH:mm:ss")));
console.log("")
console.log(chalk.green("Si ves este mensaje significa:"));
console.log("1) Se creó el proyecto con NPM")
console.log("2) Se instaló node_modules")
console.log("");

console.log(chalk.magenta("Siguiente paso en clase:"));
console.log("- Revisar package.json (scripts, dependencies, devDependencies)");
console.log("- Probar npm update y npm uninstall");