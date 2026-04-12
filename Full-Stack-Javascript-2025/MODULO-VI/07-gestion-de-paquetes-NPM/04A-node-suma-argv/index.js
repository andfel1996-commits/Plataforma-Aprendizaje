
const args = process.argv.slice(2);
const verbose = args.includes("--verbose") // retornar un boolena true o false
const soloNumerosComoTexto = args.filter( a => a !== "--verbose")

if(soloNumerosComoTexto.length < 2){
    console.log("\nUso:");
    console.log(" node index.js <a> <b> [--verbose]\n");
    console.log("Explicación rápida:")
    console.log("  <a> y <b> son números (posicionales).");
    console.log("  [--verbose] es opcional y muestra el cálculo detallado.\n");

    console.log("Ejemplos:");
    console.log("  node index.js 10 25");
    console.log("  node index.js 10 25 --verbose\n");
    process.exit(1)
}

const a = Number(soloNumerosComoTexto[0]);
const b = Number(soloNumerosComoTexto[1]);

if(Number.isNaN(a) || Number.isNaN(b)){
    console.log("\nError:Debes ingresar 2 números validos");
    console.log("Ejemplo correcto: node index.js 10 25");
    console.log("Ejemplo incorrecto: node index.js hola 25");
    process.exit(1)
}

const resultado = a + b;

if(verbose){
    console.log(`\n${a} + ${b} = ${resultado}\n`)
}else{
    console.log(`\n${resultado}\n`)
}