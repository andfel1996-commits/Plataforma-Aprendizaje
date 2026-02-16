export function generarId(){
    const tiempoActual = Date.now();
    const aleatorio = Math.floor( Math.random() * 10000 );
    return String(tiempoActual) + "-" + String(aleatorio)
}

// Normalizar el Texto

// "estudiar     javascript     en    el   2026 "
/*

     \s: Es un metacaracter que coincide con cualquier espacio en blanco, lo que incluye espacios simples, tabuladores (\t), saltos de línea (\n) y retornos de carro (\r).
     +: Es un cuantificador que significa "uno o más". En conjunto, \s+ detecta bloques de espacios (ya sea uno solo o varios seguidos) como una única coincidencia.
     g: Es la bandera (flag) de "búsqueda global". Sin ella, el motor de JS se detendría en el primer espacio que encuentre; con g, buscará todos los espacios en todo el texto.
    regex generator
*/
export function normalizarTexto(texto){
    return String(texto)
        .trim()
        .replace(/\s+/g , " ")
}


export function logDocente( etiqueta , data ){
    console.log(`[DOCENTE]: ${etiqueta} `, data ?? "")
}


