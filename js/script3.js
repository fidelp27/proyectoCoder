jQuery(document).ready(function($) {

  let palabraAleatoria;
  let palabraJuego;
  let guiones = [];
  let letraUsada =[];
  let arrayMono = ["mar","par","sol","rie","dos","tres"];
  let arrayBis = ["cama", "mono", "cobre", "luna", "pala", "pila", "yoga", "viento", "cuatro", "diez", "doce"];
  let arrayTri = ["Caracas", "pelota", "caracol","pilates", "nevera", "cocina"];
  let arrayPoli = ["administracion", "programacion", "computacion", "precipitacion", "paralelogramo", "paralelepipedo", "hexagono"]
  let imagenes = ["./img/base1.png","./img/base2.png","./img/base3.png","./img/base4.png","./img/base5.png","./img/base6.png","./img/base7.png"]
  let contador = 0;
  let intento = 0;
  let intentoErroneo=0;
  let intentoAcertado=0;
  let letraIngresada;


  $('#radio_box').change(function(){


    let seleccion = $("input[name='dificultad']:checked").val();
    $('.intentosTotales').html(`<p class="intentosTotales">Intentos: 1 </p>`)

    if (seleccion == 1 ) {
      crearPalabra(arrayMono)

    }else if (seleccion == 2) {
      crearPalabra(arrayBis)

    }else if (seleccion == 3) {
      crearPalabra(arrayTri)

    }else if (seleccion == 4) {
      crearPalabra(arrayPoli)

    }else {
      console.log("Selecciona una opción");
    }
    mostrarPalabra()
  }

);

function crearPalabra(arr){
  palabraAleatoria = arr[parseInt(Math.random()*arr.length)].toUpperCase();
  console.log(palabraAleatoria);
  palabraJuego = palabraAleatoria.split('');
  console.log(palabraJuego);
  guiones = [];
  for (let palabra of palabraJuego) {
    guiones.push('_');
  }
  console.log(guiones.length)
}


function mostrarPalabra(){
  $('.reto').append(`<div class 'guiones'>${guiones.join(' ')}</div>`)

}

function errorLetra(letraIngresada){
  if (!palabraJuego.includes(letraIngresada)) {
    $('#img_juego').attr('src', `${imagenes[intentoErroneo]}`);

    ++intentoErroneo;
    $('.intentosTotales').html(`<p class="intentosTotales">Intentos: ${intento}</p>`)
    $('.intentosErroneos').html(`<p class="intentosErroneos">Intentos Erróneos: ${intentoErroneo}</p>`)
  }else {
    ++intentoAcertado;
    $('.intentosAcertados').html(`<p class="intentosAcertados">Intentos Acertados: ${intentoAcertado}</p>`)
  }
}

function finalizarJuego(){
    if (!guiones.includes('_')==true) {
      console.log("ganaste");
      efectoError()
    }else if (intentoErroneo >= 7) {
      console.log(`perdiste, la palabra era: ${palabraAleatoria}`);
    }else {
      console.log("Sigue jugando");
    }
      console.log(guiones.length)
      console.log(!guiones.includes('_'));
      console.log(guiones.includes('_'));
}
function efectoError(){
  $('letraIngresada').animate({'top': '5px'}, slow)
  $('letraIngresada').animate({'bottom': '10px'}, fast)
  $('letraIngresada').animate({'top': '5px'}, slow)
  $('letraIngresada').animate({'bottom': '10px'}, fast)
}
$('#botonLetra').click(function() {

  letraIngresada = $('#letraIngresada').val();
  $('.letrasUsadas').append(`<p class="usadas"> - ${letraIngresada} </p>`);

  $('.reto').fadeOut('slow', function() {
    $('.reto').fadeIn('800', function() {
        $('.reto').animate({fontSize: '10px', opacity: '0.4'}, "fast", function(){
            $('.reto').css('background', '#f8a2a4', 1000);
        });
        $('.reto').animate({fontSize: '20px', opacity: '0.6'}, "fast", function(){
            $('.reto').css('background', '#a2f8a4', 1000);
        });

        $('.reto').animate({fontSize: '30px', opacity: '0.8'}, "slow", function(){
          $('.reto').css('background', '#5599fd', 1000);
        });

        $('.reto').animate({fontSize: '40px', opacity: '1'}, "slow", function(){
          $('.reto').css('background', '#6645fg',1000);
        });

        $('.reto').animate({fontSize: '20px', opacity: '1'}, "slow", function(){
          $('.reto').css('background', '#ffffff',1000);
        });
    });
  });

  ++intento;
  for (let i = 0; i < palabraJuego.length; i++) {
    if (letraIngresada == palabraJuego[i]) {
      guiones[i] = palabraJuego[i].replace("_", `${letraIngresada}`)
    }
    console.log("prueba 1: " + !guiones.includes('_'));
  }
  $('.reto').html(`<div class 'guiones'>${guiones.join(' ')}</div>`)
  letraUsada.push(letraIngresada);
  errorLetra(letraIngresada)
  console.log(guiones);
  console.log("prueba 2: " + !guiones.includes('_'));
  finalizarJuego()
  console.log(guiones.length)
});

})
