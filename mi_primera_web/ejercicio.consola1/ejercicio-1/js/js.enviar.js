$('#contact-list').on('click'), '.contact-item', function () {
    const nombre = $(this).data('name');
    const alias = $(this).data('alias');
if (monto <= user.saldo) {
    user.saldo -= monto;
    localStorage.setItem('wallet_user', JSON.stringify(user));

    let movs = JSON.parse(localStorage.getItem('wallet_movimientos'));
    movs.push({
        fecha: new Date().toLocaleString(),
        tipo: "envio",
        monto: monto,
        desc: `Envío a cuenta: ${destinatario}`
    });
    localStorage.setItem('wallet_movimientos', JSON.stringify(movs));

    alert("Transferencia enviada");
    window.location.href = 'menu.html';
} else {
    alert("Saldo insuficiente para enviar"); }
} 
$(document).ready(function() {
    $('#form-enviar').submit(function(e) {
        e.preventDefault();

        const montoAEnviar = parseFloat($('#monto-input').val());
        let usuario = JSON.parse(localStorage.getItem('wallet_user'));
        let historial = JSON.parse(localStorage.getItem('wallet_movimientos')) || [];

        // Validación de saldo
        if (montoAEnviar > usuario.saldo) {
            alert("Saldo insuficiente");
            return;
        }

        // 1. Actualizar Saldo del Usuario
        usuario.saldo -= montoAEnviar;
        localStorage.setItem('wallet_user', JSON.stringify(usuario));

        // 2. Registrar en el Historial
        const nuevoMovimiento = {
            id: "TR-" + Math.floor(Math.random() * 10000),
            fecha: new Date().toLocaleDateString(),
            desc: "Envío de dinero",
            tipo: "Envío",
            monto: -montoAEnviar // Negativo porque es egreso
        };
        
        historial.unshift(nuevoMovimiento);
        localStorage.setItem('wallet_movimientos', JSON.stringify(historial));

        alert("Envío realizado con éxito");
        window.location.href = 'menu.html'; // Volver al menú para ver el nuevo saldo
    });
});