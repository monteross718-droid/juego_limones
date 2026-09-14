let canvas=document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");


const ALTURA_SUELO=20;
const ALTURA_PERSONAJE=60;
const ANCHO_PERSONAJE=40;
const ANCHO_LIMON=20;
const ALTURA_LIMON=20;

let personajeX=canvas.width/2;
let limonX=canvas.width/2;
let limonY=0;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let puntaje=0;
let vidas=3;
let velocidadLimon=200;
let intervalo;

function iniciar(){
    intervalo=setInterval(bajarLimon,velocidadLimon); // recibe como primer parámetro una función como tal y segundo parámetro tiempo en milisegundos 
    dibujarSuelo();
    dibujarPersonaje();
    aparecerLimon();
}

function dibujarSuelo() {
    ctx.fillStyle="violet";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);
}

function dibujarPersonaje(){
    ctx.fillStyle="yellow";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}

function moverIzquierda(){
    if(personajeX > 0){
        personajeX=personajeX-10;
        actualizarPantalla();
    }
}

function moverDerecha(){
    if(personajeX < canvas.width - ANCHO_PERSONAJE){
        personajeX=personajeX+10;
        actualizarPantalla();
    }
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);
}

function aparecerLimon(){
    limonX = generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY = 5;
    actualizarPantalla();
}

function bajarLimon(){
    limonY = limonY+10;
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();
}

function detectarAtrapado(){
    if(limonX + ANCHO_LIMON > personajeX &&
       limonX < personajeX + ANCHO_PERSONAJE &&
       limonY + ALTURA_LIMON > personajeY &&
       limonY < personajeY + ALTURA_PERSONAJE){
        aparecerLimon();
        puntaje++;
        mostrarEnSpan("txtPuntaje", puntaje);
    }
    if(puntaje==3){
        cambiarVelocidad(150);
    }
    if(puntaje==6){
        cambiarVelocidad(100);
    }
    if(puntaje==10){
        clearInterval(intervalo);
        alert("GANASTE, ahora podras llevar limonada a tus compañeros de trabajo..!!");
    }
}

function detectarPiso(){
    if(limonY + ALTURA_LIMON > canvas.height - ALTURA_SUELO){
        aparecerLimon();
        vidas--;
        mostrarEnSpan("txtVidas", vidas);
    }
    if(vidas==0){
        clearInterval(intervalo);
        alert("GAME OVER");
    }
}

function reiniciarJuego(){
    
    velocidadLimon=200;
    puntaje=0;
    vidas=3;

    mostrarEnSpan("txtPuntaje", puntaje);
    mostrarEnSpan("txtVidas", vidas);
    
    iniciar();
}

function cambiarVelocidad(nuevaVelocidad){
    clearInterval(intervalo);
    velocidadLimon=nuevaVelocidad;
    intervalo=setInterval(bajarLimon,velocidadLimon);
}

