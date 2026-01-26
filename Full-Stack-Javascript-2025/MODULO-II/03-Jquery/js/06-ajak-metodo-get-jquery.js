// 07-ajak-metodo-get-jquery.js
// Detecta que el DOM esté cargado
$(function () {

  /*
    =============================== AJAX (GET) con jQuery ===============================
    - AJAX: pedir datos a una URL (API) sin recargar la página.
    - GET: trae datos.
    - Pintamos datos con append() dentro de #loadAjak y #loadAjakDos
  */

  // ============================================================================
  // 1) $.get() → API ReqRes (usuarios)
  // ============================================================================
  let reqresUrl = "https://dummyjson.com/users?limit=10";

  $.get(reqresUrl, function (response) {
	console.log('Salida de data-->', response.users )
    // Validación simple por si la API no responde como esperamos
    if (!response || !response.users) {
      $("#loadAjak").html("<p>No se encontraron datos.</p>");
      return;
    }

    response.users.forEach(function (user, index) {
      $("#loadAjak").append(
        "<p class='mb-2'>" + (index + 1) + ") " + user.firstName + " " + user.lastName + "</p>"
      );
    });

    console.log("Respuesta ReqRes:", response);

  }).fail(function () {
    $("#loadAjak").html("<p class='text-danger'>Error al cargar usuarios.</p>");
  });


  // ============================================================================
  // 2) $.ajax() → PokeAPI (GET) + for() para pintar sprites
  // ============================================================================
  let pokeListUrl = "https://pokeapi.co/api/v2/pokemon?limit=20";
  let totalPokemons = 807; // baja este número si quieres que cargue más rápido

  $.ajax({
    url: pokeListUrl,
    type: "GET",
    dataType: "json"
  })
    .done(function (results) {

      console.log("Respuesta PokeAPI (lista):", results);

      // Pintamos imágenes con for() clásico
      for (let i = 1; i <= totalPokemons; i++) {
        $("#loadAjakDos").append(
          "<img class='pokemon m-1' " +
          "alt='Pokemon " + i + "' " +
          "src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + i + ".png'/>"
        );
      }

    })
    .fail(function () {
      alert("Lo sentimos, ha ocurrido un error :(");
    });

});
