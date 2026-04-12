// const chalk = require('chalk');
import chalk from 'chalk';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
// const _ = require('lodash')

console.clear();
/**========Paquetes NPM que no procesan datos========*/

// CHALK URL DOCUMENTACION https://github.com/chalk/chalk#readme
console.log(chalk.green.bgRed.bold('===========USO DE CHALK========='))
console.log(chalk.green.bgRed.bold('Hola Mundo!'))
console.log();

// UUID URL DOCUMENTACION https://github.com/uuidjs/uuid#readme
console.log(chalk.green.bgRed.bold('===========USO DE UUID CON SLICE========='))
console.log(chalk.green.bgRed.bold(uuidv4().slice(0,6)))
console.log();


/**========Paquetes NPM para el procesamiento de datos========*/
/*
A diferencia de los paquetes que aplicaste en el capítulo anterior, existen librerías que nos
ofrecen métodos o funciones para el procesamiento de datos, esto quiere decir, que su
objetivo es trabajar con variables o funciones, para facilitar algún proceso que de otra
manera sería engorroso o más tedioso de trabajar con código propio.
*/

// MOMENT URL DOCUMENTACION https://momentjs.com/docs/  
// USO DE MOMENT
/*
    subtract() Resta
    add() Agrega
    Por ejemplo, tenemos el método “subtract“ y el método “add” que nos permiten restar y
    agregar días, meses, años, horas, etc. También tenemos el método “format” con el que
    podemos especificar el formato de fecha que queremos ocupar.
*/

// RESTA 10 DIAS A PARTIR DEL DIA DE HOY
console.log(chalk.green.bgRed.bold('===========Ejercicio guiado con MOMENT: RESTA 10 DIAS A PARTIR DEL DIA DE HOY========='))
console.log(moment().subtract(10, 'days').locale('es-us').format('DD/MM/YYYY hh:mm:ss'))
console.log();

// AGREGA 10 DIAS A PARTIR DEL DIA DE HOY
console.log(chalk.green.bgRed.bold('===========Ejercicio guiado con MOMENT: AGREGA 10 DIAS A PARTIR DEL DIA DE HOY========='))
console.log(moment().add(10, 'days').locale('es-us').format('dddd'))
console.log();

// Ejercicio guiado: ¿Qué día será en el futuro?
const consulta = {
    fecha: moment().add(10000, 'days').locale('es-us').format('dddd DD [de] MMMM [de] YYYY'),
    ID: uuidv4().slice(0,6),
}

// Salida de la consulta 
console.log(chalk.green.bgRed.bold('===========Ejercicio guiado con MOMENT: ¿Qué día será en el futuro?========='))
console.log(consulta)
console.log();

// LODASH URL DOCUMENTACION https://lodash.com/docs/4.17.15
// USO DE LODASH 
// npm i lodash

// EJERCICIO GUIADO PARES O NONES
console.log(chalk.green.bgRed.bold('===========Ejercicio guiado con lodash========='))
const numeros = [1, 2, 3, 4, 5, 6]
console.log(_.partition(numeros, (n) => n % 2))
console.log();

// EJERCICIO GUIADO PARES O NONES SIN LODASH
console.log(chalk.green.bgRed.bold('===========Ejercicio guiado sin lodash========='))
const otrosNumeros = [1, 2, 3, 4, 5, 6]
let pares = []
let impares = []
for (let index = 0; index < otrosNumeros.length; index++) {
    if (otrosNumeros[index] % 2) {
        impares.push(otrosNumeros[index])
    } else {
        pares.push(otrosNumeros[index])
    }
}
let arregloFinal = [impares, pares]
console.log(arregloFinal)
console.log();

// EJERCICIO PROPUESTO (6)
/*
    Basado en el ejercicio “Pares o nones”, crea una aplicación que particione el
    siguiente arreglo
*/
// DOCUMENTACION https://lodash.com/docs/4.17.15#partition
/*
    Crea una matriz de elementos divididos en dos grupos, 
    el primero de los cuales contiene elementos que predicatedevuelve verdadero para, 
    el segundo de los cuales contiene elementos que predicatedevuelve falso para. 
    El predicado se invoca con un argumento: (valor) .
*/
console.log(chalk.green.bgRed.bold('=========== EJERCICIO PROPUESTO (6) ========='))
const trueOrFalse = [true, 0, null, undefined, '', 22, false]
console.log(_.partition(trueOrFalse, (n) => n ))
console.log()

// AXIOS URL DOCUMENTACION https://github.com/axios/axios
// USO DE AXIOS 
// npm install axios

/*
    axios
    .<verbo http>( <url a consultar>)
    .then( [callback con la data de la consulta] )
    .catch( [callback con el error de la consulta] )
*/

// EJERCICIO GUIADO APLICANDO AXIOS
console.log(chalk.green.bgRed.bold('=========== EJERCICIO GUIADO APLICANDO AXIOS ========='))
axios
.get("https://rickandmortyapi.com/api/character/1")
.then((res) => {
    // console.log('Salida de res--->',res)
    const name = res.data.name;
    console.log(chalk.green.bgRed.bold(name));
})
.catch((e) => {
    console.log(e);
});
console.log()


// EJERCICIO PROPUESTO (7)
/*
    Basado en el ejercicio de Rick and Morty, desarrolla una aplicación en Node que utilice Axios
    para consultar el valor del dólar en Chile utilizando la Siguiente API de indicadores
    económicos.
*/
console.log(chalk.green.bgRed.bold('=========== EJERCICIO PROPUESTO (7) ========='))
axios
.get("https://mindicador.cl/api")
.then((res) => {
    // console.log(data)
    const dolar = res.data.dolar.valor;
    console.log(chalk.green.bgRed.bold(dolar));
})
.catch((e) => {
    console.log(e);
});
console.log()



console.log(chalk.green.bgRed.bold('=========USO DE AXIOS CON RANDOM USER========='));
const usuarios = []
    axios
        .get('https://randomuser.me/api')
        .then((res)=>{
            console.log(res)
            console.log(res.data.results[0].name)

            const { first,last } = res.data.results[0].name

            usuarios.push( { first, last, id:uuidv4().slice(0,6) } )

            _.forEach( usuarios, (u) => console.log(`Nombre:${u.first} - Apellido:${u.last}`) );
     
            // res.write('<ol>')
            
            // res.write('</ol>')
        })
        .catch((e)=>{
            console.log(e);
        })




