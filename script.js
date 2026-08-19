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

    // Indicador visual del estado actual del juego
    const estadoPartida = document.getElementById("estadoPartida");
    




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



//=======================
// ACTUALIZAR ESTADO VISUAL DE LA PARTIDA
//=======================
function actualizarEstadoPartida() {

    // Eliminamos las clases de estado anteriores

    estadoPartida.classList.remove(
        "estado-preparacion",
        "estado-memorizacion",
        "estado-respuestas",
        "estado-resultado"
    );

    //Aplicamos la clase correspondiente
    // al estado actual

    switch (estadoJuego) {
        case "preparacion":
            estadoPartida.textContent =
                "🎮 Preparado para jugar";
            estadoPartida.classList.add(
                "estado-preparacion"
            );
            break;
        case "memorizacion":
            estadoPartida.textContent =
                "🧠 Memoriza los datos";
            estadoPartida.classList.add(
                "estado-memorizacion"
            );
            break;
        case "respuestas":
            estadoPartida.textContent =
                "📝 Introduce tus respuestas";
            estadoPartida.classList.add(
                "estado-respuestas"
            );
            break;
        case "resultado":
            estadoPartida.textContent =
                "🏆 Resultado de la partida";
            estadoPartida.classList.add(
                "estado-resultado"
            );
            break;
        
    }
}

// Mostrar el estado inicial al cargar la pagina
actualizarEstadoPartida();


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
    // CAMBIAR ESTADO DEL JUEGO
    // ==================================================

    //Esta funcion centraliza los cambios de estado.
    //Asi evitamos cambiar estadoJuego de forma
    // descontrolada por diferentes partes del programa

    function cambiarEstado(nuevoEstado) {
        // Guardamos el nuevo estado
        estadoJuego = nuevoEstado;

        console.log("Estado del juego:", estadoJuego);

        // Actualizamos los botones
        actualizarBotones();
    }

    // ==================================================
    // CONTROL DE BOTONES
    // ==================================================

    // Activa o desactiva los botones dependiendo
    // del estado actual de la partida.

    function actualizarBotones() {
        // Por defecto bloqueamos ambos botones.
        btnIniciar.disabled = true;
        btnCorregir.disabled = true;

    // ==================================================
    // ESTADO: PREPARACION
    // ==================================================

    // El jugador puede iniciar una partida.
    if (estadoJuego === "preparacion") {
        btnIniciar.disabled = false;
    }

    // ==================================================
    // ESTADO: MEMORIZACION
    // ==================================================

    // Los dados estan visibles.
    // No se puede iniciar otra partida
    // ni corregir todavia.

    if (estadoJuego === "memorizacion") {
        btnIniciar.disabled = true;
        btnCorregir.disabled = true;
    }

    // ==================================================
    // ESTADO: RESPUESTAS
    // ==================================================

    // El tiempo ha terminado.
    // El jugador puede corregir sus respuestas.

    if (estadoJuego === "respuestas") {
        btnIniciar.disabled = true;
        btnCorregir.disabled = false;
    }

    // ==================================================
    // ESTADO: RESULTADO
    // ==================================================
    // Ya hemos corregido la partida.
    // Ambos botones permanecen bloqueados.

    if (estadoJuego === "resultado") {
        btnIniciar.disabled = true;
        btnCorregir.disabled = true;
    }

    console.log(
        "Botones actualizados ->",
        "Iniciar:",
        !btnIniciar.disabled,
        "| Corregir:",
        !btnCorregir.disabled
    );

        
    }

    // ==================================================
    // ESTADO INICIAL DE LOS BOTONES
    // ==================================================

    // Al cargar el juego estamos en preparacion.
    // Por tanto solo debe estar disponible
    // el boton iniciar juego.

    actualizarBotones();

    // ==================================================
    // LIMPIAR RESPUESTAS
    // ==================================================

    // Borra todas las respuestas introducidas
    // por el jugador antes de comenzar
    // una nueva partida

    function limpiarRespuestas(){
        // Limpiamos las respuestas del usuario
        document.getElementById("notas").value = "";
        document.getElementById("colores").value = "";
        document.getElementById("letras").value = "";
        document.getElementById("simbolos").value = "";
        document.getElementById("numeros").value = "";
        document.getElementById("animales").value = "";
    }

    //===============================================
    // PREPARAR INTERFAZ PARA NUEVA PARTIDA
    //===============================================

    // Oculta los elementos que solamente deben
    // aparecer despues de terminar la memorizacion
    // o despues de corregir.

    function prepararNuevaPartida() {
        formulario.classList.add("oculto");
        resultado.classList.add("oculto");
        cortina.classList.add("oculto");

        // Eliminamos el resultado de la partida anterior
        resultado.innerHTML = "";
    }




    // ==================================================
    // FUNCIÓN CREAR DADOS
    // ==================================================


    function crearDados() {


        // Los dados estan preparados para memorizar
        // Cambiamos el estado del juego
        cambiarEstado("memorizacion");
        
        actualizarEstadoPartida();

        // Antes de crear nuevos dados,
        // limpiamos el tablero.

        tablero.innerHTML = "";

        // Borramos resultado de partida anterior
        resultadoReal = [];

        // Ocultamos el formulario
        formulario.classList.add("oculto");

        



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
    if (intervaloTemporizador !== null){
        clearInterval(intervaloTemporizador);
        intervaloTemporizador = null;
    }

    // Obtener el tiempo seleccionado
    // El <select id="tiempo">
    // correspondiente a cada nivel de dificultad

    //let tiempo = parseInt(document.getElementById("tiempo").value);

    // Obtener el nombre de la dificultad
    const selectTiempo = document.getElementById("tiempo");

    let tiempo = parseInt(selectTiempo.value);

    const opcionSeleccionada = selectTiempo.options[selectTiempo.selectedIndex];

    

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

            contador.textContent = "⏰ Tiempo terminado";
            // Mostrar el formulario
            formulario.classList.remove("oculto");
            // Cambiar estado
            cambiarEstado("respuestas");

            actualizarEstadoPartida();

            // Mostrar la cortina
            //cortina.classList.remove("oculto");
            

            console.log("Fin del tiempo");

    }
    },1000);
    
}
    
    //===========================================
    // LEER RESPUESTAS DEL JUGADOR
    //===========================================

    // Obtiene los valores introducidos
    // en el formulario de memoria.

