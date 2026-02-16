const btn = document.querySelector('#btn-posts')
const estado = document.querySelector("#estado")
const contenedor = document.querySelector("#contenedor")

btn.addEventListener("click", cargarPosts )

function cargarPosts(){
    estado.textContent = "Cargado posts...";
    contenedor.innerHTML = "";

    fetch("https://jsonplaceholder.typicode.com/posts")
            .then( resp => {
                if(!resp.ok) throw new Error("Error HTTP");
                // console.log("Salida de resp.json()-->",  resp.json() )
              return resp.json()
                    // resp.json();
            })
            .then( posts => {
                // console.log('Salida de post-->', posts)
                estado.textContent = ""
                posts.slice(0,5).forEach( p => {
                    console.log('Salida de p--->', p)
                    const {title, body } = p
                    crearCard( title, body )
                });
            })
            .catch(()=>{
                usarOffline();
            })
}

function crearCard(titulo, cuerpo){
    const div = document.createElement('div');
    div.className= "card"
    div.innerHTML= `<strong>${titulo}</strong><br>${cuerpo}`
    contenedor.appendChild(div)
}


function usarOffline() {
  // Informamos al usuario que estamos usando datos de respaldo.
  estado.textContent = "Error API. Usando posts offline.";

  // setTimeout simula la “latencia” de una petición real.
  // Esto es excelente para enseñar asincronía incluso sin Internet.
  setTimeout(() => {
    // Creamos un post de ejemplo offline.
    crearCard("Post Offline", "Contenido offline");

    // Opcional: limpiar estado luego de renderizar.
    // estado.textContent = "";
  }, 800);
}


