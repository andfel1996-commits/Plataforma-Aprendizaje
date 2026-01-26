
// REQUERIMIENTO
/*
    Enunciado del ejercicio (PROMPT + DOM)
    Vas a construir un programa en JavaScript que:
    Pida por prompt 3 notas para cada ramo: HTML, CSS y JavaScript.
    Valide que cada nota sea un número entre 1.0 y 7.0.
    Calcule el promedio de cada ramo.
    Determine si el estudiante está Aprobado (>= 4.0) o Reprobado (< 4.0).
    Muestre las notas, el promedio y el estado en una tabla HTML usando getElementById y innerText.
    Todo se ejecuta al presionar un botón: “Ingresar notas con prompt”.
*/

const NOTA_MINIMA = 1.0;
const NOTA_MAX = 7.0;
const NOTA_APROBACION = 4.0;

const btnIniciar = document.getElementById('btnIniciar');

function esNotaValida( n ){
    return !isNaN(n) && n >= NOTA_MINIMA && n <= NOTA_MAX 
}

function pedirNota( mensaje ){
  
    let nota  = Number(prompt( mensaje, "1.0"));
    console.log('Salida de esNotaValida(nota)-->', esNotaValida(nota) );
    // Si es una letra me dio un false
    while (!esNotaValida(nota)) {
       alert(`Nota Invalida, debe ser un numero entre ${NOTA_MINIMA} y ${NOTA_MAX}`);
       nota  = Number(prompt( mensaje, "1.0"));
    }

    return nota;

}

function setCelda( id, texto ){
    document.getElementById(id).innerText = texto;
}

// function promedio3(a,b,c){
//     return ( a + b+ c ) / 3;
// }

const promedio3 = ( a,b,c ) => ( a + b+ c ) / 3;

function estadoPorPromedio(prom){
    return prom >= NOTA_APROBACION ? "APROBADO" : "REPROBADO";
}

function procesarRamo( ramo, idProm, idEstado, id1, id2, id3 ){
    // console.log('salida de --->', ramo, idProm, idEstado, id1,id2,id3)

    const n1 = pedirNota(ramo + " - Nota 1"); // HTML - Nota 1
    const n2 = pedirNota(ramo + " - Nota 2");
    const n3 = pedirNota(ramo + " - Nota 2");

    setCelda(id1, n1);
    setCelda(id2, n2);
    setCelda(id3, n3);

    const prom = promedio3( n1, n2, n3 );

    setCelda( idProm, prom.toFixed(1) );
    setCelda(idEstado, estadoPorPromedio(prom))

}

function iniciarConPrompt(){
    procesarRamo("HTML", "promHtml", "estadoHtml", "html1", "html2", "html3")
}

btnIniciar.addEventListener('click',iniciarConPrompt );