function obtenerRespuestas() {
    return {
        "🎵":parseInt(document.getElementById("notas").value)||0,

        "🎨":parseInt(document.getElementById("colores").value)||0,

        "🔤":parseInt(document.getElementById("letras").value)||0,

        "🔣":parseInt(document.getElementById("simbolos").value)||0,

        "🔢":parseInt(document.getElementById("numeros").value)||0,

        "🐾":parseInt(document.getElementById("animales").value)||0
    };
}
    // ==========================================
    // CORREGIR RESPUESTAS
    // ==========================================

function corregirRespuestas(){

    // Cambiamos al estado de resultado
    cambiarEstado("resultado");
    console.log("Estado:", estadoJuego);
    actualizarEstadoPartida();
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

    const respuestas = obtenerRespuestas();

// Variables para corregir
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

    // CALCULAR ESTADISTICAS

    // Total de categorias evaluadas
    const totalRespuestas = aciertos + fallos;

    // Calculamos el porcentaje
    const porcentaje = totalRespuestas > 0 ? Math.round((aciertos / totalRespuestas) * 100) : 0;

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
        limpiarRespuestas();
        // Preparar visualmente una nueva partida
        prepararNuevaPartida();
        // Preparar el estado
        cambiarEstado("preparacion");
        

        

        // Aumentamos el numero de partida
        numeroPartida ++;

        console.log("Comenzar nueva partida:", numeroPartida)

        // Crear nuevos dados
        crearDados();
        // Iniciar nuevo temporizador
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