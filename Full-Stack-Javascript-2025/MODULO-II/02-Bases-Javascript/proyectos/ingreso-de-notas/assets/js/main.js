var htmlNotaUno = +prompt('Ingrese nota 1 HTML','1.0'),
htmlNotaDos = +prompt('Ingrese nota 2 HTML','1.0'),
htmlNotaTres = +prompt('Ingrese nota 3 HTML','1.0')

var idHtmlNotaUno = document.getElementById('htmlNotaUno'),
    idHtmlNotaDos = document.getElementById('htmlNotaDos'),
    idHtmlNotaTres = document.getElementById('htmlNotaTres'),
    idPromedioHtmlNotas = document.getElementById('promedioHtmlNotas')
  
    idHtmlNotaUno.innerHTML = htmlNotaUno;
    idHtmlNotaDos.innerHTML = htmlNotaDos;
    idHtmlNotaTres.innerHTML  = htmlNotaTres;


    console.log('Nota 1--->', htmlNotaUno );
    console.log('Nota 2--->', htmlNotaDos );
    console.log('Nota 3--->', htmlNotaTres );

    var promedio = ( htmlNotaUno+htmlNotaDos+htmlNotaTres ) / 3 ;
    console.log('Salida de promedio-->', promedio)

    // idPromedioHtmlNotas.innerHTML = ( ( ( htmlNotaUno+htmlNotaDos+htmlNotaTres ) / 3 ).toFixed(2) );