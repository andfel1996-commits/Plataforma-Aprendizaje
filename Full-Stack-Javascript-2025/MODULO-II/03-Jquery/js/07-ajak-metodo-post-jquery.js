// 08-ajak-metodo-post-jquery.js
$(function () {

  /*
    ============================
    AJAX con jQuery (GET y POST)
    ============================
    GET  -> traer datos (listar)
    POST -> enviar datos (crear)
  */

  let $loadAjak = $("#loadAjak");
  let $btnCargar = $("#btnCargarUsuarios");

  let $form = $("#envioDatos");
  let $name = $("#name");
  let $web = $("#web");
  let $btnEnviar = $("#btnEnviar");

  let $msg = $("#msg");

  let isSending = false; // evita doble envío por muchos clics

  // -----------------------------
  // Helpers (mensajes)
  // -----------------------------
  function showMsg(text, type) {
    // type: success | danger | info | warning
    $msg
      .removeClass("d-none alert-success alert-danger alert-info alert-warning")
      .addClass("alert-" + type)
      .text(text);
  }

  function hideMsg() {
    $msg.addClass("d-none").text("");
  }

  // -----------------------------
  // 1) GET: Cargar usuarios
  // -----------------------------
  function cargarUsuarios() {
    hideMsg();
    $loadAjak.html("<p>Cargando usuarios...</p>");

    let url = "https://jsonplaceholder.typicode.com/users";

    $.getJSON(url)
      .done(function (users) {

        // users es un array
        if (!users || users.length === 0) {
          $loadAjak.html("<p>No hay usuarios para mostrar.</p>");
          return;
        }

        // Limpio y pinto
        $loadAjak.empty();

        users.forEach(function (u, index) {
          $loadAjak.append(
            "<p class='mb-2'><strong>" +
              (index + 1) + ".</strong> " +
              u.name +
              " <br><small class='text-muted'>" + u.website + "</small></p>"
          );
        });

        console.log("GET usuarios OK:", users);
      })
      .fail(function () {
        $loadAjak.html("<p class='text-danger'>Error al cargar usuarios.</p>");
      });
  }

  // Cargar al hacer click (más pedagógico que automático)
  $btnCargar.on("click", function () {
    cargarUsuarios();
  });

  // -----------------------------
  // 2) POST: Enviar datos del form
  // -----------------------------
  $form.on("submit", function (event) {
    event.preventDefault();

    if (isSending) return; // evita doble submit

    let nameVal = $name.val().trim();
    let webVal = $web.val().trim();

    // Validación simple (sin confundir con cosas avanzadas)
    if (!nameVal || !webVal) {
      showMsg("Completa nombre y web antes de enviar.", "warning");
      return;
    }

    isSending = true;
    $btnEnviar.prop("disabled", true).text("Enviando...");

    showMsg("Enviando datos al servidor (POST)...", "info");

    // Armamos el objeto a enviar (payload)
    let payload = {
      name: nameVal,
      web: webVal
    };

    $.ajax({
      url: $form.attr("action"),
      type: "POST",
      dataType: "json",
      data: payload,
      timeout: 5000
    })
      .done(function (response) {
        console.log("POST OK:", response);

        showMsg("¡Enviado correctamente! Revisa la consola para ver la respuesta.", "success");

        // Limpio inputs
        $name.val("");
        $web.val("");
      })
      .fail(function () {
        showMsg("Ocurrió un error al enviar (POST).", "danger");
      })
      .always(function () {
        isSending = false;
        $btnEnviar.prop("disabled", false).text("Enviar");
      });
  });

});
