let arr = [
    [1,2,3],
    [4,5,6],
    [7,8,9]
]


for( let i = 0; i < arr.length ; i++ ){
    // console.log(arr[i])
    for(let j = 0; j < arr[i].length; j++){
        let num = arr[i][j]
        // console.log('salida de num-->', num )
        if( num > 5 ){
            break;
        }
        console.log('Despues de el break')
        console.log(`Salida de num--> ` , num )

    }
}

console.log('==============MAS CICLOS==================')
console.log('==============FOR==================')
let numeros = [10,20,30,40,50,60] // 210
let suma = 0;
/*


for (let i = 0; i < numeros.length; i++) {
    let actual = numeros[i]
    suma = suma + actual
    console.log(`Voy en i=${i} el valor actual es: ${actual}, la suma parcial es ${suma}`)
}

console.log('Suma total con for =', suma)
*/

console.log('==============FOREACH==================')
/* 
numeros.forEach(function(num,i){
    suma = suma + num
     console.log(`Voy en i=${i} el valor actual es: ${num}, la suma parcial es ${suma}`)
})

console.log('Suma total con for =', suma)
*/

// let nuevoArreglo = numeros.map(function(num){
//     suma = suma + num 
//     return num * 2
// })


// console.log('Suma total con for =', suma)
// console.log('nuevoArreglo-->',nuevoArreglo)

let contexto = { prefijo: "N°" };

numeros.forEach(function(num,i){
    suma = suma + num
     console.log(`Voy en i=${i} el valor actual es: ${num}, la suma parcial es ${suma}`)
     console.log('Salids de this', this.prefijo, num)
}, contexto)