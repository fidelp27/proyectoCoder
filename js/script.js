//--------------------------header Parallax-----------------///
jQuery(document).ready(function($) {
  $('.astro1').hide();
  $('.titulo-cap h1').hide()
  $('.menu .title').hide()

  $(window).scroll(function() {
    console.log(window.scrollY);
    const scroll = $(window).scrollTop();
    const scrollY = $(window).scrollY;

    $('.astro1').show();
    $('.titulo-cap h1').show()
    if (scroll <= 90) {
      $('.astro1').css({
        width: scroll*6+'px',
        height: scroll*6 +'px',
      })
    }
    if(scroll <= 140) {
      $('.titulo-cap h1').css({
        height: scroll*1.5 +'px',
        fontSize: scroll*0.05 +'rem',
        color: '#'+'fe'+scroll*5+'f',

      });
    }
    if (scroll >= 690){
      $('.menu .title').show('slow').slideDown()
      $('.contenedor_menu ul').addClass('space_between')
    }else{
        $('.menu .title').hide('slow');
        $('.contenedor_menu ul').addClass('menu navbar')
      };
});
});
//-----------------------Variables Suma y Resta-------------------------//
let num1;
let num2;
let resultadoSuma;
let resultadoResta;
let puntaje = [];
let contador_suma = [];
let contador_resta = [];
let sumContador;
let sumContador_resta;
let sumaPuntos;
let sumaPuntos_resta;
let mensaje = document.querySelector('.mensaje');
let resultadoIngresado1;
let resultadoIngresado2;
let operacion_suma = document.querySelector('.operacion_suma').innerHTML;
let operacion_resta = document.querySelector('.operacion_resta').innerHTML;
let countDownGame = 20;
let intervalo;
mensaje.style.display = "none";
let botonSiguiente = document.querySelector('.siguiente');
let botonSiguiente_resta = document.querySelector('.siguiente_resta');
let intento_suma = document.querySelector('.intento_suma');
let intento_resta = document.querySelector('.intento_resta');
let facil = document.getElementById('suma_facil');
let dificil = document.getElementById('suma_dificil');
let resta_facil = document.getElementById('resta_facil');
let resta_dificil = document.getElementById('resta_dificil');
let boton_inicio = document.querySelector('.comenzar');
let boton_inicio_resta = document.querySelector('.comenzar_resta');
let boton_iniciar = document.querySelector('.btn_iniciar')
let boton_iniciar2 = document.querySelector('.iniciar2')
let boton_iniciar3 = document.querySelector('.iniciar3')
let turnos_suma = document.querySelector('#turno_suma');
let turnos_resta = document.querySelector('#turno_resta');
let aciertos = [];
let opAciertos;
let container_derecho = document.querySelectorAll('.containter_rigth')
let opciones = document.getElementsByClassName('opciones');
console.log(boton_iniciar3);
//----------------------------Funciones---------------------------------//
boton_inicio.addEventListener('click', crearJuego)
boton_inicio_resta.addEventListener('click', crearJuego)
boton_iniciar.addEventListener('click', mostrar)
boton_iniciar2.addEventListener('click', mostrar)
boton_iniciar3.addEventListener('click', ocultarAfter)


function crearJuego(){
  if (facil.checked || resta_facil.checked) {
    crearOperacion();
    intentos();
    intentos_resta();
    obtenerLocalStorage_sumres()
  }else if (dificil.checked || resta_dificil.checked) {
    crearOperacion();
    intentos();
    intentos_resta();
    obtenerLocalStorage_sumres();
  }else {
    swal.fire({
      icon: "warning",
      title: "Debes seleccionar una opción",
      text: "Se reinciará el juego"});
    setTimeout(recargarPagina,1000);
  }
  if (facil.checked || dificil.checked) {
    for (let i = 0; i < opciones.length; i++) {
      opciones[0].style.display = "none";
      container_derecho[0].classList.remove('containter_rigth');
    }
  }else if (resta_facil.checked || resta_dificil.checked) {
    for (let i = 0; i < opciones.length; i++) {
      opciones[1].style.display = "none";
      container_derecho[1].classList.remove('containter_rigth');
    }
  }

}

function mostrar(){
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.toggle('ocultar');
  }
}

function ocultarAfter(){
  for (let i = 0; i < container_derecho.length; i++) {
    container_derecho[i].classList.toggle('containter_rigth');
  }
}


function crearOperacion() {

  let operador = [];
  operador[0] = parseInt((Math.random() * (15-10)) + 10);
  num1 = document.querySelectorAll('p.num1');
  operador[1] = parseInt((Math.random() * 10) + 1);
  num2 = document.querySelectorAll('p.num2');
  for (let i = 0; i < num1.length; i++) {
    num1[i].innerHTML = operador[0];
    num2[i].innerHTML = operador[1];
  }
  if ((dificil.checked || resta_dificil.checked)){
    cuentaRegresiva();
  }

  resultadoSuma = parseInt(operador[0] + operador[1]);
  resultadoResta = parseInt(operador[0] - operador[1]);
  contador_suma.push(1);
  contador_resta.push(1);
}
function comprobarResultado() {
  resultadoIngresado1 = parseInt(document.getElementById('resultado_suma').value);
  resultadoIngresado2 = parseInt(document.getElementById('resultado_resta').value);
  if (operacion_suma == "+" && resultadoSuma == resultadoIngresado1) {
    puntaje.push(5);
    aciertos.push(1);
    swal.fire({
      icon: "success",
      title: "CORRECTO",
      text: "Vamos Campeón"
    });

  }else if (operacion_resta == "-" && resultadoResta == resultadoIngresado2) {
    puntaje.push(5);
    aciertos.push(1);
    swal.fire({
      icon: "success",
      title: "Vamos Campeón",
    });
  }else{
    puntaje.push(-3);
    swal.fire({
      icon: "error",
      title: "INCORRECTO",
      text: "Debes esforzarte un poco"
    });
  }
}

