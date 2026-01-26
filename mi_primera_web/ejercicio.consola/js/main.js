$(document).ready(function () {

    // --- LÓGICA DE LOGIN ---
    // Seleccionamos el botón de ingresar que está dentro del bloque de login
    $('#login-block').on('click', function (e) {
        e.preventDefault();
        console.log("Intentando iniciar sesión...");
        const correo = $('#loginEmail').val();
        const clave = $('#loginPassword').val();
        
        const usuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
        const usuarioEncontrado = usuarios.find(u => u.email === correo && u.password === clave);

        if (usuarioEncontrado) {
            localStorage.setItem('usuario_sesion_activa', correo);
            window.location.href = 'menu.html';
        } else {
            alert('Correo o contraseña incorrectos. Verifica que te hayas registrado primero.');
        }
    });

    // --- LÓGICA DE REGISTRO ---
    $('#btn-crear-cuenta').on('click', function (e) {
        e.preventDefault();
        
        const n = $('#reg-nombre').val();
        const e_mail = $('#reg-email').val();
        const p = $('#reg-password').val();

        if (!n || !e_mail || !p) {
            alert("Completa todos los campos para registrarte");
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem('usuarios_registrados')) || [];
        usuarios.push({ nombre: n, email: e_mail, password: p, saldo: 0, movimientos: [] });
        
        localStorage.setItem('usuarios_registrados', JSON.stringify(usuarios));
        alert("¡Registro exitoso! Ahora intenta iniciar sesión.");
        
        // Volver al login
        $('#register-block').hide();
        $('#login-block').show();
    });

    // --- CAMBIO DE VISTAS ---
    $('#registerform').on('click', function (e) {
        e.preventDefault();
        $('#login-block').hide();
        $('#register-block').fadeIn();
    });

    $('#btn-back-login').on('click', function (e) {
        e.preventDefault();
        $('#register-block').hide();
        $('#login-block').fadeIn();
    });
});