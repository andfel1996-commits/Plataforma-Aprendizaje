$(document).ready(function () {
    // 1. IDENTIFICAR SESIÓN ACTIVA
    const sesionEmail = localStorage.getItem('usuario_sesion_activa');
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];

    // Buscamos al usuario dueño de esta sesión
    let usuarioActual = listaUsuarios.find(u => u.email === sesionEmail);

    // SEGURIDAD: Si no hay sesión, volver al index real
    if (!usuarioActual) {
    window.location.href = 'index.html'; // Asegúrate que el archivo se llame así
    return;
    }

    // El resto de tus funciones (actualizarPantalla, renderizarHistorial, etc.) siguen igual...


    $('#nombre-usuario').text(usuarioActual.nombre);
    $('#saldo-monto').text(parseFloat(usuarioActual.saldo).toLocaleString('es-CL'));


    // Lógica de Depósito
    $('#confirmar-deposito').click(function () {
        let monto = parseFloat($('#input-deposito').val());
        if (monto > 0) {
            usuarioActual.saldo += monto;
            if(!usuarioActual.movimientos) usuarioActual.movimientos = [];
            
            usuarioActual.movimientos.unshift({
                fecha: new Date().toLocaleDateString(),
                desc: "Depósito realizado",
                monto: monto
            });

            guardarYRefrescar();
            $('#input-deposito').val('');
            alert("Depósito exitoso.");
        }
    });

    // Cierre de Sesión
    $('#btn-logout').click(function () {
        localStorage.removeItem('usuario_sesion_activa');
        window.location.href = 'index.html';
    });
    
    // Función para el Historial (llamada al abrir la sección)
    $('#btn-historial').click(function() {
        let html = '';
        const movs = usuarioActual.movimientos || [];
        movs.forEach(m => {
            const color = m.monto > 0 ? 'text-success' : 'text-danger';
            html += `<tr><td>${m.fecha}</td><td>${m.desc}</td><td class="${color}">$${m.monto}</td></tr>`;
        });
        $('#lista-movimientos').html(html || '<tr><td colspan="3">Sin movimientos</td></tr>');
    });

    });