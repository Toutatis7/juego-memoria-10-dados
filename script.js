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

    // ELEMENTOS DE LAS ESTADISTICAS

    // Donde mostraremos la puntuacion
    const puntuacion = document.getElementById("puntuacion");

    // Donde mostraremos los aciertos
    const aciertosElemento = document.getElementById("aciertos");

    // Donde mostraremos los fallos
    const fallosElemento = document.getElementById("fallos");

    // Donde mostraremos el porcentaje de aciertos
    const porcentajeElemento = document.getElementById("porcentaje");

    // Donde mostraremos la dificultad
    const dificultadResultado = document.getElementById("dificultadResultado");

    // Donde mostraremos el numero de partida
    const numeroPartidaResultado = document.getElementById("numeroPartida");

    




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

// Numero de partida actual
let numeroPartida = 0;

// Dificultad de la partida actual
let dificultadActual = "";

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

        // Ocultamos el formulario
        formulario.classList.add("oculto");

        // Desactivamos corregir mientras memorizamos
        btnCorregir.disable = true;



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
    // FUNCION TEMPORIZADOR

    // Si habia otro temporizador activo, lo detenemos
    if (intervaloTemporizador != null){
        clearInterval(intervaloTemporizador);
    }

    // Obtener el tiempo seleccionado
    // El <select id="tiempo">
    // correspondiente a cada nivel de dificultad

    let tiempo = parseInt(document.getElementById("tiempo").value);

    // Obtener el nombre de la dificultad
    const selectTiempo = document.getElementById("tiempo");

    const opcionSeleccionada = selectTiempo.options[selectTiempo.selectedIndex];

    //const opcionSeleccionada = document.getElementById("tiempo").options[
    //document.getElementById("tiempo").selectedIndex
    //  ];

    // Guardamos el texto de la dificultad

    dificultadActual = opcionSeleccionada.textContent.trim();

    console.log("Dificultad seleccionada:", dificultadActual);

    console.log("Tiempo seleccionado:", tiempo, "segundos");


    // Mostrar informacion inicial

    contador.textContent = dificultadActual + " | Tiempo restante: " + tiempo +  " segundos ";

    // Crear temporizador
    intervaloTemporizador = setInterval(() => {

        tiempo --;

        // Actualizamos el contador cada segundo

        contador.textContent = dificultadActual + " | Tiempo restante: " + tiempo +  " segundos ";

        // Cuando el tiempo llega a 0
        if (tiempo <= 0) {

            clearInterval(intervaloTemporizador);

            intervaloTemporizador = null;

            contador.textContent = "Tiempo terminado";

            // Mostrar la cortina
            cortina.classList.remove("oculto");
            // Cambiar estado
            estadoJuego = "respuestas";

            console.log("Estado:", estadoJuego);

            // Mostrar el formulario
            formulario.classList.remove("oculto");

            // Activamos el boton corregir
            btnCorregir.disable = false;

            console.log("Fin del tiempo");

    }
    },1000);
    
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

// Variables para corregir
    let aciertos=0;

    let fallos=0;

    let informe="";

    // Total de respuestas
    //const totalRespuestas = aciertos + fallos;

    // Calculamos el porcentaje de acierto
    //const porcentaje = Math.round((aciertos / totalRespuestas) * 100);

    // La puntuacion sera igual al numero de aciertos
    //const puntos = aciertos;


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

    // CALCULAR ESTADISTICAS

    // Total de categorias evaluadas
    const totalRespuestas = aciertos + fallos;

    // Calculamos el porcentaje
    const porcentaje =Math.round((aciertos / totalRespuestas) * 100);

    // La puntuacion coincide con los aciertos
    const puntos = aciertos;

    // MOSTRAR EN CONSOLA
    console.log("Aciertos:", aciertos);
    console.log("Fallos:", fallos);
    console.log("Porcentaje:", porcentaje + "%");
    console.log("Puntos:", puntos);

    


    // Mostrar resultado

    resultado.classList.remove("oculto");

    console.log("Mostrando resultado");
    //console.log(resultado);

// Creamos el contenido del resultado
    resultado.innerHTML=`

        <h3>🏆 Resultado</h3>

        <p><strong>Aciertos:</strong> ${aciertos}</p>

        <p><strong>Fallos:</strong> ${fallos}</p>

        <p><strong>Porcentaje:</strong> ${porcentaje}%</p>

        <p><strong>Puntuacion:</strong> ${puntos}</p>

        <p><strong>Dificultad:</strong> ${dificultadActual}</p>

        <p><strong>Partida:</strong> ${numeroPartida}</p>

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
        btnIniciar.disabled = false;
        btnCorregir.disabled = false;

        // Iniciamos un nuevo juego
        numeroPartida ++;

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
            // Aumentados el numero de partida
            numeroPartida++;

            console.log("Comenzar partida:", numeroPartida);

            // Desactivamos iniciar mientras se esta jugando
            btnIniciar.disabled = true;

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