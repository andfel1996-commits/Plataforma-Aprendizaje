const plataforma = {
    usuarios: [
        { nombre: "Carlos", notas: [80, 90] }
    ]
};

function obtenerPromedio(notas) {
    if (notas.length === 0) return 0;
    let suma = 0;
    for (let nota of notas) {
        suma += nota;
    }
    return (suma / notas.length);
}

function registrarEstudiante() {
    let nombre = prompt("Ingrese el nombre del estudiante:");
    if (!nombre || nombre.trim() === "") return alert("❌ Error: El nombre es obligatorio.");

    let n1 = parseFloat(prompt("Ingrese Nota 1:"));
    let n2 = parseFloat(prompt("Ingrese Nota 2:"));

    if (isNaN(n1) || isNaN(n2)) return alert("❌ Error: Debes ingresar números.");

    plataforma.usuarios.push({ nombre: nombre, notas: [n1, n2] });
    
    // El alert detiene el bucle para que veas la confirmación
    alert("✅ Estudiante " + nombre + " guardado correctamente.");
}

function mostrarReporte() {
    if (plataforma.usuarios.length === 0) return alert("No hay datos para mostrar.");

    let reporte = "--- REPORTE DE ESTUDIANTES ---\n\n";
    plataforma.usuarios.forEach(user => {
        let prom = obtenerPromedio(user.notas);
        reporte += `Estudiante: ${user.nombre}\nPromedio: ${prom.toFixed(2)}\n----------\n`;
    });

    // El alert muestra los datos en una ventana emergente
    alert(reporte); 
    console.log(reporte);
}

function iniciarApp() {
    let continuar = true;
    while (continuar) {
        let opcion = prompt(
            "SISTEMA DE CALIFICACIONES\n\n" +
            "1. Ver Lista y Promedios\n" +
            "2. Registrar Estudiante\n" +
            "3. Salir\n\n" +
            "Selecciona una opción (1, 2 o 3):"
        );

        switch (opcion) {
            case "1":
                mostrarReporte();
                break;
            case "2":
                registrarEstudiante();
                break;
            case "3":
            case null:
                continuar = false;
                alert("👋 Saliendo del sistema...");
                break;
            default:
                alert("⚠️ Opción no válida. Intenta de nuevo.");
        }
    }
}

console.log("🚀 Aplicación cargada correctamente.");
console.log("Escribe iniciarApp() y pulsa Enter para abrir el menú.");