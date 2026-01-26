$(document).ready(function() {
    // 1. CARGAR DATOS INICIALES
    let usuario = JSON.parse(localStorage.getItem('wallet_user')) || { nombre: "Usuario", saldo: 0 };
    let movimientos = JSON.parse(localStorage.getItem('wallet_movimientos')) || [];

    $('#nombre-usuario').text(usuario.nombre);
    $('#saldo-monto').text(usuario.saldo.toLocaleString());

    // 2. FUNCIÓN PARA DESPLEGAR SECCIONES (Acordeón)
    function desplegarSeccion(idSeccion) {
        $('.hidden-section').not(idSeccion).slideUp(); // Cierra las otras
        $(idSeccion).slideToggle(); // Abre/Cierra la actual
    }

    $('#btn-depositar').click(() => desplegarSeccion('#section-depositar'));
    $('#btn-enviar').click(() => desplegarSeccion('#section-enviar'));
    $('#btn-historial').click(() => {
        renderizarHistorial();
        desplegarSeccion('#section-historial');
    });

    // 3. LÓGICA DE DEPÓSITO
    $('#confirmar-deposito').click(function() {
        let monto = parseFloat($('#input-deposito').val());
        if (monto > 0) {
            usuario.saldo += monto;
            actualizarDatos("Depósito", monto);
            $('#input-deposito').val('');
            alert("¡Depósito exitoso!");
        }
    });

    // 4. LÓGICA DE ENVÍO
    $('#confirmar-envio').click(function() {
        let monto = parseFloat($('#input-envio').val());
        if (monto > 0 && monto <= usuario.saldo) {
            usuario.saldo -= monto;
            actualizarDatos("Envío", -monto);
            $('#input-envio').val('');
            alert("Envío realizado.");
        } else {
            alert("Saldo insuficiente o monto inválido.");
        }
    });

    // FUNCIONES DE APOYO
    function actualizarDatos(tipo, monto) {
        // Guardar nuevo saldo
        localStorage.setItem('wallet_user', JSON.stringify(usuario));
        $('#saldo-monto').text(usuario.saldo.toLocaleString());

        // Guardar en historial
        let nuevoMov = { fecha: new Date().toLocaleDateString(), tipo: tipo, monto: monto };
        movimientos.unshift(nuevoMov);
        localStorage.setItem('wallet_movimientos', JSON.stringify(movimientos));
    }

    function renderizarHistorial() {
        let html = '';
        movimientos.forEach(m => {
            let color = m.monto > 0 ? 'text-success' : 'text-danger';
            html += `<tr><td>${m.fecha}</td><td>${m.tipo}</td><td class="${color}">$${m.monto}</td></tr>`;
        });
        $('#lista-movimientos').html(html || '<tr><td colspan="3">No hay movimientos</td></tr>');
    }
});