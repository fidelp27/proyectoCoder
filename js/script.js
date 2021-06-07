
//--------------------------Variables-------------------------------//
let num1;
let num2;
let resultadoSuma;
let resultadoResta;
let puntaje = [];
let contador = [];
let bg;
let sumContador;
let sumaPuntos;
let mensaje = document.querySelector('.mensaje');
let resultadoIngresado;
let operacion = document.querySelector('.operacion').innerHTML;
//---------------------------------------------------------------------//

crearOperacion();
intentos();
obtenerLocalStorage()

//----------------------------Funciones---------------------------------//
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
  contador.push(1);
}

function scoring() {
  sumaPuntos = puntaje.reduce((a, b) => {
    return a + b;
  }, 0)

  document.querySelector('.puntaje').innerHTML = "Puntaje: " + sumaPuntos;
  console.log("sumaPuntos = " + sumaPuntos);
}

function comprobarResultado() {


  resultadoIngresado = Number(document.getElementById('resultado1').value);
  if (operacion == "+" && resultadoSuma == resultadoIngresado) {
    puntaje.push(5);
    console.log(puntaje);
    funWhite();
  }
  else if (operacion == "-" && resultadoResta == resultadoIngresado) {
    puntaje.push(5);
    console.log(puntaje);
    funWhite();
  }else {
    puntaje.push(-3);
    console.log(puntaje);
    funRed();
  }
}

function intentos() {
  sumContador = contador.reduce((a, b) => {
    return a + b;
  }, 0)
  document.querySelector('.intento').innerHTML = "Turno: " + sumContador;
}

function limpiarValor() {
  document.getElementById("resultado1").value = "";
}

//------------------------Boton Siguiente---------------------------//
let botonSiguiente = document.querySelector('#siguiente');
botonSiguiente.addEventListener("click", function() {
  crearOperacion();
  intentos();
  guardarLocalStorage();
  clearTime();
  limpiarValor();

})

//-------------------Boton Comprobar ---------------------------------//
let botonComprobar = document.querySelector('#comprobar');

botonComprobar.addEventListener("click", function() {
  comprobarResultado();
  scoring();
  guardarLocalStorage();

})
//-------------------Local Storage-----------------------------------------//
function guardarLocalStorage() {
  localStorage.setItem("puntuacion", sumaPuntos);
  localStorage.setItem("Intentos", sumContador);
}

function obtenerLocalStorage() {
  let puntaje1 = localStorage.getItem('puntuacion');
  document.querySelector('.lastpuntaje').innerHTML = "Último puntaje: " + puntaje1;
  let intentos1 = localStorage.getItem('Intentos');
  document.querySelector('.lastintento').innerHTML = "Últimos Intentos: " + intentos1;
}
//-------------------Cuenta regresiva------------------------------------//

let dias;
let horas;
let minutos;
let segundos;
let countDownDate;
let diferencia;
let now;

countDownDate = new Date("Jul 13, 2021 23:59:59").getTime();

let tiempo = setInterval(function() {
  now = new Date().getTime();
  diferencia = countDownDate - now;
  dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
  horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
  segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

  document.querySelector('.dias').innerHTML = "Entrega en " + dias + " días";
  document.querySelector('.horas').innerHTML = "Horas " + horas;
  document.querySelector('.minutos').innerHTML = "Minutos " + minutos;
  document.querySelector('.segundos').innerHTML = "Segundos " + segundos;

  if (diferencia <= 0) {
    clearInterval(tiempo);
    let time = document.querySelector('.time');
    time.innerHTML = "Bienvenido al juego"
  }
}, 1000);
//---------------------------------fondo parpadeante ------------------------------//

let Item = document.querySelector(".juego");
let prueba;
mensaje.style.display = "none"

function clearTime() {
  Item.style.backgroundColor = "white";
  mensaje.style.display = "none"
  clearTimeout(prueba)
}

function funRed() {
  Item.style.backgroundColor = "red";
  mensaje.innerHTML = "Incorrecto"
  mensaje.style.display = "flex"
  prueba = setTimeout(funWhite2, 400);
}



function funGreen() {
  Item.style.backgroundColor = "green";
  mensaje.innerHTML = "Correcto";
  mensaje.style.display = "flex"
  prueba = setTimeout(funWhite, 400);
}

function funWhite() {
  Item.style.backgroundColor = "white";
  mensaje.innerHTML = "";
  mensaje.style.display = "flex"
  prueba = setTimeout(funGreen, 400);
}

function funWhite2() {
  Item.style.backgroundColor = "white";
  mensaje.innerHTML = "";
  mensaje.style.display = "flex"
  prueba = setTimeout(funRed, 400);
}
