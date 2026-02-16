const DELAY_MS = 700;
const PROBABILIDAD_FALLO = 0.2;
let forzarError = false;

const TAREAS_DEMO = [
    {id:"demo1", texto:"Repasar DOM (QuerySelector, createElement",estado:"activa"},
    {id:"demo2", texto:"Practicar delegación de eventos en una lista",estado:"activa"},
    {id:"demo3", texto:"Entender async/await + try/catch",estado:"activa"},
]

let tareasEnServidor = clonar(TAREAS_DEMO);

function clonar(valor){
    return  JSON.parse(JSON.stringify(valor))
}

function deberiaFallar(){
    if(forzarError) return true
    return Math.random() < PROBABILIDAD_FALLO
}

function esperar(ms){
    return new Promise( resolve => setTimeout( resolve, ms ))
}

export async function obtenerTareas(){
   

    await esperar( DELAY_MS )

    if(deberiaFallar()){
        throw new Error("Error 503 (Simulado):Servicio no disponible")
    }

    return clonar(tareasEnServidor)
}

export async function guardarTareas(tareas){

    await esperar(DELAY_MS)
    if(deberiaFallar()){
        throw new Error("Error 500 (simulado): No se pudo guardar");
    }

    tareasEnServidor = clonar(tareas ?? [])

    console.log('tareasEnServidor-->', tareasEnServidor)

    return {
        ok:true,
        total:tareasEnServidor.length,
        guardadoEn : new Date().toISOString()
    }
}



