const fs = require('fs');

function crearYEscribirArchivo() {
  const datos = 'Usuario1\nUsuario2\nUsuario3\n'; // Ejemplo de datos
  fs.writeFileSync('data.txt', datos, 'utf8');
  console.log('Archivo data.txt creado y datos escritos.');
}

crearYEscribirArchivo();


function leerArchivo() {
    const contenido = fs.readFileSync('data.txt', 'utf-8');
    console.log('Contenido del archivo:');
    console.log(contenido);
}

leerArchivo();

function modificarArchivo() {
    let contenido = fs.readFileSync('data.txt', 'utf-8');
    contenido += '\nUsuario4'; // Agregar un nuevo usuario al final del archivo
    fs.writeFileSync('data.txt', contenido, 'utf-8');
    console.log('Archivo modificado correctamente.');
}

modificarArchivo();

function eliminarArchivo() {
    if (fs.existsSync('data.txt')) {
        fs.unlinkSync('data.txt');
        console.log('Archivo eliminado correctamente.');
    } else {
        console.log('El archivo no existe.');
    }
}

eliminarArchivo();

const fs = require('fs');

function crearYEscribirArchivo() {
  const datos = 'Usuario1\nUsuario2\nUsuario3\n';
  fs.writeFileSync('data.txt', datos, 'utf8');
  console.log('Archivo data.txt creado y datos escritos.');
}

function leerArchivo() {
  const contenido = fs.readFileSync('data.txt', 'utf8');
  console.log('Contenido del archivo:');
  console.log(contenido);
}

function modificarArchivo() {
  let contenido = fs.readFileSync('data.txt', 'utf8');
  contenido += 'Usuario4\n';
  fs.writeFileSync('data.txt', contenido, 'utf8');
  console.log('Archivo modificado.');
}

function eliminarArchivo() {
  if (fs.existsSync('data.txt')) {
    fs.unlinkSync('data.txt');
    console.log('Archivo eliminado.');
  } else {
    console.log('El archivo no existe.');
  }
}

// Ejecución paso a paso
crearYEscribirArchivo();
leerArchivo();
modificarArchivo();
leerArchivo();
eliminarArchivo();


// metodo async/await
const fs = require('fs/promises');

async function crearYEscribirArchivo() {
  const datos = 'Usuario1\nUsuario2\nUsuario3\n';
  try {
    await fs.writeFile('data.txt', datos, 'utf8');
    console.log('Archivo data.txt creado y datos escritos.');
  } catch (error) {
    console.error('Error al crear o escribir el archivo:', error);
  }
}

async function leerArchivo() {
  try {
    const contenido = await fs.readFile('data.txt', 'utf8');
    console.log('Contenido del archivo:');
    console.log(contenido);
  } catch (error) {
    console.error('Error al leer el archivo:', error);
  }
}

async function modificarArchivo() {
  try {
    let contenido = await fs.readFile('data.txt', 'utf8');
    contenido += 'Usuario4\n';
    await fs.writeFile('data.txt', contenido, 'utf8');
    console.log('Archivo modificado.');
  } catch (error) {
    console.error('Error al modificar el archivo:', error);
  }
}

async function eliminarArchivo() {
  try {
    await fs.unlink('data.txt');
    console.log('Archivo eliminado.');
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('El archivo no existe.');
    } else {
      console.error('Error al eliminar el archivo:', error);
    }
  }
}

async function ejecutar() {
  await crearYEscribirArchivo();
  await leerArchivo();
  await modificarArchivo();
  await leerArchivo();
  await eliminarArchivo();
}

ejecutar();
