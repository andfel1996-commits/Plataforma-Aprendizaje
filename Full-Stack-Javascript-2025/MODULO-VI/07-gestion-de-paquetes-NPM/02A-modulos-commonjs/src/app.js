const math = require("./math.js");
console.log("====== Demo:CommonJS=====")
const a = 10;
const b = 5;

console.log("Sumar", math.sumar(a,b))
console.log("restar", math.restar(a,b))
console.log("multiplicar", math.multiplicar(a,b));
console.log("dividir", math.dividir(a,b));

console.log("dividir por 0", math.dividir(10,0)) // null