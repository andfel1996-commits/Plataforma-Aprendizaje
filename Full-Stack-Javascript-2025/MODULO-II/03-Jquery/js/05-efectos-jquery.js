// Detecta que el DOM esté cargado
$(function () {
  /* 
    =========== EFECTOS JQUERY ====================================
    Uso de show() hide() fadeIn() fadeOut() fadeTo() slideToggle() animate()
  */

  // Cacheamos selectores (mejor rendimiento y código más limpio)
  const caja = $('#cajaCard');
  const mostrar = $('#mostrar');
  const ocultar = $('#ocultar');
  const mostrarOcultar = $('#mostrarOcultar');
  const animarCaja = $('#animarCaja');
  const cajaAnimar = $('#cajaAnimar');

  // Estado inicial
  caja.hide();
  ocultar.hide(); // (Ojo: tu lógica de mostrar/ocultar está comentada, pero lo dejo igual)

  // Flag para bloquear la animación cuando ya está corriendo
  let animando = false;

  // Mostrar / Ocultar con slideToggle (extra: evita cola si spamean click)
  mostrarOcultar.on('click', function () {
    const that = $(this);

    // Si la caja está animándose, ignoramos el click (evita “colas”)
    if (caja.is(':animated')) return;

    if (that.hasClass('ocultar')) {
      that.text('Ocultar');
      that.removeClass('ocultar');
    } else {
      that.text('Mostrar');
      that.addClass('ocultar');
    }

    // stop(true,true) corta animación actual y salta al final.
    // Si prefieres solo evitar cola, puedes usar stop(true,false).
    caja.stop(true, true).slideToggle('slow');
  });

  // Animación de caja (evita múltiples ejecuciones por muchos clicks)
  animarCaja.on('click', function () {
    // Opción A: bloquear por flag
    if (animando) return;

    // Opción B adicional (por si algo externo anima el elemento):
    if (cajaAnimar.is(':animated')) return;

    animando = true;

    // Limpia cualquier cola previa por seguridad
    cajaAnimar.stop(true, false);

    cajaAnimar
      .animate(
        { marginLeft: '500px' },
        'slow',
        function () {
          console.log('Animación completada 1');
        }
      )
      .animate(
        { marginTop: '100px' },
        'fast',
        function () {
          console.log('Animación completada 2');
        }
      )
      .animate(
        { marginLeft: '0', marginTop: '100px' },
        'fast',
        function () {
          console.log('Animación completada 3');
        }
      )
      .animate(
        { marginLeft: '0', marginTop: '0px' },
        'fast',
        function () {
          console.log('Animación completada 4');

          // Importante: liberamos el bloqueo AL FINAL
          animando = false;
        }
      );
  });
});
