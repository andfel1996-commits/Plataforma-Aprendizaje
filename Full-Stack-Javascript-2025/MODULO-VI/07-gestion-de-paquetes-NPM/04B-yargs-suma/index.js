/*

 *   node index.js --help
 *   node index.js sumar 10 25
 *   node index.js sumar 10 25 --detalle
 *   node index.js sumar 10 25 -d
 *   node index.js sumar 10 25 --debug

*/


import yargs from "yargs/yargs";
/**
 * hideBin(process.argv)
 * ------------------------------------------------------------
 * process.argv trae:
 *   [nodePath, scriptPath, ...argsReales]
 *
 * hideBin(...) elimina nodePath y scriptPath.
 * Resultado: solo quedan los argumentos que escribió el usuario.
 */
import { hideBin } from "yargs/helpers";


const argsReales = hideBin(process.argv);

/**
 * yargs(argsReales)
 * Crea el "Parser" del cli
 * -Aqui configuramos comandos y opciones
 * -El parseo real ocurre con .parse()
 */

const app = yargs( argsReales )
    // Cambia el nombre del comando que aparece en --help
    .scriptName("demo-yargs-suma")
    /**
         * .usage("$0 <comando> [opciones]")
         * Define cómo se mostrará la línea de “uso” en la ayuda.
         * $0 = nombre del script (scriptName)
    */
    .usage("$0, <comando>, [opciones]")

    /**
     * Define una opción global 
     * -type: "bollean -> Si aparece => true
     * -default: false -> Si no aparece es => false
     * node index.js sumar 10 25 --debug
     */
    .option("debug",{
          type:"boolean",
          default: false,
          describe:"Muestra el objeto argv parseado por Yargs (Modo Debug)"
    })

    // ------------------------
    // DEFINICION DE COMANDOS
    // ------------------------
    .command(
      "sumar <a> <b>",
      "Suma dos números (demo simple para entender Yargs)",
      /**
       * Builder(cmd)
       * A este callback le llega el objeto Yargs "del comando"
       * Aquí NO se ejecuta la suma aún
       * Aquí sólo dclaramos 
       * -Qué argumentos posicionales existen (a,b)
       * -Que flags existen para este comendo Ejemplo (--detalle)
       */
      (cmd) => {
          return cmd
          // Definimos los posicionales a y  b
          .positional("a",{
               type:"number",
               describe:"Primer número"
          })

          .positional("b", {
               type:"number",
               describe:"Segundo número"
          })

          .option("detalle", {
               type:"boolean",
               default : false,
               alias: ["d"],
               describe:"Muestra el cálculo paso a paso"
          })
      },
      /**
       * handler(argv)
       * Este callback se ejecuta DESPUES del parseo
       */
      ( argv )=>{
          const { a, b, detalle, debug } = argv
          // Si viene --debug (global) mostramos todo el objeto argv
          if(debug){
               console.log("\n===DEBUG: argv parseado por YARGS ===")
               console.log(argv);
               console.log("")
          }

          // validación extra 
          if(Number.isNaN(a) || Number.isNaN(b)){
               console.log("\nError: a y b deben ser numeros");
               console.log("Ejemplo: node index.js sumar 10 25 --detalle\n")
               process.exit(1)
          }
          // Lógica del resultado
          const resultado = a + b

          // Si viene --detalle , vamos a mostrar le operación completa
          // Si no sólo mostramos el resultado
          console.log( detalle ? `\n${a} + ${b} = ${resultado}` : `\n${resultado}\n`)

      }
    )

    // BUENAS PRACTICAS
    /** 
     * .strict()
     * Si escribimos un comado inválido, YARGS marca error y no ejecuta el handler.
     * */ 
    .strict()

    // Agregar  el --help automáticamente
    .help();

    // Ejecutamos el parseo
    // .parse()
    /**
     * Aqui Ocurre la magia 
     * 1) Yargs lee los argReales (Lo que escribio el usuario en consola)
     * 2) Identifica el comando (Ejemplo : sumar)
     * 3) Aplica reglas del builder (tipos,defaults, opciones)
     * 4) Contruye el argv final
     * 5) Ejecuta el handler del comando correspondiente 
     * */ 
     app.parse();






