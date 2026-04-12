/**
 * QUE VAMOS A APRENDER
 * vamos aprender inquirer, que nos permite crear "formularios" y "menús" en la consola
 * En vez de que el usuario escriba comandos son argumentos, 
 * el usuario RESPONDE preguntas (input , lista, confirmación)
 * 
 * IDEA CLAVE (O lo más importante)
 * -inquirer.prompt([...preguntas]) retorna una promesa
 * -cuando la premesa se resuleve, obetemos un objeto : answer,
 * donde cada respuesta queda guardada en una propiedad.
 */

import inquirer from 'inquirer';
// import Choices from 'inquirer/lib/objects/choices';

/**
 * Por qué usuamos una función asincrónica
 */

async function main(){
    console.log("\n=== Inquirer: DEMOSTRACION===\n")
    /**
     * 1) Definimos las preguntas 
     * -------------------------------------------------
     * Inquirer trabajo con un arreglo de objetos, donde cada objeto
     * describe una pregunta
     * 
     * Campos importantes:
     * - type : tipo de control (input, confirm, list, checkbok)
     * - name : nombre de la propiedad donde quedará la respuesta o answers
     * - message : Texto que ve el usuario
     * - validate : función opcionnal para validar inputs
     * - choices : opciones para list/checkbox
     * 
     * IMPORTANTE:
     * - Este arreglo NO pregunta nada todavía
     * - Solo define el formulario en consola
     */

    const preguntas = [{
        /**
         * type:"input"
         * ------------------------------
         * "input" es como un <input> en html
         * el usuario escribe texto y presiona enter
         */
        type : "input",
        /**
         * name:"nombre"
         * Este se usará como clave dentro del objeto answers:
         * answers.nombre -> constendrá lo que usuario escribió
         */
        name : "nombre",
        /**
         * message: "¿Cómo te llamas?"
         * --------------------------------------------------------
         * Esto es la pregunta que verá el usuario en consola.
        */
        message: "Cómo te llamas ?",
        /**
         * validate: (v) => ...
         * Validate se ejecuta cada vez que el usuario intenta confirmar (Enter)
         * REGLAS:
         * - Si retorna true -> la respuesta es válida y se acpeta
         * - Si retorna false -> se muestra el siguiente texto como error y se vuelve a pedir
         * - Aquí obligamos a que no este vacío 
         */
        validate : (v) => (v.trim() ? true : "El nombre no puede estar vacio.")
    },
    {
        type:"list",
        name: "tema",
        message : "Qué estas aprendiendo hoy?",
        choices : ["process.argv", "yargs", "inquirer"]
    }
];

    // Ejecutamos el prompt
    const answers = await inquirer.prompt(preguntas)
    console.log(`\n=== Objeto Answers ===`)
    console.log(answers);
    console.log(`\nHola  ${answers.nombre} hoy estás aprendiendo : ${answers.tema}\n`)
}

// 5) Ejecutar el main()
main().catch((err)=>{
    console.error("Error:", err)
    process.exit(1)
});

/**
 * ============================================================
 * ¿CÓMO SE INTEGRA INQUIRER CON YARGS? (explicación + ejemplo)
 * ============================================================
 *
 * Idea: 2 modos de uso en un CLI real:
 *
 * 1) MODO COMANDO (Yargs):
 *    - si el usuario escribe argumentos, por ejemplo:
 *        node app.js sumar 10 25 --detalle
 *    - entonces yargs parsea y ejecuta el comando.
 *
 * 2) MODO INTERACTIVO (Inquirer):
 *    - si el usuario NO escribe nada:
 *        node app.js
 *    - entonces abrimos un menú con inquirer para que elija acciones.
 *
 * EJEMPLO DE PSEUDOCÓDIGO (NO ES ESTE ARCHIVO, solo referencia):
 *
 *   const args = process.argv.slice(2);
 *   if (args.length === 0) {
 *     // No hay comandos -> modo interactivo
 *     await ejecutarMenuConInquirer();
 *   } else {
 *     // Hay comandos -> modo yargs
 *     await ejecutarYargs(process.argv);
 *   }
 *
 * ¿Qué gana el usuario final?
 * - Usuarios “avanzados” usan comandos rápido (yargs).
 * - Usuarios “principiantes” usan menú guiado (inquirer).
 */

