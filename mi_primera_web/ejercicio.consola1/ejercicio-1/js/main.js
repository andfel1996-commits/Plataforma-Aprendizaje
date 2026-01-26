// Creacion de nuevo usuario
$(document).ready(function () {
  $('#registerForm').submit(function (event) {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
      return;
    }
    // Aquí podrías agregar lógica para guardar el nuevo usuario
    alert('Usuario registrado exitosamente. Ahora puedes iniciar sesión.');

    window.location.href = './Menu.html';
  });
});
$(document).ready(function () {
  // Al hacer clic en el botón "Crear Cuenta"
  $('#btn-crear-cuenta').on('click', function (e) {
    e.preventDefault();

    // 1. Capturar los valores de los inputs
    const nombre = $('#reg-usuario').val() 
    const email = $('#reg-email').val() 
    const password = $('#reg-password').val() 

    // 2. Validación simple (que no estén vacíos)
    if (nombre === "" || email === "" || password === "") {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // 3. Crear el objeto del nuevo usuario
    const nuevoUsuario = {
      nombre: nombre,
      email: email,
      password: password,
      saldo: 0.00 // Iniciamos con saldo cero
    };

    // 4. GUARDAR EN LOCALSTORAGE
    // Guardamos el usuario
    localStorage.setItem('wallet_user', JSON.stringify(nuevoUsuario));

    // Inicializamos el historial de movimientos vacío para este usuario
    localStorage.setItem('wallet_movimientos', JSON.stringify([]));

    // 5. Feedback y limpieza
    alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");

    // Limpiar los campos
    $('#reg-usuario, #reg-email, #reg-password').val('');

    // Volver automáticamente a la pantalla de login
    $('#register-block').hide();
    $('#login-block').fadeIn();
  });
});

$(document).ready(function () {

  // Al presionar "Registrarse"
  $('#registerform').on('click', function (e) {
    e.preventDefault(); // Evita que la página recargue si es un <a>

    $('#login-block').hide();          // Escondemos el login
    $('#register-block').fadeIn();     // Aparece el bloque de registro con efecto suave
  });

  // Al presionar "Volver"
  $('#btn-back-login').on('click', function (e) {
    e.preventDefault();

    $('#register-block').hide();       // Escondemos el registro
    $('#login-block').fadeIn();        // Volvemos a mostrar el login
  });

});

$(document).ready(function () {
  // Al hacer clic en el botón "Iniciar Sesión"
  $('#loginForm').submit(function (event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();
    // Obtener el usuario almacenado en localStorage
    const dataOriginal = localStorage.getItem('wallet_user');
    if (!dataOriginal) {
      alert('No hay usuarios registrados. Por favor, crea una cuenta primero.');
      return;
    }

    const usuarioGuardado = JSON.parse(localStorage.getItem('wallet_user'));
    if (usuarioGuardado && usuarioGuardado.email === email && usuarioGuardado.password === password) {
      alert('Inicio de sesión exitoso. ¡Bienvenido de nuevo!');
      // Redirigir al menú principal
      window.location.href = 'menu.html';
    } else {
      alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
  });
});