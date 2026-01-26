$(document).ready(function () {
    // 1. CARGAR DATOS DEL USUARIO
    const sesionEmail = localStorage.getItem('usuario_sesion_activa');
    const listaUsuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
    let usuarioActual = listaUsuarios.find(u => u.email === sesionEmail);

    // Seguridad: Si no hay sesión válida, expulsar al index
    if (!usuarioActual) {
        window.location.href = 'index.html';
        return;
    }

    // 2. FUNCIONES DE PERSISTENCIA Y VISTA
    function guardarYActualizar() {
        const index = listaUsuarios.findIndex(u => u.email === sesionEmail);
        listaUsuarios[index] = usuarioActual;
        localStorage.setItem('usuarios_registrados', JSON.stringify(listaUsuarios));
        
        // Actualizar textos en pantalla
        $('#nombre-usuario').text(usuarioActual.nombre);
        $('#saldo-monto').text(parseFloat(usuarioActual.saldo).toLocaleString('es-CL'));
    }

    function renderizarHistorial() {
        let html = '';
        const movimientos = usuarioActual.movimientos || [];
        if (movimientos.length === 0) {
            html = '<tr><td colspan="3" class="text-center text-muted">Sin movimientos</td></tr>';
        } else {
            movimientos.forEach(m => {
                const color = m.monto > 0 ? 'text-success' : 'text-danger';
                html += `
                    <tr>
                        <td>${m.fecha}</td>
                        <td>${m.desc}</td>
                        <td class="${color} fw-bold">$${m.monto.toLocaleString('es-CL')}</td>
                    </tr>`;
            });
        }
        $('#lista-movimientos').html(html);
    }

    // 3. LÓGICA DE DESPLIEGUE (TOGGLE)
    function abrirSeccion(id) {
        // Cierra cualquier otra sección y abre la nueva
        $('.hidden-section').not(id).slideUp();
        $(id).slideToggle();
    }

    // Eventos de clic en las tarjetas superiores
    $('#btn-depositar').click(() => abrirSeccion('#section-depositar'));
    $('#btn-retirar').click(() => abrirSeccion('#section-retirar'));
    $('#btn-enviar').click(() => abrirSeccion('#section-enviar'));
    $('#btn-historial').click(() => {
        renderizarHistorial();
        abrirSeccion('#section-historial');
    });

    // 4. LÓGICA DE TRANSACCIONES

    // Confirmar Depósito
    $('#confirmar-deposito').click(function () {
        const monto = parseFloat($('#input-deposito').val());
        if (monto > 0) {
            usuarioActual.saldo += monto;
            if(!usuarioActual.movimientos) usuarioActual.movimientos = [];
            usuarioActual.movimientos.unshift({
                fecha: new Date().toLocaleDateString(),
                desc: "Depósito realizado",
                monto: monto
            });
            guardarYActualizar();
            $('#input-deposito').val('');
            $('#section-depositar').slideUp();
            alert("¡Depósito exitoso!");
        }
    });

    // Confirmar Retiro
    $('#confirmar-retiro').click(function () {
        const monto = parseFloat($('#input-retiro').val());
        if (monto > 0 && monto <= usuarioActual.saldo) {
            usuarioActual.saldo -= monto;
            usuarioActual.movimientos.unshift({
                fecha: new Date().toLocaleDateString(),
                desc: "Retiro realizado",
                monto: -monto
            });
            guardarYActualizar();
            $('#input-retiro').val('');
            $('#section-retirar').slideUp();
            alert("¡Retiro exitoso!");
        } else {
            alert("Saldo insuficiente o monto inválido.");
        }
    });

    // Confirmar Envío
    $('#confirmar-envio').click(function () {
        const monto = parseFloat($('#input-envio').val());
        const destinatario = $('#input-destinatario').val().trim();
        if (monto > 0 && monto <= usuarioActual.saldo && destinatario !== "") {
            usuarioActual.saldo -= monto;
            usuarioActual.movimientos.unshift({
                fecha: new Date().toLocaleDateString(),
                desc: `Envío a: ${destinatario}`,
                monto: -monto
            });
            guardarYActualizar();
            $('#input-envio').val('');
            $('#input-destinatario').val('');
            $('#section-enviar').slideUp();
            alert(`Envío a ${destinatario} realizado.`);
        } else {
            alert("Revisa los datos del destinatario o tu saldo.");
        }
    });

    // Cierre de Sesión
    $('#btn-logout').click(function () {
        localStorage.removeItem('usuario_sesion_activa');
        window.location.href = 'index.html';
    });

    // Carga inicial de datos
    guardarYActualizar();
});