import imprimir from "./imprimir.js";

const addTarea = async () => {
    try {
        const titulo = document.querySelector("#tituloAdd").value.trim();
        const descripcion = document.querySelector("#descripcionAdd").value.trim();
        if(!titulo || !descripcion){
            alert("Completa título y descripción antes de guardar");
            return
        }
        const resp = await fetch('/tareas',{
            method:"POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({
                titulo,
                descripcion
            })
        })
        if(!resp.ok){
            const maybeError = await resp.json().catch( () => null )
            console.error("Error al crear la tarea:", maybeError ?? resp.status)
            alert("No se pudo crear la tarea. Revisa la consola despierta ...")
            return
        }

        $('#modalAddTarea').modal('toggle');
        document.querySelector("#tituloAdd").value = "";
        document.querySelector("#descripcionAdd").value = "";
        await imprimir()
    } catch (error) {
        console.log("Salida de error",error)
    }
}

export default addTarea;