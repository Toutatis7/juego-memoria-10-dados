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



    // ==================================================
    // FUNCIÓN CREAR DADOS
    // ==================================================


    function crearDados() {


        // Antes de crear nuevos dados,
        // limpiamos el tablero.

        tablero.innerHTML = "";



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



            // Introducimos el dado dentro del tablero

            tablero.appendChild(dado);


        }


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


            console.log(
                "Fin del tiempo"
            );

        }


    },1000);


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


});