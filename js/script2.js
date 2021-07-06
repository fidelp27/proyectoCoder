let texto = ["casa", "hola", "campo", "mamá", "papá", "pepe", "tía", "mono", "mano"];
let contador_dictado = [];
let puntaje_dictado = [];
let sumContador_dictado;
let sumaPuntos_dictado;


intentos();
obtenerLocalStorage()

function speak(texto){
  let msg = new SpeechSynthesisUtterance(texto);
  let voices = speechSynthesis.getVoices();
  msg.voice = voices[5];
  msg.pitch = 0.4;
  msg.lang = 'es-ES';
  speechSynthesis.speak(msg);
}

let boton = document.getElementById('leer_dictado');
boton.addEventListener('click', () => {
  speak(texto[0]);
  boton.innerHTML = "Escuchar de nuevo";
  console.log("texto:" + texto[0]);
  console.log(texto.length);
})

let comprobar = document.getElementById('comprobar_dictado');
comprobar.addEventListener('click', ()=>{
  let palabra = document.getElementById('texto_dictado').value;
  console.log("palabra:" + palabra);
  if (palabra == texto[0].toUpperCase()) {
    console.log("texto[0]");
    puntaje_dictado.push(5);
    speak("correcto");
    funGreen();
  }
  else {
    console.log("incorrecto");
    puntaje_dictado.push(-3);
    speak("Te equivocaste jajajaja pasa al siguiente");
    funRed();
  }
  guardarLocalStorage();
  scoring();
})

function limpiarValor() {
  document.getElementById("texto_dictado").value = "";
}



function scoring() {
  sumaPuntos_dictado = puntaje_dictado.reduce((a, b) => {
    return a + b;
  }, 0)

  document.querySelector('.puntaje_dictado').innerHTML = "puntaje: " + sumaPuntos_dictado;
  console.log("sumaPuntos = " + sumaPuntos_dictado);
}



function intentos() {
  sumContador_dictado = contador_dictados.reduce((a, b) => {
    return a + b;
  }, 1)
  document.querySelector('.intento').innerHTML = "Turno: " + sumContador_dictado;
}


let siguiente = document.getElementById('siguiente_dictado');
siguiente.addEventListener('click', function(){
  texto.shift();
  console.log("Luego: " + texto);
  speak(texto[0]);
  console.log("texto:" + texto[0]);
  console.log(texto.length);
  boton.innerHTML = "Escuchar";
  contador_dictado.push(1);
  clearTime();
  limpiarValor();
  intentos();
  guardarLocalStorage();
})
//-------------------Local Storage-----------------------------------------//
function guardarLocalStorage() {
  localStorage.setItem("puntuacion", sumaPuntos_dictado);
  localStorage.setItem("Intentos", sumContador_dictado);
}

function obtenerLocalStorage() {
  let puntaje1 = localStorage.getItem('puntuacion');
  document.querySelector('.lastpuntaje').innerHTML = "Último puntaje: " + puntaje1;
  let intentos1 = localStorage.getItem('Intentos');
  document.querySelector('.lastintento').innerHTML = "Últimos Intentos: " + intentos1;
}
