$(document).ready(function() {
    let user = JSON.parse(localStorage.getItem('wallet_user'));
    
    $('#formFondos').submit(function(e) {
        e.preventDefault();
        const monto = parseFloat($('#monto').val());
        const tipo = $('#tipoOperacion').val(); // "deposito" o "retiro"
        
        if (tipo === "retiro" && monto > user.saldo) {
            alert("Saldo insuficiente");
            return;
        }

        user.saldo = (tipo === "deposito") ? user.saldo + monto : user.saldo - monto;
        
        // Guardar cambios
        localStorage.setItem('wallet_user', JSON.stringify(user));
        
        // Registrar en historial
        let movs = JSON.parse(localStorage.getItem('wallet_movimientos'));
        movs.push({
            fecha: new Date().toLocaleString(),
            tipo: tipo,
            monto: monto,
            desc: tipo === "deposito" ? "Depósito de fondos" : "Retiro de efectivo"
        });
        localStorage.setItem('wallet_movimientos', JSON.stringify(movs));

        alert("Operación exitosa");
        window.location.href = 'menu.html';
    });
});