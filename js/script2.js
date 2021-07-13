let texto = ["CASA", "HOLA", "CAMPO", "MIMO", "PAPA", "PEPE", "SOL", "MONO", "MANO", "LUNA", "COSA", "NENE", "ARGENTINA", "VENEZUELA"];
let contador_dictado = [];
let puntaje_dictado = [];
let sumContador_dictado;
let sumaPuntos_dictado;
let number;


numeroAzar();
intentos_dictado();
obtenerLocalStorage_dictado();

function speak(texto){
  let msg = new SpeechSynthesisUtterance(texto);
  let voices = speechSynthesis.getVoices();
  msg.voice = voices[5];
  msg.pitch = 0.4;
  msg.lang = 'es-ES';
  speechSynthesis.speak(msg);
}
function numeroAzar(){
  number = parseInt((Math.random()*texto.length)+1)
}
let boton = document.querySelector('.img-dictado');
boton.addEventListener('click', () => {
  speak(texto[number]);
  console.log(texto[number]);
})

let comprobar = document.getElementById('comprobar_dictado');
comprobar.addEventListener('click', ()=>{
  let palabra = document.getElementById('texto_dictado').value;
  console.log("palabra:" + palabra);
  if (palabra == texto[number]) {
    puntaje_dictado.push(5);
    speak("correcto");
  }
  else {
    console.log("incorrecto");
    puntaje_dictado.push(-3);
    speak("Te equivocaste jajajaja pasa al siguiente");
    alert(`La palabra correcta es ${texto[number]}`)
  }
  guardarLocalStorage_dictado();
  scoring_dictado();

})

function limpiarValor_dictado() {
  document.getElementById("texto_dictado").value = "";
}



function scoring_dictado() {
  sumaPuntos_dictado = puntaje_dictado.reduce((a, b) => {
    return a + b;
  }, 0)

  document.querySelector('.puntos_dictado').innerHTML = "puntaje: " + sumaPuntos_dictado;
}



function intentos_dictado() {
  sumContador_dictado = contador_dictado.reduce((a, b) => {
    return a + b;
  }, 1)
  document.querySelector('.intento_dictado').innerHTML = "Turno: " + sumContador_dictado;
}

function finalizar_dictado(){
  if (sumContador_dictado > 5) {
    alert("Juego terminado")
    recargarPagina_dictado()

  }
}
function recargarPagina_dictado(){
  window.location.reload(true);
}
let siguiente = document.getElementById('siguiente_dictado');
siguiente.addEventListener('click', function(){
  numeroAzar();
  speak(texto[number]);
  contador_dictado.push(1);
  limpiarValor_dictado();
  intentos_dictado();
  guardarLocalStorage_dictado();
  finalizar_dictado();
})
//-------------------Local Storage-----------------------------------------//
function guardarLocalStorage_dictado() {
  localStorage.setItem("puntuacion", sumaPuntos_dictado);
  localStorage.setItem("Intentos", sumContador_dictado);
}

function obtenerLocalStorage_dictado() {
  let puntaje1 = localStorage.getItem('puntuacion');
  document.querySelector('.lastpuntaje_dictado').innerHTML = "Último puntaje: " + puntaje1;
  let intentos1 = localStorage.getItem('Intentos');
  document.querySelector('.lastintento_dictado').innerHTML = "Últimos Intentos: " + intentos1;
}
