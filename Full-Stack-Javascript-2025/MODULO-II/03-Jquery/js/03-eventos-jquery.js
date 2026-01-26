// Detecta que el DOM este cargado
$(function(){
/* 
   ===========EVENTOS JQUERY====================================

*/
	let caja = $('#caja');
	/*
	// Evento mouseover
	caja.mouseover(function(event) {
		$(this).css({
			background: 'orange'
		});
	});

    // Evento mouseout
	caja.mouseout(function(event) {
		$(this).css({
			background: 'purple'
		});
	});
	*/

	// Evento Hover, contiene dos call back anteriores
	/*
	caja.hover(function() {
		$(this).css({
			background: 'orange'
		});
	}, function() {
		$(this).css({
			background: 'purple'
		});
	});
	*/

	// Forma mejorada a través de parametros de las funciones
	function eventOrange() {
		$(this).css({
			background: 'orange'
		});
	}

	function eventPurple() {
		$(this).css({
			background: 'purple'
		});
	}

	caja.hover(eventOrange,eventPurple);

	//EVENTO CLICK Y DOBLE CLICK (DBL)
	caja.click(function(event) {
		$(this).css({
			background: 'blue',
			color: 'white'
		});
	});

	caja.dblclick(function(event) {
		$(this).css({
			background: 'pink',
			color: 'black'
		});
	});

	// EVENTO FOCUS
	let nombre  = $('#nombre');
	let mensaje = $('.alert-secondary');

	nombre.focus(function(event) {
		$(this).css({
			border: '1px solid red',
			'box-shadow': 'none'
		});
	});

	nombre.blur(function(event) {
		$(this).css({
			border: '1px solid #acacac'
		});
		mensaje.text($(this).val()).show();
	});

	// MOUSEDOWN / MOUSEUP
	mensaje.mousedown(function(event) {
		mensaje.css({
		'color': '#383d41',
	    'background-color': '#e2e3e5',
	    'border-color': '#d6d8db'
		});
	});

	mensaje.mouseup(function(event) {
		mensaje.css({
		'color': '#721c24',
        'background-color': '#f8d7da',
        'border-color': '#f5c6cb'
		});
	});

	// MOUSEMOV

	$(document).mousemove(function(event) {
		console.log('En X: '+event.clientX);
		console.log('En Y: '+event.clientY);
		$('body').css({
			cursor: 'none'
		});
		$('.circle').css({
			left: event.clientX,
			top : event.clientY
		});
	});









});