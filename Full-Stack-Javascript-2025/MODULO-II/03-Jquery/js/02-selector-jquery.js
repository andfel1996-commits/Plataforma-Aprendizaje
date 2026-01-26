// Detecta que el DOM este cargado
$(function(){
	/* 
	   ===========SELECTOR TIPO ID====================================
	   Para seleccionar el id 
	   primero usamos el simbolo $ que hace referencia al objeto jquery
	   y Luego seleccionamos al ID con un #
	*/
	$('#rojo').css({
		background: 'red',
		color: 'white',
		padding: '10px'
	});

	$('#amarillo').css({
		background: 'yellow',
		color: 'black',
		padding: '10px'
	});

	$('#verde').css({
		background: 'green',
		color: 'white',
		padding: '10px'
	});

	/* 
	  ============SELECTOR TIPO CLASE=================================
	  Para seleccionar una clase 
	  primero usamos el simbolo $ que hace referencia al objeto jquery 
	  y luego seleccionamos la clase con un punto
	*/

	let mi_clase = $('.zebra');
	/* 
	  El conole de la letiable me arroja un array,
	  podria seleccionar un elemento especifico del array, 
	  con los corchetes [n] arroja el contenido del indice del array.
	  console.log(mi_clase[0]).

	  Con eq(n), arroja el abjeto del array pero este lo muestra como otro
	  sub-array.

	  console.log(mi_clase.eq(1))
	*/

	//console.log(mi_clase);

	// $('.sin-borde').click(function(event) {
	// 	console.log('Clic dado');
	// 	$(this).addClass('zebra');
	// });

	/* 
	  ==============SELECTOR TIPO ETIQUETA==============================
	  Son lo mismo que seleccionar las clases, en este caso seleccionaremos
	  los parrafos a traves de una letiable, al igual que las clases esto es un array 
	  podemos seleccionar o recorrer cualquier objetos a través de su indice.
	*/

	let parrafo = $('p');
	parrafo.css({
		cursor: 'pointer'
	});
	//Ahora usamos el evento click a la letiable
	parrafo.click(function(event){
		// Al hacer click le quitaremos la clase zebra. pero se los quetaria a todos
		//$(this).removeClass('zebra');

		/*Como podemos solo quitar la clase Zebra
		 sólo a los elementos que tengan la clase zebra
		 Esto lo realizaremos con un hasclass
		*/
		// let that = $(this);

		// if(that.hasClass('zebra')){
		// 	console.log('Estas en Zebra');
		// 	that.addClass('grande');
		// }

		/*
		Podemos hacer otra cosa, por ejemplo que lo deje en grande 
		y en el segundo click lo saque o sea se alterne.
		*/

		let that = $(this);

		if(!that.hasClass('grande')){
			console.log('Estas en Zebra');
			that.addClass('grande');
		}else{
			that.removeClass('grande');
		}


	});

	/* 
	  ==============SELECTOR DEL TIPO ATRIBUTO=============================
	  Los selectores que son via atributo se hace a traves de corchetes [], Ejemplo
	  $('[title= "google"]')
	*/

	$('[title = "Google"]').css({
		background     : '#ccc',
		color          : '#000',
		decoration     : 'none',
		display        : 'block',
		padding        : '10px'
	});

    $('[title = "Facebook"]').css({
		background     : 'coral',
		color          : '#000',
		display        : 'block',
		padding        : '10px'
	});

	/* 
	  ==============METODO FIND Y PARENT =============================
		Esto nos permite recorrer dentro del DOM
	*/

	// Le podemos agregar a dos etiquetas la misma clase de la sgte forma.
	//$('p,a').addClass('margen-superior');

	/* 
	Pero podemos encontrar un objeto dentro del DOM a través del metodo find en este caso recorrio
	el id caja y encontro dos elementos con la clase resaltado.

	Ahora como puedo en la misma busqueda subir un nivel en la busqueda esto se hace a traves de 
	el metodo parent()
	*/

	let busqueda = $('#caja').find('.resaltado').eq(0).parent().parent().parent().parent().find('[title = "Google"]');
	busqueda.css({
		background: 'purple'
	});
	console.log(busqueda);


	// Estoy posicionado en el elemento con el ID #elemento2, luego salgo del elemento y llego a la clase resaltado
	let busquedaDos = $('#elemento2').parent().parent().find('.resaltado');
	console.log(busquedaDos);
	busquedaDos.css({
		'border-bottom': '2px solid red',
	});


});