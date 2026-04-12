let tareas = [
  { id: 1, titulo: "Aprender Node.js", completado: false },
  { id: 2, titulo: "Crear una API REST", completado: true },
];


export function getAll(){
  return tareas;
}

export function getById(id){
  return tareas.find( t => t.id === id )
}

export function create({titulo}){
  const nueva = {
    id : tareas.length ? tareas[tareas.length - 1].id + 1 : 1,
    titulo,
    completado:false
  }
  tareas.push(nueva)
  return nueva
}

export function update(id, {titulo, completado }){

  const tarea = tareas.find( t => t.id === id )

  if (!tarea ) return null

  if(typeof titulo !== "undefined") tarea.titulo = titulo;
  if(typeof completado !== "undefined") tarea.completado = completado
  return tarea;
}

export function remove(id){
  const index = tareas.findIndex(t => t.id === id)
  if(index === -1 ) return false
  tareas.splice(index, 1)
  return true
}






