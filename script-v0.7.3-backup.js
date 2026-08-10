// ==================================================
// JUEGO DE MEMORIA - 10 DADOS
// Versión v0.2
// Crear dados mediante JavaScript
// ==================================================


// Esperamos a que todo el HTML esté cargado
// antes de ejecutar nuestro código.

document.addEventListener("DOMContentLoaded", () => {


    // ==================================================
    // CONEXIÓN CON ELEMENTOS HTML
    // ==================================================


    // Buscamos el tablero donde aparecerán los dados

    const tablero = document.getElementById("tablero");

    // Elemento que tapa los dados cuando termina el tiempo

    const cortina = document.getElementById("cortina");

    // Formulario donde el usuario escribe
    // sus recuerdos

    const formulario = document.getElementById("formulario");

    // Boton que revisa las respuestas del usuario

    const btnCorregir = document.getElementById("btnCorregir");

    // Al abrir la pagina el formulario permanece oculto

    formulario.classList.add("oculto");

    // Elemento donde mostraremos el contador

    const contador = document.getElementById("contador");


    // Buscamos el botón iniciar

    const btnIniciar = document.getElementById("btnIniciar");


    // Zona donde mostraremos la puntuacion

    const resultado = document.getElementById("resultado");



    // ==================================================
    // CONFIGURACIÓN DEL JUEGO
    // ==================================================


    // Número de dados que tendrá la partida

    const NUMERO_DADOS = 10;



    // Posibles símbolos que pueden aparecer

    const caras = [

        "🎵", // Nota musical

        "🎨", // Color

        "🔤", // Letra

        "🔣", // Símbolo

        "🔢", // Número primo

        "🐾"  // Animal

    ];

    // ==========================================
// GUARDAR RESULTADO REAL DE LA PARTIDA
// ==========================================

// Aquí almacenaremos las caras
// que aparecen en los 10 dados

let resultadoReal = [];

// Estado actual del juego. Controlamos en que fase se encuentra nuestra partida.
// preparacion -> todavia no hemos empezado
// memorizacion -> los dados estan visibles
// respuestas -> el jugador debe responder
// resultado -> mostramos la puntuacion

let estadoJuego = "preparacion";

// Control del temporizador
// Aqui guardaremos el identificador del temporizador.
// Si existe un temporizador activo, no crearemos otro.
let intervaloTemporizador = null;

console.log("Estado:", estadoJuego);



    // ==================================================
    // FUNCIÓN CREAR DADOS
    // ==================================================


    function crearDados() {


        // Los dados estan preparados para memorizar
        // Cambiamos el estado del juego
        estadoJuego = "memorizacion";

        console.log("Estado:", estadoJuego);

        // Antes de crear nuevos dados,
        // limpiamos el tablero.

        tablero.innerHTML = "";

        // Borramos resultado de partida anterior
        resultadoReal = [];



        // Bucle para crear 10 dados

        for (
            let i = 0;
            i < NUMERO_DADOS;
            i++
        ) {



            // Creamos un div nuevo

            const dado = document.createElement("div");



            // Le ponemos la clase CSS "dado"

            dado.classList.add("dado");



            // Elegimos una cara aleatoria

            const numeroAleatorio = Math.floor(
                Math.random() * caras.length
            );



            // Guardamos el símbolo elegido

            dado.textContent = caras[numeroAleatorio];

            // Guardamos el resultado real

            resultadoReal.push(caras[numeroAleatorio]);



            // Introducimos el dado dentro del tablero

            tablero.appendChild(dado);


        }

        // Comprobamos que guarda los 10 dados
        console.log(
            "Resultado real de la partida: ",
            resultadoReal
        );


    }


// ==========================================
// FUNCIÓN TEMPORIZADOR
// ==========================================

function iniciarTemporizador() {

    // ------------------------------------------
    // COMPROBAR SI YA EXISTE UN TEMPORIZADOR
    // ------------------------------------------

    // Si intervaloTemporizador no es null,
    // significa que ya hay un temporizador funcionando.

    if (intervaloTemporizador !== null) {

        console.log(
            "⚠️ Ya existe un temporizador activo."
        );

        return;
    }


    // ------------------------------------------
    // ESTADO DE LA PARTIDA
    // ------------------------------------------

    // Al comenzar mostramos los dados
    // y entramos en modo memorización.

    estadoJuego = "memorizacion";

    // Mientras vemos los dados:
    // No podemos corregir
    // No podemos iniciar otra partida

    btnIniciar.disabled = true;
    btnCorregir.disabled = true;

    console.log(
        "Estado:",
        estadoJuego
    );


    // ------------------------------------------
    // OBTENER TIEMPO SELECCIONADO
    // ------------------------------------------

    let tiempo = parseInt(
        document.getElementById("tiempo").value
    );


    // Mostrar tiempo inicial

    contador.textContent =
        "Tiempo restante: "
        + tiempo
        + " segundos";


    // ------------------------------------------
    // CREAR TEMPORIZADOR
    // ------------------------------------------

    intervaloTemporizador = setInterval(() => {

        tiempo--;


        // Actualizar contador

        contador.textContent =
            "Tiempo restante: "
            + tiempo
            + " segundos";


        // --------------------------------------
        // ¿HA TERMINADO EL TIEMPO?
        // --------------------------------------

        if (tiempo <= 0) {

            // Detenemos el temporizador

            clearInterval(
                intervaloTemporizador
            );


            // Muy importante:
            // volvemos a poner la variable en null.
            //
            // Esto permitirá crear otro temporizador
            // cuando comience la siguiente partida.

            intervaloTemporizador = null;


            // ----------------------------------
            // CAMBIAR ESTADO
            // ----------------------------------

            estadoJuego = "respuestas";

            // Ahora podemos corregir las respuestas
            btnCorregir.disabled = false;

            // Seguimos sin poder iniciar otra partida
            btnIniciar.disabled = true;

            console.log(
                "Estado:",
                estadoJuego
            );


            // ----------------------------------
            // MOSTRAR FORMULARIO
            // ----------------------------------

            contador.textContent =
                "⏰ Tiempo terminado";


            cortina.classList.remove(
                "oculto"
            );


            formulario.classList.remove(
                "oculto"
            );


            console.log(
                "Fin del tiempo → formulario visible"
            );

        }

    }, 1000);

}




// ==========================================
// PRUEBA BOTÓN CORREGIR
// ==========================================

// ==========================================
// CORREGIR RESPUESTAS
// ==========================================

function corregirRespuestas(){

    // Cambiamos al estado de resultado
    estadoJuego = "resultado";

    console.log("Estado:", estadoJuego);

    // Ya no podemos corregir otra vez
    btnCorregir.disabled = true;


    // Contador real de símbolos

    let contadorCaras={

        "🎵":0,
        "🎨":0,
        "🔤":0,
        "🔣":0,
        "🔢":0,
        "🐾":0

    };


    // Contamos los símbolos reales

    resultadoReal.forEach(cara=>{

        contadorCaras[cara]++;

    });


    // Leemos las respuestas del usuario

    const respuestas={

        "🎵":parseInt(document.getElementById("notas").value)||0,

        "🎨":parseInt(document.getElementById("colores").value)||0,

        "🔤":parseInt(document.getElementById("letras").value)||0,

        "🔣":parseInt(document.getElementById("simbolos").value)||0,

        "🔢":parseInt(document.getElementById("numeros").value)||0,

        "🐾":parseInt(document.getElementById("animales").value)||0

    };


    let aciertos=0;

    let fallos=0;

    let informe="";


    // Comparamos respuesta por respuesta

    for(const simbolo in respuestas){

        if(respuestas[simbolo]===contadorCaras[simbolo]){

            aciertos++;

            informe +=

            "✅ " + simbolo +

            " Correcto (" +

            respuestas[simbolo] +

            ")<br>";

        }

        else{

            fallos++;

            informe +=

            "❌ " + simbolo +

            " Tu respuesta: " +

            respuestas[simbolo] +

            " | Correcto: " +

            contadorCaras[simbolo] +

            "<br>";

        }

    }


    // Mostrar resultado

    resultado.classList.remove("oculto");


    resultado.innerHTML=`

        <h3>🏆 Resultado</h3>

        <p><strong>Aciertos:</strong> ${aciertos}</p>

        <p><strong>Fallos:</strong> ${fallos}</p>

        <hr>

        ${informe}

    `;
    // CREAR NUEVO BOTÓN PARA REINICIAR EL JUEGO
    const btnReiniciar = document.createElement("button");
    btnReiniciar.textContent = "🔄 Reiniciar";
    btnReiniciar.classList.add("btn-reiniciar");
    // Añadimos el boton al resultado
    resultado.appendChild(btnReiniciar);

    // Evento del boton reiniciar
    btnReiniciar.addEventListener("click", () => {

        // Limpiamos las respuestas del usuario
        document.getElementById("notas").value = "";
        document.getElementById("colores").value = "";
        document.getElementById("letras").value = "";
        document.getElementById("simbolos").value = "";
        document.getElementById("numeros").value = "";
        document.getElementById("animales").value = "";

        // Ocultamos el formulario
        formulario.classList.add("oculto");
        
        // Ocultamos el resultado
        resultado.classList.add("oculto");

        // Ocultamos la cortina
        cortina.classList.add("oculto");

        // Preparar los botones para una nueva partida
        btnIniciar.disabled = true;
        btnCorregir.disabled = true;

        // Iniciamos un nuevo juego
        crearDados();
        iniciarTemporizador();

    });

}

    // ==================================================
    // EVENTO DEL BOTÓN
    // ==================================================


    // Cuando el usuario pulsa iniciar

    btnIniciar.addEventListener(
        "click",
        () => {
            crearDados();
            iniciarTemporizador();
        }
    );

    // Cuando pulsamos corregir

    btnCorregir.addEventListener(
        "click",
        corregirRespuestas
    );


});