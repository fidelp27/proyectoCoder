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
      ocultarInicio()
    }else if (seleccion == 2) {
      crearPalabra(arrayBis)
      ocultarInicio()
    }else if (seleccion == 3) {
      crearPalabra(arrayTri)
      ocultarInicio()
    }else if (seleccion == 4) {
      crearPalabra(arrayPoli)
      ocultarInicio()
    }else {
      swal.fire({
        icon: "warning",
        title: "Debes seleccionar una opción",
        text: "Se reinciará el juego"});
      setTimeout(recargarPagina_ahorcado,1000);
    }
    mostrarPalabra()
  }

);
function ocultarInicio(){
  $('.intentos_num').hide();
  $('.form_ahorcado').fadeOut();
  $('.container_ahorcado .containter_rigth').removeClass('containter_rigth');
}

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
    swal.fire({
      icon: "warning",
      title: "Debes seleccionar una letra"
    });

  }
  else if (letraUsada.includes(letraIngresada)) {
    swal.fire({
      icon: "warning",
      title: `Ya usaste la letra ${letraIngresada}`
    });
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
      swal.fire({
        icon: "success",
        title: "GANASTE",
        text: "Salvaste al Z"
      });

      recargarPagina_ahorcado();
    }else if (intentoErroneo == 7) {
      swal.fire({
        icon: "error",
        title: "PERDISTE",
        text: `La palabra era: ${palabraAleatoria}`
      });
      setTimeout(recargarPagina_ahorcado,2000)
    }
}
//------------------ Varios------------------------------//
function recargarPagina_ahorcado(){
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
   });

})
