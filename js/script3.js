jQuery(document).ready(function($) {

  $('#radio_box').change(function(){

    let seleccion = $("input[name='dificultad']:checked").val();
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
let palabraAleatoria;
let palabraJuego;
let guiones;
let letraUsada =[];
let arrayMono = ["mar","par","sol","rie","dos","tres"];
let arrayBis = ["cama", "mono", "cobre", "luna", "pala", "pila", "yoga", "viento", "cuatro", "diez", "doce"];
let arrayTri = ["Caracas", "pelota", "caracol","pilates", "nevera", "cocina"];
let arrayPoli = ["administracion", "programacion", "computacion", "precipitacion", "paralelogramo", "paralelepipedo", "hexagono"]
let imagenes = ["./img/base1.png","./img/base2.png","./img/base3.png","./img/base4.png","./img/base5.png","./img/base6.png","./img/base7.png"]

function crearPalabra(arr){
  palabraAleatoria = arr[parseInt(Math.random()*arr.length)];
  palabraJuego = palabraAleatoria.split('');
  guiones = [];
  console.log(palabraJuego);
  console.log(palabraAleatoria);
  for (let palabra of palabraJuego) {
    guiones.push(' _ ');
  }
  console.log(guiones);
}

function mostrarPalabra(){
  $('.reto').append(`<div class 'guiones'>${guiones.join(' ')}</div>`)
}
function eliminarMuestra(){
  $('.reto').hide()
}

$('#botonLetra').click(function() {
 let letraIngresada = $('#letraIngresada').val();
  for (let i = 0; i < palabraJuego.length; i++) {
    if (letraIngresada == palabraJuego[i]) {
      guiones[i] = palabraJuego[i].replace("_", `${letraIngresada}`)
    }
    
  }

  mostrarPalabra()
  letraUsada.push(letraIngresada);
  console.log(guiones);
  console.log(letraUsada);
});


})
