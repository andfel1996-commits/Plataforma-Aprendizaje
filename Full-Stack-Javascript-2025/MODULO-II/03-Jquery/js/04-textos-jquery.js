// Detecta que el DOM esté cargado
$(function () {

  /*
    =============== TEXTOS jQuery ==============================
    Objetivo:
    1) Tomar el href de cada enlace del menú
    2) Poner ese href como texto del <a>
    3) Abrir enlaces en una nueva pestaña (target="_blank")
    4) Permitir agregar enlaces desde un input
  */

  // -----------------------------
  // Referencias (cache de selectores)
  // -----------------------------
  let $menu = $("#menu");
  let $input = $("#nombreEnlace");
  let $btn = $("#addEnlace");

  // Placeholder inicial
  setPlaceholder("Ingrese una URL");

  // Pintamos los enlaces existentes al iniciar
  cargarEnlacesDelMenu();


  // -----------------------------
  // Evento: click en "Agregar"
  // -----------------------------
  $btn.on("click", function (event) {
    event.preventDefault(); // por si el botón está dentro de un <form>

    let url = $input.val().trim(); // trim() elimina espacios al inicio/fin

    // Validación mínima: que tenga largo y que parezca URL
    if (url.length < 5) {
      setPlaceholder("Ingrese una URL válida");
      return;
    }

    // Si el alumno escribe "google.com", le agregamos https://
    // (evita enlaces rotos por faltar protocolo)
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    // Creamos el <li><a></a></li> con jQuery (más limpio que concatenar strings)
    let $li = $("<li>");
    let $a = $("<a>", {
      href: url,
      text: url,
      target: "_blank",
      rel: "noopener noreferrer" // buena práctica al abrir en otra pestaña
    });

    $li.append($a);
    $menu.append($li);

    // Limpieza de input + placeholder
    $input.val("");
    setPlaceholder("Ingrese una URL");

    // Actualizo enlaces del menú (por si quieres asegurar reglas)
    cargarEnlacesDelMenu();
  });


  // -----------------------------
  // UX del input (focus / blur)
  // -----------------------------
  $input.on("focus", function () {
    setPlaceholder("");
  });

  $input.on("blur", function () {
    if ($input.val().trim().length === 0) {
      setPlaceholder("Ingrese una URL");
    }
  });


  // -----------------------------
  // Funciones
  // -----------------------------
  function setPlaceholder(texto) {
    $input.attr("placeholder", texto);
  }

  function cargarEnlacesDelMenu() {
    // OJO: Antes usabas $('a') → eso afecta TODOS los enlaces del documento
    // Aquí solo trabajamos con los enlaces dentro del menú
    $menu.find("a").each(function (index, element) {
      let $a = $(element);
      let href = $a.attr("href");

      // Si no tiene href, no hacemos nada (evita errores)
      if (!href) return;

      $a.text(href);
      $a.attr("target", "_blank");
      $a.attr("rel", "noopener noreferrer");
    });

    // Cantidad de enlaces SOLO del menú
    console.log("Enlaces en el menú:", $menu.find("a").length);
  }

});
