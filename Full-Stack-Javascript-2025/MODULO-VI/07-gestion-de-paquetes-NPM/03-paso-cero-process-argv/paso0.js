
/*
console.log("\n=== process.argv (crudo) ===");
console.log( process.argv );

console.log("\n=== process.argv explicado ===");
console.log("0:", process.argv[0], "-> ruta al ejecutable de Node");
console.log("1:", process.argv[1], "-> ruta al archivo .js que estás ejecutando");
console.log("2..:", process.argv.slice(2), "-> argumentos que escribió el usuario\n");
*/

const argsUsuario = process.argv.slice(2); // [ n, n , n ....]
// Caso : No hay Argumentos
if(argsUsuario.length === 0){
    console.log("No se pasaron argumentos.")
    console.log("Prueba por ejemplo:")
    console.log(" node paso0.js sumar 10 25 --verbose\n");
    process.exit(0)
}

/*
1) El primer token lo interpretamos como "comando"
En muchos CLIs, el primer token indica la acción:
 - sumar
 - listar
 - agregar
 - etc
 vamos a asumir esa convención para entender la idea.
 [ 'sumar', '10', '25', '--verbose' ]
*/

const comando = argsUsuario[0];
console.log("Comando (primer token):", comando);

/**
 * 2) El resto de tokens podrían ser:
 * - Valores/posicionales (ejemplo: 10,25
 * -banderas/flags ( ej:--verbose )
 */
const resto = argsUsuario.slice(1);
console.log("Resto de tokens:", resto);

/**
 * 3) Separa flags y posicionales de forma simple
 * convención:
 * - si un token comienza con "--" lo tratmos como bandera (flag)
 * - si no lo tratamos como un posicional (valor)
 * 
 */
 // [ 'sumar', '10', '25', '--verbose' ]
const flags = resto.filter( t => t.startsWith('--'));
const posicionales = resto.filter( t => !t.startsWith('--'))

console.log("Flags detectados (token que empieza con --):", flags);
console.log("Posicionales (Valores sueltos):", posicionales );

/**
 * 4) Ejemplo : Existe la bandera --verbose ?
 * --verbose va indicar modo detallado
 */
const verbose = flags.includes('--verbose');
console.log("Está activado --verbose?:", verbose);

/** 
 * 5) Convertir posicionales a números
 * comno 10 y 25 llega como string hay que convertirlos
*/

const posicionalesConvertidos = posicionales.map( p =>{
    const n = Number(p)
    return Number.isNaN(n) ? p : n
})

console.log("Posicionales convertidos (Si eran numeros:", posicionalesConvertidos )
