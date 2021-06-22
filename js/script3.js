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


//----------------Seleccionar dificultad ----------------------//
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


//----------------Crear juego---------------//
function crearPalabra(arr){
  palabraAleatoria = arr[parseInt(Math.random()*arr.length)].toUpperCase();
  palabraJuego = palabraAleatoria.split('');
  guiones = [];
  for (let palabra of palabraJuego) {
    guiones.push('_');
  }
}


function mostrarPalabra(){
  $('.reto').append(`<div class 'guiones'>${guiones.join(' ')}</div>`)
}

function errorLetra(letraIngresada){
  letraIngresada = $('#letraIngresada').val();
  if (letraUsada.includes(letraIngresada)) {
    alert(`Ya usaste la letra ${letraIngresada}`);
  }
  else if (!palabraJuego.includes(letraIngresada)) {
    $('#img_juego').attr('src', `${imagenes[intentoErroneo]}`);
    ++intentoErroneo;
    ++intento;
    letraUsada.push(letraIngresada);
    $('.letrasUsadas').append(`<p class="usadas"> - ${letraIngresada} </p>`);
    $('.intentosTotales').html(`<p class="intentosTotales">Intentos: ${intento}</p>`);
    $('.intentosErroneos').html(`<p class="intentosErroneos">Intentos Erróneos: ${intentoErroneo}</p>`);
  }else {
    ++intentoAcertado;
    ++intento;
    $('.intentosAcertados').html(`<p class="intentosAcertados">Intentos Acertados: ${intentoAcertado}</p>`)
    $('.letrasUsadas').append(`<p class="usadas"> - ${letraIngresada} </p>`);
    letraUsada.push(letraIngresada);
  }
}

//-----------------------Finalizar juego------------------//

function finalizarJuego(){
    if (!guiones.includes('_')==true) {
      alert("ganaste");
      setTimeout(recargarPagina(), 3000);
    }else if (intentoErroneo >= 7) {
      alert(`perdiste, la palabra era: ${palabraAleatoria}`);
      setTimeout(recargarPagina(), 5000);
    }
}
function recargarPagina(){
  window.location.reload(true);
}


//----------------Comprobar-------------------------//
$('#botonLetra').click(function() {
  letraIngresada = $('#letraIngresada').val();
  for (let i = 0; i < palabraJuego.length; i++) {
    if (letraIngresada == palabraJuego[i]) {
      guiones[i] = palabraJuego[i].replace("_", `${letraIngresada}`)
    }
    $('.reto').html(`<div class 'guiones'>${guiones.join(' ')}</div>`)
  }
  errorLetra(letraIngresada)
  finalizarJuego()


  let valorIngresado = $('intento');
  let imagen = $('.premio');

  const url = `https://rickandmortyapi.com/api/character`;

      fetch(`${url}/${intento}`)
          .then(res => {
            return res.json();
          })
          .then(data => {
            if (palabraJuego.includes(letraIngresada)) {
              data.id = intento;
              imagen.append(`  <div class="premio1">
                                <p>${data.name}</p>
                                <img src="${data.image}">
                                <p>${data.gender}</p></div>`)
            }
          })
          .catch(err => {console.log(err);})
  });
})
