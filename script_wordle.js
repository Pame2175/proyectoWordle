let intentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH', 'PLUMES', 'FROZE', 'BUCKET', 'GAMBLE', 'JUMBLE', 'QUICKS', 'PIXELS', 'BLAZER'];
let palabra = seleccionarPalabra();

function seleccionarPalabra() {
    return diccionario[Math.floor(Math.random() * diccionario.length)];
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value.toUpperCase();

    // Validar que el intento tiene la misma longitud que la palabra a adivinar
    if (intento.length !== palabra.length) {
        alert("Por favor, ingresa una palabra de longitud " + palabra.length + " letras.");
        return null;
    }

    return intento;
}

function intentar() {
    const INTENTO = leerIntento();

    // Si leerIntento devuelve null, la validación falló, salimos de la función
    if (INTENTO === null) {
        return;
    }

    if (INTENTO === palabra) {
        terminar("<h1>¡GANASTE! 😀</h1>");
        return;
    }

    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';

    for (let i in palabra) {
        const SPAN = document.createElement('span');
        SPAN.className = 'letter';

        if (INTENTO[i] === palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#79b851'; // Verde
        } else if (palabra.includes(INTENTO[i]) && INTENTO[i] !== palabra[i]) {
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = '#f3c237'; // Amarillo
        } else {
            SPAN.innerHTML = '_'; // Cambiado a guion bajo
            SPAN.style.backgroundColor = '#ccc'; // Gris
        }

        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);

    intentos--;

    if (intentos === 0) {
        terminar("<h1>¡PERDISTE! 😖</h1>");
    }
}

function terminar(mensaje) {
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;

    // Mostrar la palabra correcta
    contenedor.innerHTML += "<p>La palabra correcta era: " + palabra + "</p>";

    // Agregar un botón de reinicio
    contenedor.innerHTML += "<button onclick='reiniciar()'>Reiniciar</button>";
}

function reiniciar() {
    // Reiniciar juego
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    const GRID = document.getElementById("grid");
    const CONTENEDOR = document.getElementById('guesses');

    // Limpiar el contenido y habilitar los controles
    INPUT.value = "";
    INPUT.disabled = false;
    BOTON.disabled = false;
    GRID.innerHTML = ""; // Limpiar la grilla de letras
    CONTENEDOR.innerHTML = ""; // Limpiar el mensaje de resultado

    // Seleccionar una nueva palabra y restablecer los intentos
    palabra = seleccionarPalabra();
    intentos = 6;
}
