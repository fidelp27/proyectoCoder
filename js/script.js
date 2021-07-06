//--------------------------header Parallax-----------------///
jQuery(document).ready(function($) {
  $('.astro1').hide();
  $('.titulo-cap h1').hide()

  $(window).scroll(function() {
    console.log(window.scrollY);
    const scroll = $(window).scrollTop();
    const scrollY = $(window).scrollY;

    $('.astro1').show();
    $('.titulo-cap h1').show()
    if (scroll <= 70) {
      $('.astro1').css({
        width: scroll*5+'px',
        height: scroll*5 +'px',
      })
      $('.titulo-cap h1').css({
        height: scroll*2 +'px',
        fontSize: scroll*0.07 +'rem',
      });
    }
});
});
//--------------------------Variables-------------------------------//
let num1;
let num2;
let resultadoSuma;
let resultadoResta;
let puntaje = [];
let contador_suma = [];
let contador_resta = [];
let bg;
let sumContador;
let sumaPuntos;
let mensaje = document.querySelector('.mensaje');
let resultadoIngresado1;
let resultadoIngresado2;
let operacion_suma = document.querySelector('.operacion_suma').innerHTML;
let operacion_resta = document.querySelector('.operacion_resta').innerHTML;
let countDownGame = 20;
let intervalo;
mensaje.style.display = "none"
let facil = document.getElementById('suma_facil');
let dificil = document.getElementById('suma_dificil');
let boton_inicio = document.querySelector('.comenzar');
let boton_iniciar = document.querySelector('.iniciar')
let boton_iniciar2 = document.querySelector('.iniciar2')
let turnos_suma = document.querySelector('#turno_suma');
let aciertos = [];
let sumaAciertos;
let container_derecho = document.querySelector('.containter_rigth')
let opciones = document.getElementsByClassName('opciones');

//----------------------------Funciones---------------------------------//
boton_inicio.addEventListener('click', crearJuego)
boton_iniciar.addEventListener('click', mostrar)
boton_iniciar2.addEventListener('click', mostrar)
function crearJuego(){
  if (facil.checked) {
    crearOperacion();
    intentos();
    obtenerLocalStorage()
  }else if (dificil.checked) {
    crearOperacion();
    cuentaRegresiva();
    intentos();
    obtenerLocalStorage();
  }else {
    alert("Debes seleccionar una opción");
  }
  opciones.style.display = "none";
  container_derecho.classList.remove('containter_rigth')
}

function mostrar(){
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.toggle('ocultar');
  }
}

function crearOperacion() {
  let operador = [];
  operador[0] = parseInt((Math.random() * (15-10)) + 10);
  num1 = operador[0];
  operador[1] = parseInt((Math.random() * 10) + 1);
  num2 = operador[1];
  document.querySelector('.num1').innerHTML = operador[0];
  document.querySelector('.num2').innerHTML = operador[1];
  resultadoSuma = parseInt(operador[0] + operador[1]);
  resultadoResta = parseInt(operador[0] - operador[1]);
  contador_suma.push(1);
}

function scoring() {
  sumaPuntos = puntaje.reduce((a, b) => {
    return a + b;
  }, 0)
  document.querySelector('.puntos_suma').innerHTML = "Puntaje: " + sumaPuntos;
  console.log("sumaPuntos = " + sumaPuntos);
}
function correctas(){
  sumaAciertos = aciertos.reduce((a, b)=> {
    return a + b;
  }, 0)
}

function comprobarResultadoSuma() {
  resultadoIngresado1 = parseInt(document.getElementById('resultado_suma').value);
  if (operacion_suma == "+" && resultadoSuma == resultadoIngresado1) {
    puntaje.push(5);
    aciertos.push(1);
    alert("Correcto");
  }else{
    puntaje.push(-3);
    console.log(puntaje);
    alert("Incorrecto")
  }
}
let intento_suma = document.querySelector('.intento_suma')
function intentos() {
  sumContador = contador_suma.reduce((a, b) => {
    return a + b;
  }, 0)
  intento_suma.innerHTML = "Turno: " + sumContador;
}

function limpiarValor() {
  document.getElementById("resultado_suma").value = "";
}

function juegoTerminado(){
  if (turno_suma.value < sumContador) {
    alert(`terminaste el juego. Acertaste: ${sumaAciertos} de un total de ${turno_suma.value}`);

    recargarPagina()
  }
}

function recargarPagina(){
  window.location.reload(true);
}

//------------------------Boton Siguiente---------------------------//
let botonSiguiente = document.querySelector('#siguiente');
botonSiguiente.addEventListener("click", function() {
  crearOperacion();
  intentos();
  guardarLocalStorage();
  // clearTime();
  limpiarValor();
  countDownGame = 20;
  scoring();
  juegoTerminado();
  console.log(sumContador);
})

//-------------------Boton Comprobar ---------------------------------//
let botonComprobar = document.querySelector('#comprobar');

botonComprobar.addEventListener("click", function() {
  comprobarResultadoSuma();
  scoring();
  guardarLocalStorage();
  detenerTiempo();
  correctas();

})
//-------------------Local Storage-----------------------------------------//
function guardarLocalStorage() {
  localStorage.setItem("puntuacion", sumaPuntos);
  localStorage.setItem("Intentos", sumContador);
}

function obtenerLocalStorage() {
  let puntaje_suma = localStorage.getItem('puntuacion');
  document.querySelector('.lastpuntaje_suma').innerHTML = "Último puntaje: " + puntaje_suma;
  let intentos_suma = localStorage.getItem('Intentos');
  document.querySelector('.lastintento_suma').innerHTML = "Últimos Intentos: " + intentos_suma;
}

//-------------------------contador segundos---------------------//

function cuentaRegresiva(){
  countDownGame;
  scoring();
  document.getElementById('countDownGame').innerHTML = countDownGame;
  if (countDownGame == 0) {
    intentos();
    puntaje.push(-3);
  }else {
    --countDownGame;
    intervalo = setTimeout("cuentaRegresiva()", 1000);
  }
}

//--------------------Detener Contador ---------------------------//
function detenerTiempo(){
  clearTimeout(intervalo)
}
// let botonPausa = document.querySelector('#pausar')
// botonPausa.addEventListener('click', ()=>{
//   detenerTiempo()
//   setTimeout('cuentaRegresiva()', 5000)
// })
