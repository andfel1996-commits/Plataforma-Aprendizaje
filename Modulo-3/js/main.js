// 1. Datos iniciales
const plataforma = {
    usuarios: [
        { nombre: "Carlos", notas: [80, 90] }
    ]
};

// 2. Funciones de operación (Deben estar arriba)
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
    if (!nombre || nombre.trim() === "") {
        return alert("Error: El nombre es obligatorio.");
    }

    let nota1 = parseFloat(prompt("Ingrese la primera nota (0-100):"));
    let nota2 = parseFloat(prompt("Ingrese la segunda nota (0-100):"));
    let nota3 = parseFloat(prompt("Ingrese la segunda nota (0-100):"));

    if (isNaN(nota1) || isNaN(nota2)) {
        return alert("Error: Las notas deben ser números.");
    }

    plataforma.usuarios.push({
        nombre: nombre,
        notas: [nota1, nota2,nota3]
    });
    console.log(`✅ Estudiante ${nombre} registrado.`);
    alert("¡Estudiante registrado con éxito!");
}

function mostrarReporte() {
    // Usamos alert para que sea visible sin abrir la consola
    let reporte = "--- REPORTE DE ESTUDIANTES ---\n";
    plataforma.usuarios.forEach(user => {
        let promedio = obtenerPromedio(user.notas);
        reporte += `${user.nombre} - Promedio: ${promedio.toFixed(2)}\n`;
    });
    alert(reporte);
    console.log(reporte);
}

// 3. Función Principal
function iniciarApp() {
    let continuar = true;
    while (continuar) {
        let opcion = prompt(
            "Seleccione una opción:\n" +
            "1. Ver lista y promedios\n" +
            "2. Registrar nuevo estudiante\n" +
            "3. Salir"
        );

        if (opcion === "1") {
            mostrarReporte();
        } else if (opcion === "2") {
            registrarEstudiante();
        } else if (opcion === "3" || opcion === null) {
            continuar = false;
            alert("Saliendo de la plataforma...");
        } else {
            alert("Opción no válida.");
        }
    }
}

// Ejecución
iniciarApp();