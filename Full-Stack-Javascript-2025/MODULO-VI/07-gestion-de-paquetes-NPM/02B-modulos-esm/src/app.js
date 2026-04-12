import * as OP from "./math.js"

console.log("====== Demo:Module=====")
const a = 10;
const b = 5;

console.log("Sumar", OP.sumar(a,b))
console.log("restar", OP.restar(a,b))
console.log("multiplicar", OP.multiplicar(a,b));
console.log("dividir", OP.dividir(a,b));

console.log("dividir por 0", OP.dividir(10,0)) // null