const btn = document.querySelector('#btn-cargar-usuarios')
const estado = document.querySelector("#estado")
const contenedor = document.querySelector("#contenedor")

btn.addEventListener("click", cargarUsuarios )

function cargarUsuarios(){

    estado.textContent = "Cargando usuarios ...";

    contenedor.innerHTML = "";

    const xhr = new XMLHttpRequest()
    const url = "https://jsonplaceholder.typicode.com/users";

    xhr.open("GET", url, true )

    xhr.onreadystatechange = function(){
        // Nos interesa cuando readyState es 4 , por que nsiginifica "DONE" (Terminó)
        if(xhr.readyState === 4){
            console.log('Entro en el status-->')
            if(xhr.status === 200){
                const usuarios = JSON.parse(xhr.responseText);
                
                renderizar(usuarios)
                estado.textContent = ""
            }else{
                // Si no es status 200 , puede ser :
                // 404, 500
                usuarOffLine()
            }

        }
    }
    // oneerror este se va a disparar cuando hay un problema de red :
    // Por ejemplo : sin internet
    // En ese caso también usuamos el Fallback Offline
    xhr.onerror = usarOffline
    xhr.send();
}

function renderizar(lista){
    lista.forEach( u => {
        const div = document.createElement("div")
        div.className="card";
        div.innerHTML = `<strong>${u.name}</strong><br>${u.email}`
        contenedor.appendChild(div)
    })
}

function usarOffline(){
    estado.textContent = "Error API usando datos offline";
    const offline = [
        {name:"Usuario offline", emal:"offline@mail.com"}
    ]

    setTimeout(() => {
        renderizar(offline)
    }, 800)
}