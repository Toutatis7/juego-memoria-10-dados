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



    // ==================================================
    // FUNCIÓN CREAR DADOS
    // ==================================================


    function crearDados() {


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

    // ==================================================
// FUNCIÓN TEMPORIZADOR
// ==================================================


function iniciarTemporizador() {


    // Obtenemos el tiempo elegido por el usuario

    let tiempo = parseInt(
        document.getElementById("tiempo").value
    );


    // Mostramos el tiempo inicial

    contador.textContent =
        "Tiempo restante: " + tiempo + " segundos";



    // Creamos un intervalo que se ejecuta cada segundo

    const intervalo = setInterval(() => {


        tiempo--;



        contador.textContent =
            "Tiempo restante: " 
            + tiempo 
            + " segundos";



        // Cuando llega a cero

        if (tiempo <= 0) {


            clearInterval(intervalo);


            contador.textContent =
                "⏰ Tiempo terminado";

            // Mostrar cortina
            cortina.classList.remove("oculto");

            // Mostrar formulario
            formulario.classList.remove("oculto");


            console.log(
                "Fin del tiempo"
            );

        }


    },1000);


    }




// ==========================================
// PRUEBA BOTÓN CORREGIR
// ==========================================

function corregirRespuestas(){

    console.log("Entando en corregir");
    
    console.log(
        "Resultado real:",
        resultadoReal
    );


    let contadorCaras = {

        "🎵":0,
        "🎨":0,
        "🔤":0,
        "🔣":0,
        "🔢":0,
        "🐾":0

    };


    resultadoReal.forEach(cara => {

        contadorCaras[cara]++;

    });


    console.log(
        "Contador de caras:",
        contadorCaras
    );

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