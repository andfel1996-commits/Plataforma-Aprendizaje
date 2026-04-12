const form = document.getElementById('formImagen');
const resultado = document.getElementById('resultado');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const url = document.getElementById('url').value.trim();
        const name = document.getElementById('name').value.trim();

        // Mostrar spinner mientras carga
        resultado.innerHTML = `
        <div class="d-flex align-items-center gap-2 text-primary">
            <div class="spinner-border spinner-border-sm"></div>
            <span>Procesando imagen...</span>
        </div>
    `;

        try {
            const response = await axios.post('/upload', { url, name });

            resultado.innerHTML = `
            <div class="alert alert-success">✅ Imagen procesada correctamente</div>
            ${response.data}
        `;

        } catch (error) {
            const mensaje = error.response?.data?.message || error.message;
            resultado.innerHTML = `
            <div class="alert alert-danger">
                ❌ Error: ${mensaje}
            </div>
        `;
        }
    });
}

