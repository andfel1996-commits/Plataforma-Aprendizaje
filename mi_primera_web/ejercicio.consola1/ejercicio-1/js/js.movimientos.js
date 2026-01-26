$(document).ready(function() {
    // 1. Obtener movimientos o crear unos de prueba si está vacío
    let movimientos = JSON.parse(localStorage.getItem('wallet_movimientos')) || [
        { id: "TR-101", fecha: "2024-05-10", desc: "Carga de saldo", tipo: "Depósito", monto: 5000 },
        { id: "TR-102", fecha: "2024-05-11", desc: "Transferencia enviada", tipo: "Envío", monto: -1200 },
        { id: "TR-103", fecha: "2024-05-12", desc: "Transferencia recibida", tipo: "Depósito", monto: 2500 }
    ];

    // Función para renderizar la tabla
    function cargarTabla(datos) {
        let html = '';
        if (datos.length === 0) {
            html = '<tr><td colspan="5" class="text-center text-muted">No se encontraron movimientos.</td></tr>';
        } else {
            datos.forEach(m => {
                const claseMonto = m.monto > 0 ? 'text-success fw-bold' : 'text-danger fw-bold';
                const signo = m.monto > 0 ? '+' : '';
                html += `
                    <tr class="item-movimiento">
                        <td class="small text-muted">${m.id}</td>
                        <td>${m.fecha}</td>
                        <td>${m.desc}</td>
                        <td><span class="badge bg-info-subtle text-info-emphasis">${m.tipo}</span></td>
                        <td class="${claseMonto}">${signo}$${m.monto.toLocaleString()}</td>
                    </tr>
                `;
            });
        }
        $('#tabla-body').html(html);
    }

    // Carga inicial
    cargarTabla(movimientos);

    // 2. BUSCADOR POR ID (En tiempo real)
    $('#searchId').on('keyup', function() {
        let busqueda = $(this).val().toUpperCase();
        
        let filtrados = movimientos.filter(m => 
            m.id.toUpperCase().includes(busqueda)
        );
        
        cargarTabla(filtrados);
    });

    // 3. FILTRO POR TIPO
    $('#filterType').on('change', function() {
        let tipo = $(this).val();
        
        if (tipo === "Todos") {
            cargarTabla(movimientos);
        } else {
            let filtrados = movimientos.filter(m => m.tipo === tipo);
            cargarTabla(filtrados);
        }
    });

    // Botón Volver
    $('#btnVolver').click(function() {
        window.location.href = 'menu.html';
    });
});
$(document).ready(function() {
    // Obtener la lista actualizada
    const historial = JSON.parse(localStorage.getItem('wallet_movimientos')) || [];
    const $tabla = $('#tabla-body');

    $tabla.empty(); // Limpiar tabla antes de cargar

    historial.forEach(mov => {
        const colorMonto = mov.monto < 0 ? 'text-danger' : 'text-success';
        $tabla.append(`
            <tr>
                <td>${mov.id}</td>
                <td>${mov.fecha}</td>
                <td>${mov.desc}</td>
                <td>${mov.tipo}</td>
                <td class="${colorMonto}">$${Math.abs(mov.monto).toLocaleString('es-CL')}</td>
            </tr>
        `);
    });
});