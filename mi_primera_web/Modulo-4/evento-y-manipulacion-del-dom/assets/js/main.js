const header = document.querySelector("h1");
const button = document.getElementById("changeButton");
const input = document.getElementById("userName");
const ul = document.getElementById("userList");
const status = document.getElementById("status");

button.addEventListener("click", function () {
    const userName = input.value; // Obtenemos el nombre del input
    if (userName) {
        header.textContent = `!Bienvenido,${userName}!`;//cambiamos el texto del encabezado
    } else {
        header.textContent = "!Bienvenido";
    }
    // agregamos un nuevo elemento a la lista
    const newItem = document.createElement("li");
    newItem.textContent = "Nuevo elemento";
    ul.appendChild(newItem);
    // cambiamos el color de fondo del contenedor
    document.getElementById("container").style.backgroundColor =
        "#f0f0f0";//color de fondo
});
input.addEventListener("focus", function () {
    input.style.border = "2px solid green"; // Cambiar el borde
});
window.addEventListener("scroll", function () {
    console.log("¡Estás desplazándote!");
});
window.addEventListener("load", function(){
    console.log("Pagina cargada y lista.");
}
);
