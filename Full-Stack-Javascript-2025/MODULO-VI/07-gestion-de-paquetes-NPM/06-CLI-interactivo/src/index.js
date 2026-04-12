// Dependencias necesarias para trabajar
import chalk from 'chalk';
import inquirer from 'inquirer';
import yargs from 'yargs';
import { hideBin } from "yargs/helpers";

// Importamos las funciones utilitarias
import {
    sumar,
    restar,
    multiplicar,
    dividir} from './operaciones.js'
import { preguntasCalculadora } from "./preguntas.js";

// Creamos un función que se va ejecutar en base a la operación pedia
function ejecutarOperacion( operacion, a, b){
    switch ( operacion ) {
        case "sumar":
            return sumar(a,b)
        case "restar":
            return restar(a,b)
        case "multiplicar":
            return multiplicar(a,b)
        case "dividir":
            return dividir(a,b)
        default:
            return null
    }
}

/**
 * 1)Definimos los comandos de YARGS
 * Si el usuario llama un comando , YARGS lo va a manejar
 */

const cli = yargs(hideBin(process.argv))
      .scriptName("calculadora")
      .usage("$0 <comando> [opciones]")
      .command(
        "sumar",
        "Suma dos numeros",
        (y)=>
            y.option("a",{
                type:"number",
                demandOption:true
            })
            .option("b",{
                type:"number",
                demandOption:true
            }),
            (argv) => {
                const r = ejecutarOperacion("sumar",argv.a, argv.b );
                console.log(chalk.green(`Resultado:${r}`));
            }
      )
      .command(
        "restar",
        "resta dos numeros",
        (y)=>
            y.option("a",{
                type:"number",
                demandOption:true
            })
            .option("b",{
                type:"number",
                demandOption:true
            }),
            (argv) => {
                const r = ejecutarOperacion("restar",argv.a, argv.b );
                console.log(chalk.green(`Resultado:${r}`));
            }
      )
      .command(
        "multiplicar",
        "multiplicar dos numeros",
        (y)=>
            y.option("a",{
                type:"number",
                demandOption:true
            })
            .option("b",{
                type:"number",
                demandOption:true
            }),
            (argv) => {
                const r = ejecutarOperacion("multiplicar",argv.a, argv.b );
                console.log(chalk.green(`Resultado:${r}`));
            }
      )
      .command(
        "dividir",
        "dividir dos numeros",
        (y)=>
            y.option("a",{
                type:"number",
                demandOption:true
            })
            .option("b",{
                type:"number",
                demandOption:true
            }),
            (argv) => {
                const r = ejecutarOperacion("dividir",argv.a, argv.b );
                if(r === null){
                    console.log(chalk.red(`Error no se puede dividir por 0.`))
                    return
                }
                console.log(chalk.green(`Resultado:${r}`))
            }
      )
      .help()
      .strict();

/**
 * 2) Si no paso ningún comando , entramos al modo interactivo
 * Esto nos permite interactuar con YARGS si hay lineas de comado o si
 * No hay interactuamos con el modo interactivo de Enquirer
 */

const tineComando = hideBin(process.argv).length > 0

if( tineComando ){
    cli.parse();
}else{
    // Modo interactivo
    console.log(chalk.bold.cyan("=== Calculadora (Modo interactivo) ==="))
    const { operacion, a, b } = await inquirer.prompt(preguntasCalculadora())
    const resultado = ejecutarOperacion(operacion,a,b)
    if(resultado === null){
        console.log(chalk.red("Error:operación inválida o división por 0."))
    }else{
        console.log(chalk.green(`Resultado:${resultado}`))
    }
    console.log(chalk.gray("Tip:también puedes usar comandos. Ej: node src/index.js sumar --a 10 --b 5"))
}

