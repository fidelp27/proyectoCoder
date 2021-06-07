

let texto = ["casa", "hola", "campo", "mamá", "papá", "pepe", "tía", "mono", "mano"];
let contador = [];
let puntaje = [];
let sumContador;
let sumaPuntos;


intentos();
obtenerLocalStorage()

function speak(texto){
  let msg = new SpeechSynthesisUtterance(texto);
  let voices = speechSynthesis.getVoices();
  msg.voice = voices[8];
  msg.pitch = 0.4;
  msg.lang = 'es-ES';
  speechSynthesis.speak(msg);
}

let boton = document.getElementById('leer_dictado');
boton.addEventListener('click', function(){
  speak(texto[0]);
  console.log("texto:" + texto[0]);
  console.log(texto.length);
})

let comprobar = document.getElementById('comprobar_dictado');
comprobar.addEventListener('click', function(){
  let palabra = document.getElementById('texto_dictado').value;
  console.log("palabra:" + palabra);
  if (palabra == texto[0]) {
    console.log("correcto");
    puntaje.push(5);
    speak("correcto");
    funGreen();
  }
  else {
    console.log("incorrecto");
    puntaje.push(-3);
    speak("intenta de nuevo");
    funRed();
  }
  guardarLocalStorage();
  scoring();
})

function limpiarValor() {
  document.getElementById("texto_dictado").value = "";
}



function scoring() {
  sumaPuntos = puntaje.reduce((a, b) => {
    return a + b;
  }, 0)

  document.querySelector('.puntaje').innerHTML = "Puntaje: " + sumaPuntos;
  console.log("sumaPuntos = " + sumaPuntos);
}



function intentos() {
  sumContador = contador.reduce((a, b) => {
    return a + b;
  }, 1)
  document.querySelector('.intento').innerHTML = "Turno: " + sumContador;
}


let siguiente = document.getElementById('siguiente_dictado');
siguiente.addEventListener('click', function(){
  texto.shift();
  console.log("Luego: " + texto);
  speak(texto[0]);
  console.log("texto:" + texto[0]);
  console.log(texto.length);
  boton.innerHTML = "Escuchar de nuevo";
  contador.push(1);
  clearTime();
  limpiarValor();
  intentos();
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

//---------------------------------fondo parpadeante ------------------------------//

let Item = document.querySelector(".juego_dictado");
let prueba;


function clearTime() {
  Item.style.backgroundColor = "white";
  clearTimeout(prueba)
}

function funRed() {
  Item.style.backgroundColor = "red";
  prueba = setTimeout(funWhite2, 400);
}



function funGreen() {
  Item.style.backgroundColor = "green";
  prueba = setTimeout(funWhite, 400);
}

function funWhite() {
  Item.style.backgroundColor = "white";
  prueba = setTimeout(funGreen, 400);
}

function funWhite2() {
  Item.style.backgroundColor = "white";
  prueba = setTimeout(funRed, 400);
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
