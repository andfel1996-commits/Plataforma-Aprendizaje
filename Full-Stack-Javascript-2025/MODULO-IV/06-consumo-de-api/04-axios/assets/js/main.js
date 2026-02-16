const btn = document.querySelector("#btn-posts");
const estado = document.querySelector("#estado");
const contenedor = document.querySelector("#contenedor");

btn.addEventListener("click", cargarComentarios);

async function cargarComentarios() {
  
  estado.textContent = "Cargando comentarios...";
  contenedor.innerHTML = "";

  try {

    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    response.data.slice(0, 5).forEach(c => {
    crearCard(c.name, c.email);
    });
    estado.textContent = "";

  } catch {
    usarOffline();
  }
}

function crearCard(nombre, email) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<strong>${nombre}</strong><br>${email}`;
  contenedor.appendChild(div);
}

function usarOffline() {
  estado.textContent = "Error API. Usando comentarios offline.";

  setTimeout(() => {
    crearCard("Comentario Offline", "offline@mail.com");
  }, 800);
}