function scoring() {
  sumaPuntos = puntaje.reduce((a, b) => {
    return a + b;
  }, 0)
  document.querySelector('.puntos_suma').innerHTML = "Puntaje: " + sumaPuntos;
}

function scoring_resta() {
  sumaPuntos_resta = puntaje.reduce((a, b) => {
    return a + b;
  }, 0)
  document.querySelector('.puntos_resta').innerHTML = "Puntaje: " + sumaPuntos_resta;
}

function correctas(){
  opAciertos = aciertos.reduce((a, b)=> {
    return a + b;
  }, 0)
}


function intentos() {
  sumContador = contador_suma.reduce((a, b) => {
    return a + b;
  }, 0)
  intento_suma.innerHTML = "Turno: " + sumContador;

}
function intentos_resta() {
  sumContador_resta = contador_resta.reduce((a, b) => {
    return a + b;
  }, 0)
  intento_resta.innerHTML = "Turno: " + sumContador_resta;
}

function limpiarValor_sumRes() {
  document.getElementById('resultado_suma').value = "";
  document.getElementById('resultado_resta').value = "";
}

function juegoTerminadoSuma(){
  if (turno_suma.value < sumContador) {
    swal.fire({
      title: "Terminaste el juego",
      text: `Acertaste: ${opAciertos} de un total de ${turno_suma.value}`
    });
    setTimeout(recargarPagina,2000);
  }
}
function juegoTerminadoResta(){
  if (turno_resta.value < sumContador_resta ) {
    swal.fire({
      title: "Terminaste el juego",
      text: `Acertaste: ${opAciertos} de un total de ${turno_resta.value}`
    });
    setTimeout(recargarPagina,2000);
  }
}


function recargarPagina(){
  window.location.reload(true);
}

//------------------------Boton Siguiente---------------------------//


  botonSiguiente.addEventListener("click", function() {
    crearOperacion();
    scoring();
    intentos();
    limpiarValor_sumRes();
    guardarLocalStorage_sumRes();
    juegoTerminadoSuma();

  })
  botonSiguiente_resta.addEventListener("click", function(){
    crearOperacion();
    scoring_resta();
    intentos_resta();
    limpiarValor_sumRes();
    guardarLocalStorage_sumRes();
    juegoTerminadoResta();

  })

//-------------------Boton Comprobar ---------------------------------//
let botonComprobarSuma = document.querySelector('.comprobar_suma');
let botonComprobarResta = document.querySelector('.comprobar_resta');

  botonComprobarSuma.addEventListener("click", function() {
    comprobarResultado();
    scoring();
    guardarLocalStorage_sumRes();
    detenerTiempo();
    correctas();
  })
  botonComprobarResta.addEventListener("click", function(){
  comprobarResultado();
  scoring_resta();
  guardarLocalStorage_sumRes();
  detenerTiempo();
  correctas();
  })

//-------------------Local Storage-----------------------------------------//
function guardarLocalStorage_sumRes() {
  localStorage.setItem("puntuacion", sumaPuntos);
  localStorage.setItem("Intentos", sumContador);
  localStorage.setItem("puntuacion_resta", sumaPuntos_resta);
  localStorage.setItem("Intentos_resta", sumContador_resta);
}

function obtenerLocalStorage_sumres() {
  let puntaje_suma = localStorage.getItem('puntuacion');
  document.querySelector('.lastpuntaje_suma').innerHTML = "Último puntaje: " + puntaje_suma;
  let puntaje_resta = localStorage.getItem('puntuacion_resta');
  document.querySelector('.lastpuntaje_resta').innerHTML = "Último puntaje: " + puntaje_resta;

  let intentos_suma = localStorage.getItem('Intentos');
  document.querySelector('.lastintento_suma').innerHTML = "Últimos Intentos: " + parseInt(intentos_suma - 1);
  let intentos_resta = localStorage.getItem('Intentos_resta');
  document.querySelector('.lastintento_resta').innerHTML = "Últimos Intentos: " + parseInt(intentos_resta - 1);
}

//-------------------------contador segundos---------------------//

function cuentaRegresiva(){
  countDownGame;
  scoring();
  scoring_resta();
  document.getElementById('countDownGame').innerHTML = countDownGame;
  document.getElementById('countDownGame_resta').innerHTML = countDownGame;
  if (countDownGame == 0) {
    intentos();
    intentos_resta();
    puntaje.push(-3);
    puntaje_resta.push(-3);
  }else {
    --countDownGame;
    intervalo = setTimeout("cuentaRegresiva()", 1000);
  }
}

//--------------------Detener Contador ---------------------------//
function detenerTiempo(){
  clearTimeout(intervalo);
  countDownGame = 20;
}
