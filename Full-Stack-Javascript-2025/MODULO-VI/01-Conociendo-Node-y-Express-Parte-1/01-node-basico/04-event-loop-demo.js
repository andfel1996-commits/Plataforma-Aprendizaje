// “Primero corre lo sincrónico, luego microtasks, y después timers.”

console.log("1)Inicio (Sincrónico)");

setTimeout(()=>{
    console.log("4) setTimeout 0ms (cola de timers/macrotask");
}, 0 )

Promise.resolve().then(()=>{
    console.log("3) Promise.then (cola de microtask")
})

console.log("2) Fin  (sincrónico)")