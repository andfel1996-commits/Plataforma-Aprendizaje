// Espera a que el HTML esté completamente cargado antes de ejecutar lógica JS.
document.addEventListener('DOMContentLoaded', async () => {
  // Al abrir la página, carga inmediatamente la lista de archivos actuales.
  await loadFiles();

  // Busca el formulario de subida por su id en el DOM.
  // Luego registra el evento submit para que use nuestra función personalizada.
  document.getElementById('uploadForm').addEventListener('submit', handleUpload);
});

// Función principal que maneja el envío del formulario de subida.
async function handleUpload(e) {
  // Evita el comportamiento por defecto del formulario (recargar la página).
  e.preventDefault();

  // Obtiene la referencia al input type="file".
  const fileInput = document.getElementById('fileInput');
  // Toma el primer archivo seleccionado por el usuario.
  const file = fileInput.files[0];
  // Crea un objeto FormData para enviar multipart/form-data.
  const formData = new FormData();
  // Agrega el archivo con la clave "file" (debe coincidir con backend).
  formData.append('file', file);

  // Obtiene botón de subir para deshabilitarlo durante la petición.
  const uploadBtn = document.getElementById('uploadBtn');
  // Obtiene spinner de carga visual.
  const spinner = document.getElementById('spinner');
  // Obtiene div donde se muestran mensajes de éxito/error.
  const messageDiv = document.getElementById('message');

  try {
    // Deshabilita el botón para evitar doble clic y envíos duplicados.
    uploadBtn.disabled = true;
    // Muestra spinner mientras el request está en progreso.
    spinner.classList.remove('d-none');

    // Envía el archivo al endpoint de subida del backend.
    const response = await fetch('/api/v1/uploads', {
      // Método HTTP para crear/subir recurso.
      method: 'POST',
      // Cuerpo del request con el archivo dentro.
      body: formData,
    });

    // Convierte la respuesta JSON a objeto JavaScript.
    const data = await response.json();

    // Asegura que el mensaje esté visible y sin estilo previo de error.
    messageDiv.classList.remove('d-none', 'alert-danger');
    // Aplica estilo de éxito por defecto (si falla se cambia abajo).
    messageDiv.classList.add('alert-success');

    // response.ok será true para status HTTP 200-299.
    if (response.ok) {
      // Muestra mensaje de éxito devuelto por la API.
      messageDiv.innerHTML = `✓ ${data.message}`;
      // Limpia el input para permitir nueva selección del mismo archivo.
      fileInput.value = '';
      // Recarga listado para mostrar el archivo recién subido.
      await loadFiles();
    } else {
      // Si la API devuelve error, cambia estilos a alerta de error.
      messageDiv.classList.remove('alert-success');
      // Agrega clase visual de error.
      messageDiv.classList.add('alert-danger');
      // Muestra mensaje de error enviado por backend.
      messageDiv.innerHTML = `✗ ${data.message}`;
    }
  } catch (err) {
    // Si falla red/conexión/parsing, muestra error capturado en cliente.
    messageDiv.classList.remove('d-none', 'alert-success');
    // Aplica estilo visual de error.
    messageDiv.classList.add('alert-danger');
    // Informa al usuario qué pasó usando el mensaje del error JS.
    messageDiv.innerHTML = `✗ Error: ${err.message}`;
  } finally {
    // Siempre vuelve a habilitar el botón al terminar (éxito o fallo).
    uploadBtn.disabled = false;
    // Oculta spinner cuando la operación termina.
    spinner.classList.add('d-none');
  }
}

