jQuery(document).ready(function($) {

  let palabraAleatoria;
  let palabraJuego;
  let guiones = [];
  let letraUsada =[];
  let arrayMono = ["mar","par","sol","rie","dos","tres", "uno", "paz", "pez", "hoy", "cruz", "mal", "mes", "fax", "pie", "gris", "zen", "tos", "bar"];
  let arrayBis = ["cama", "mono", "cobre", "luna", "pala", "pila", "yoga", "viento", "cuatro", "diez", "doce", "alto", "amor", "baile", "bosque", "collar", "letal", "mortal", "veraz", "zanja", "verdad", "tomar", "tiempo", "rumor", "renta"];
  let arrayTri = ["Caracas", "pelota", "caracol","pilates", "nevera", "cocina", "aceptar", "asunto", "camino", "canela", "capataz", "corneta", "ejemplo", "efecto", "historia", "humano", "ultramar", "tomate", "sistema", "respeto", "picante"];
  let arrayPoli = ["administracion", "programacion", "computacion", "precipitacion", "paralelogramo", "paralelepipedo", "hexagono", "monasterio", "jabalina", "herramienta", "tranquilidad", "extranjero", "monasterio", "mantequilla", "archivador", "mandamiento", "capacidad"]
  let imagenes = ["","./img/base1.png","./img/base2.png","./img/base3.png","./img/base4.png","./img/base5.png","./img/base6.png","./img/base7.png"]
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
  $('#radio_box').hide('10000');
}

let numAzar;
function numeroAzar(){
  numAzar = parseInt(Math.random()*50)+1
}


function mostrarPalabra(){
  $('.reto').append(`<div class 'guiones'>${guiones.join(' ')}</div>`)
}

function errorLetra(letraIngresada){
  letraIngresada = $('#letraIngresada').val();
  if(validarCampo() == false){
    alert("Debes ingresar una letra");
  }
  else if (letraUsada.includes(letraIngresada)) {
    alert(`Ya usaste la letra ${letraIngresada}`);
  }else if (!palabraJuego.includes(letraIngresada)) {
    intentoErroneo = intentoErroneo + 1;
    $('.intentosErroneos').html(`<p class="intentosErroneos">Intentos Erróneos: ${intentoErroneo}</p>`);
    ++intento;
    $('.intentosTotales').html(`<p class="intentosTotales">Intentos: ${intento}</p>`);
    letraUsada.push(letraIngresada);
    $('.letrasUsadas').append(`<p class="usadas"> - ${letraIngresada} </p>`);
    $('#img_juego').attr('src', `${imagenes[intentoErroneo]}`);
  }else {
    ++intentoAcertado;
    $('.intentosAcertados').html(`<p class="intentosAcertados">Intentos Acertados: ${intentoAcertado}</p>`)
    ++intento;
    $('.letrasUsadas').append(`<p class="usadas"> - ${letraIngresada} </p>`);
    letraUsada.push(letraIngresada);
  }

}
//-----------------------Finalizar juego------------------//
function finalizarJuego(){
    if (!guiones.includes('_')==true) {
      alert("ganaste");
      recargarPagina();
    }else if (intentoErroneo == 7) {
      alert(`perdiste, la palabra era: ${palabraAleatoria}`);
      recargarPagina();
    }
}
//------------------ Varios------------------------------//
function recargarPagina(){
  window.location.reload(true);
}

function formatoInput(){
  $('#letraIngresada').trigger('focus');
  $('#letraIngresada').val("")
}
//------------------------------Validar input------------------------//

function validarCampo(){
  letraIngresada = $('#letraIngresada').val();
  let pattern = new RegExp('^[A-ZÑ]+$');
  if (!pattern.test(letraIngresada) || !letraIngresada || letraIngresada == "") {
    return false;
  }
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
    numeroAzar()
    formatoInput()
    setTimeout(finalizarJuego, 1000)

  // let valorIngresado = $('intento');
  // let imagen = $('.premio');
  //
  // const url = `https://rickandmortyapi.com/api/character`;
  //
  //     fetch(`${url}/${numAzar}`)
  //         .then(res => {
  //           return res.json();
  //         })
  //         .then(data => {
  //           if (letraUsada.includes(letraIngresada)) {
  //             continue;
  //           }
  //           else if (palabraJuego.includes(letraIngresada)) {
  //             data.id = intento;
  //             imagen.append(`<div class="premio1">
  //                               <p>${data.name}</p>
  //                               <img src="${data.image}">
  //                               <p>${data.gender}</p></div>`)
  //           }
  //         })
  //         .catch(err => {console.log(err)})
   });

})