// Carga desde API la lista de archivos y la pinta en pantalla.
async function loadFiles() {
  try {
    // Solicita el listado actual de archivos al backend.
    const response = await fetch('/api/v1/uploads');
    // Parsea la respuesta JSON.
    const data = await response.json();

    // Toma el contenedor visual donde van los ítems.
    const filesList = document.getElementById('filesList');
    // Limpia contenido previo para evitar duplicados.
    filesList.innerHTML = '';

    // Si no hay archivos, muestra un mensaje y sale de la función.
    if (data.data.items.length === 0) {
      filesList.innerHTML =
        '<p class="text-muted text-center py-3">No hay archivos subidos</p>';
      return;
    }

    // Recorre cada archivo y crea su bloque HTML.
    data.data.items.forEach((file) => {
      console.log('Salida de file-->', file)
      // Crea un contenedor por archivo.
      const fileItem = document.createElement('div');
      // Asigna clases Bootstrap para layout y estilo del ítem.
      fileItem.className = 'list-group-item d-flex justify-content-between align-items-center';
      // Inserta el contenido HTML del archivo: nombre, tamaño, fecha y botón borrar.
      fileItem.innerHTML = `
        <div class="flex-grow-1">
          <h6 class="mb-1">
            <a href="${file.path}" target="_blank" class="text-decoration-none">
              ${file.filename}
            </a>
          </h6>
          <div class="small">
            <span class="file-size">📊 ${formatFileSize(file.size)}</span>
            <span class="ms-3 file-date">📅 ${formatDate(file.uploadedAt)}</span>
          </div>
        </div>
        <button 
          class="btn btn-danger btn-delete" 
          onclick="deleteFile('${file.filename}')"
        >
          🗑️ Eliminar
        </button>
      `;
      // Agrega el ítem construido al contenedor general de la lista.
      filesList.appendChild(fileItem);
    });
  } catch (err) {
    // Si falla al cargar listado, lo registra en consola para depuración.
    console.error('Error loading files:', err);
  }
}

// Elimina un archivo específico por nombre.
async function deleteFile(filename) {
  // Pide confirmación al usuario antes de borrar.
  if (!confirm(`¿Estás seguro de que deseas eliminar ${filename}?`)) {
    // Si usuario cancela, sale sin llamar al backend.
    return;
  }

  try {
    // Llama al endpoint DELETE enviando el nombre en la URL.
    const response = await fetch(`/api/v1/uploads/${filename}`, {
      // Método HTTP para borrar recurso.
      method: 'DELETE',
    });

    // Parsea respuesta JSON del backend.
    const data = await response.json();
    // Referencia al div de mensajes para informar resultado.
    const messageDiv = document.getElementById('message');

    // Si backend responde éxito HTTP, actualiza UI y recarga listado.
    if (response.ok) {
      // Asegura visibilidad del mensaje y quita estilo de error.
      messageDiv.classList.remove('d-none', 'alert-danger');
      // Aplica estilo de éxito.
      messageDiv.classList.add('alert-success');
      // Muestra mensaje positivo.
      messageDiv.innerHTML = `✓ ${data.message}`;
      // Vuelve a cargar archivos para reflejar eliminación en pantalla.
      await loadFiles();
    } else {
      // Si backend responde error, cambia estilos y muestra mensaje de fallo.
      messageDiv.classList.remove('d-none', 'alert-success');
      // Aplica clase de error visual.
      messageDiv.classList.add('alert-danger');
      // Muestra detalle del error devuelto por API.
      messageDiv.innerHTML = `✗ ${data.message}`;
    }
  } catch (err) {
    // Si ocurre fallo técnico (red, CORS, servidor caído), muestra alerta.
    alert(`Error al eliminar: ${err.message}`);
  }
}

// Convierte bytes a formato legible (Bytes, KB, MB, GB).
function formatFileSize(bytes) {
  // Caso especial: cuando tamaño es cero.
  if (bytes === 0) return '0 Bytes';

  // Base de conversión entre unidades de almacenamiento.
  const k = 1024;
  // Unidades disponibles para mostrar tamaño.
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  // Calcula el índice de unidad adecuada con logaritmos.
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // Convierte valor, redondea a 2 decimales y concatena unidad.
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

// Convierte una fecha ISO a formato local español con hora y minutos.
function formatDate(dateString) {
  // Crea objeto Date a partir del texto recibido.
  const date = new Date(dateString);
  // Formatea fecha/hora para presentación amigable en interfaz.
  return date.toLocaleDateString('es-ES', {
    // Año con 4 dígitos.
    year: 'numeric',
    // Mes con 2 dígitos.
    month: '2-digit',
    // Día con 2 dígitos.
    day: '2-digit',
    // Hora con 2 dígitos.
    hour: '2-digit',
    // Minuto con 2 dígitos.
    minute: '2-digit',
  });
}
